import React, { useState } from "react";
import { Modal } from "react-uicomp";
import { useAuth, useNavigation } from "react-auth-navigation";

import { useDispatch, useSelector } from "react-redux";

import { loginAction, forgetPassword } from "../../../redux";
import { InputField, Button } from "../../commons";
import { ActivityIndicator, Card } from "../../hocs";
import { isValid, validator } from "../../../utils";
import { useInput } from "../../../hooks";

import Logo from "../../../assets/icons/logo1.png";

export const Login = (props) => {
  const { handleLogin, toast } = useAuth();

  const { data, onChangeHandler } = useInput({
    email: "",
    password: "",
    forgetEmail: "",
  });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const [visible, setVisible] = React.useState(false);
  const [email, setEmail] = useState("");
  const { loading, forgetPasswordLoader } = login;

  const onLogin = async (e) => {
    e.preventDefault();
    const catchedErros = {};
    const validate = validator(catchedErros);

    const { email, password } = data;

    validate("email", email.length === 0, () => {
      toast({ message: "Email musn't be empty!", type: "error" });
    });

    validate("password", password.length === 0, () => {
      toast({ message: "Password musn't be empty!", type: "error" });
    });

    if (!isValid(catchedErros)) {
      console.error(catchedErros);
      return;
    }

    let body = {
      email: email,
      password: password,
    };
    dispatch(loginAction(body, handleLogin, toast));
  };

  const onResetPasswordSubmit = (e) => {
    e.preventDefault();
    const catchedErros = {};
    const validate = validator(catchedErros);

    const { forgetEmail } = data;

    validate("forgetEmail", forgetEmail.length === 0, () => {
      toast({ message: "Email musn't be empty!", type: "error" });
    });

    if (!isValid(catchedErros)) {
      console.error(catchedErros);
      return;
    }

    // forgot password action dispatch
    dispatch(
      forgetPassword(
        {
          email: forgetEmail,
        },
        toast,
        () => {
          setVisible(false);
        },
      ),
    );
  };

  return (
    <>
      <div className="login-container">
        <div className="login">
          <div className="login-logo-container">
            <div className="login-logo">
              <img src={Logo} alt="Logo" />
            </div>
          </div>

          <Card>
            <form onSubmit={onLogin}>
              <div className="login-contents">
                <h1 className="login-head">LOGIN</h1>
                <div className="login-fields">
                  <p className="login-fields-title">Email</p>

                  <InputField
                    placeholder="Email"
                    name="email"
                    value={data?.email}
                    onChange={onChangeHandler("email")}
                    type="email"
                  />
                </div>
                <div className="login-fields">
                  <p className="login-fields-title">Password</p>
                  <InputField
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={onChangeHandler("password")}
                    type="password"
                  />
                </div>
                <div className="login-forgot" onClick={() => setVisible(true)}>
                  Forgot Password ?
                </div>
                <div className="login-action">
                  <ActivityIndicator animating={loading}>
                    <Button.Ripple
                      title="Login"
                      classname="fit-content"
                      type="submit"
                      style={{
                        width: "100%",
                        backgroundColor: "#8860d0",
                        color: "#fff",
                      }}
                    />
                  </ActivityIndicator>
                </div>
              </div>
            </form>
          </Card>

          {/* FORGOT PASSWORD MODAL */}
          <Modal visible={visible} onOutsideClick={() => setVisible(false)}>
            <h1 className="login-head">Forgot password</h1>
            <p
              style={{
                paddingBottom: 10,
              }}>
              We will send you a link to reset your password
            </p>

            <form className="login-fields" onSubmit={onResetPasswordSubmit}>
              <p className="login-fields-title">Email</p>
              <InputField
                placeholder="Email"
                name="forgetEmail"
                value={data?.forgetEmail}
                onChange={onChangeHandler("forgetEmail")}
                type="forgetEmail"
              />

              <div style={{ height: 20 }} />

              <div className="login-action">
                <ActivityIndicator animating={forgetPasswordLoader}>
                  <Button.Ripple
                    type="submit"
                    title="Reset Password"
                    classname="fit-content"
                    // onClick={onResetPasswordSubmit}
                  />
                </ActivityIndicator>
              </div>
            </form>
          </Modal>
        </div>
      </div>

      <div className="login-bg-overlay" />
    </>
  );
};
