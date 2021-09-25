import React, { useState, useEffect } from "react";
import { Toast, useToast } from "react-uicomp";
import { Auth, withNavigation } from "react-auth-navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { publicPaths, privatePaths } from "./routes.app";
import { userRoles, userType } from "./userRoles.app";

import { setCookie, removeCookie } from "../helpers";
import { userAuthAction, userAuthLogoutAction } from "../redux";

// IMPORT COMMONS
import { SideNav } from "./commons";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      userAuthAction,
      userAuthLogoutAction,
    },
    dispatch,
  );
};

const MemoChild = connect(
  mapStateToProps,
  mapDispatchToProps,
)((props) => {
  const { userAuthAction, userAuthLogoutAction, children } = props;
  const { handler, toast } = useToast();

  const [authLoading, setAuthLoading] = useState(true);
  const [config, setConfig] = useState({
    isLoggedIn: false,
    userRole: userType.USER,
  });

  const [sideNavExpanded, setSideNavExpanded] = useState(true); // for collapsible sidenav
  const [sideMenuStable, setSideMenuStable] = useState(sideNavExpanded);

  const loginSuccess = (role) => {
    setConfig({
      isLoggedIn: true,
      userRole: role,
    });
  };

  const loginFailure = () => {
    setConfig({
      isLoggedIn: false,
      userRole: userType.USER,
    });
  };

  useEffect(() => {
    userAuthAction(setAuthLoading, loginSuccess, loginFailure);
  }, [userAuthAction]);

  if (authLoading) {
    return <div>Redirecting...</div>;
  }

  return (
    <Auth.Provider
      config={config}
      state={{
        toast,
        // for collapsing sidenav
        sideNavExpanded,
        setSideNavExpanded,
        sideMenuStable,
        setSideMenuStable,
        handleLogin: (token, role) => {
          setCookie("token", token);
          loginSuccess(role);
        },
        handleLogout: () => {
          userAuthLogoutAction(() => {
            removeCookie("token");
            loginFailure();
          });
        },
      }}>
      {children}
      <Toast {...handler} errorColor="#ff4343" style={{ minWidth: 300 }} />
    </Auth.Provider>
  );
});

const App = () => {
  return (
    <MemoChild>
      {
        <>
          <Auth.Screens />
          <SideNav />
        </>
      }
    </MemoChild>
  );
};

export default withNavigation(App, {
  publicPaths,
  privatePaths,
  userRoles,
  routerType: "hash",
});
