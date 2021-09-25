import React, { useRef } from "react";
import { useNavigation, useAuth } from "react-auth-navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux";

import { Button, InputField } from "../../commons";
import { ActivityIndicator, Card } from "../../hocs";

export const ChangePassword = () => {
  const { location, navigation } = useNavigation();
  const { navigate, routes } = navigation;
  const { toast } = useAuth();

  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const { changePasswordLoader } = login;

  let query = useQuery();

  const token = query.get("token");

  function useQuery() {
    return new URLSearchParams(location?.search);
  }

  const onSubmit = async (data, event) => {
    event.preventDefault();

    dispatch(
      changePassword(
        {
          token,
          newPass: data.password,
        },
        toast,
        () => {
          // router.push("/login");
          navigate(routes.Login.path);
        },
      ),
    );
  };

  return (
    <>
      <div className="change-password-container">
        <div className="change-password">
          <Card>
            <form className="change-contents" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="change-head">Reset Password</h1>

              <div className="change-fields">
                <h1 className="change-fields-title">New Password</h1>
                <InputField
                  placeholder="Password"
                  name="password"
                  ref={register({
                    required: "You must specify a password",
                  })}
                  type="password"
                />
              </div>

              <div className="change-fields">
                <h1 className="change-fields-title">Confirm Password</h1>
                <InputField
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  ref={register({
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  type="password"
                />
              </div>
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}

              <div className="change-action">
                <ActivityIndicator animating={changePasswordLoader}>
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
    </>
  );
};
