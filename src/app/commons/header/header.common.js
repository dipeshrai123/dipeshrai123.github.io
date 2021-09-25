import React, { useState, useRef } from "react";
import { Modal, Dropdown, Menu } from "react-uicomp";
import { useAuth } from "react-auth-navigation";

import { useForm } from "react-hook-form";
import {
  MdMenu,
  FaUserCircle,
  MdKeyboardArrowDown,
  BsThreeDotsVertical,
  ImUser,
} from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";

import { passwordAction, logoutAction } from "../../../redux";
import { ActivityIndicator } from "../../hocs";
import { Breadcrumb, InputField, Button } from "..";

export const Header = (props) => {
  const { handleLogout, toast, setSideMenuStable, sideNavExpanded } = useAuth();
  const { register, handleSubmit, errors, watch } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  // const { passwordAction,  logoutAction } = props;
  const login = useSelector((state) => state.login);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { passwordLoader } = login;
  const { data } = user?.user;
  const { profile_details, user_details, company_details } = data;
  const [visible, setVisible] = useState(false);
  // const [optionsVisible, setOptionsVisible] = useState(false);

  const onSubmit = (data) => {
    console.log("data", data);
    let body = {
      oldPass: data.oldPassword,
      newPass: data.newPassword,
    };
    if (
      data.newPassword === data.confirmPassword &&
      data.newPassword.length > 7
    ) {
      dispatch(passwordAction(body, modalCloseHandler, toast));
    } else if (data.newPassword.length < 7) {
      toast({
        message: "Password must be atleaset 8 characters",
        type: "error",
      });
    } else {
      toast({
        message: "Password doesn't match. Please recheck",
        type: "error",
      });
    }
  };

  const modalCloseHandler = () => {
    setVisible(false);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div
            className="header-menu"
            onClick={() => setSideMenuStable((prev) => !prev)}>
            {sideNavExpanded ? (
              <BsThreeDotsVertical size={18} />
            ) : (
              <MdMenu size={22} />
            )}
          </div>
          <div className="header-breadcrumb">
            <Breadcrumb />
          </div>
        </div>

        <div className="header-right">
          {/* <div className="header-buttons">
            <button
              className="header-buttons-add"
              onClick={() => {
                setOptionsVisible(!optionsVisible);
              }}>
              <MdAddToPhotos />
            </button>
          </div> */}

          <div className="logged-user">
            <Dropdown
              placement="bottomright"
              style={{
                top: 0,
              }}
              trigger={() => (
                <div className="logged-user-container">
                  <span className="logged-user-icon">
                    <ImUser size={18} />
                  </span>

                  <span className="logged-user-name">
                    {profile_details?.profile_first_name}
                  </span>

                  <span className="logged-user-arrow-down">
                    <MdKeyboardArrowDown size={24} />
                  </span>
                </div>
              )}>
              <Menu.Container>
                <Menu.Item
                  className="menuItem"
                  onClick={() => setVisible(true)}>
                  Change Password
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  className="menuItem danger"
                  style={{ width: "100%", textAlign: "left" }}
                  onClick={() => dispatch(logoutAction(handleLogout, toast))}>
                  Logout
                </Menu.Item>
              </Menu.Container>
            </Dropdown>
            <Modal visible={visible} onOutsideClick={() => setVisible(false)}>
              <h3 style={{ marginBottom: 20 }}>Change Password</h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  rowGap: 10,
                }}>
                <InputField
                  name="oldPassword"
                  placeholder="Old Password"
                  type="password"
                  ref={register({ required: true })}
                />
                <InputField
                  placeholder="Password"
                  name="newPassword"
                  ref={register({
                    required: "You must specify a password",
                  })}
                  type="password"
                />
                <InputField
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  ref={register({
                    validate: (value) =>
                      value === newPassword.current ||
                      "The passwords do not match",
                  })}
                  type="password"
                />
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
                <ActivityIndicator animating={passwordLoader}>
                  <Button title="Submit" type="sumbit" />
                </ActivityIndicator>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
