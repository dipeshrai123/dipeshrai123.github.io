import React from "react";
import { useAuth, useNavigation } from "react-auth-navigation";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../../../../redux";
import { useInput } from "../../../../hooks";
import { validator, isValid } from "../../../../utils";
import { InputField, Button } from "../../../commons";
import { Card, ActivityIndicator } from "../../../hocs";

export function ForgetPassword() {
  const { location, navigation } = useNavigation();
  const { navigate } = navigation;
  const { toast } = useAuth();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const { resetLoader } = login;

  const token = location.search.replace("?token=", "");

  const { data, onChangeHandler } = useInput({
    newPassword: "",
    confirmPassword: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const catchedErros = {};
    const validate = validator(catchedErros);

    const { newPassword, confirmPassword } = data;

    validate("newPassword", newPassword.length === 0, () => {
      toast({ message: "New Password musn't be empty!", type: "error" });
    });

    validate("confirmPassword", confirmPassword.length === 0, () => {
      toast({ message: "Confirm Password musn't be empty!", type: "error" });
    });

    validate("passwordMatch", newPassword !== confirmPassword, () => {
      toast({ message: "Password doesn't match!", type: "error" });
    });

    if (!isValid(catchedErros)) {
      console.error(catchedErros);
      return;
    }

    dispatch(
      resetPassword(
        {
          token,
          newPass: newPassword,
        },
        toast,
        () => {
          // redirect to login
          navigate("/");
        },
      ),
    );
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password">
        <Card>
          <form className="forget-contents" onSubmit={onSubmit}>
            <h1 className="forget-head">Reset Password</h1>

            <div className="forget-fields">
              <h1 className="forget-fields-title">New Password</h1>
              <InputField
                placeholder="New Password"
                name="password"
                value={data.newPassword}
                onChange={onChangeHandler("newPassword")}
                type="password"
              />
            </div>

            <div className="forget-fields">
              <h1 className="forget-fields-title">Confirm Password</h1>
              <InputField
                placeholder="Confirm Password"
                name="password"
                value={data.confirmPassword}
                onChange={onChangeHandler("confirmPassword")}
                type="password"
              />
            </div>

            <div className="forget-action">
              <ActivityIndicator animating={resetLoader}>
                <Button
                  type="submit"
                  title="Reset Password"
                  classname="fit-content"
                />
              </ActivityIndicator>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
