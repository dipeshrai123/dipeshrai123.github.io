import React, { useEffect } from "react";
import { useNavigation } from "react-auth-navigation";
import { BuildingPage } from "./pages/building";
import { AddBuildingPage } from "./pages/building/add";
import { EditBuildingPage } from "./pages/building/edit";

// auth
// import { VerifyToken, ForgetPassword } from "./pages/auth/components";
// icons
import { MdDashboard, RiBuildingFill } from "react-icons/all";
// import { GenericCheck } from "./pages/genericsDemo/generics";
// import { DemoPage } from "./pages/demo/demo.page";

import {
  AddSample,
  EditSample,
  ListSample,
  ViewSample,
  Demo,
  GenericCheck,
  Login,
  ChangePassword,
  NotFound,
  Dashboard,
  ForgetPassword,
  VerifyToken,
} from "./pages";

const Redirect = ({ to }) => {
  const {
    navigation: { navigate },
  } = useNavigation();

  useEffect(() => {
    navigate(to);
  }, [to, navigate]);

  return null;
};

export const publicPaths = [
  {
    name: "Root",
    path: "/",
    component: Login,
    restricted: true,
  },
  {
    name: "Login",
    path: "/log-in",
    component: Login,
    restricted: true,
  },
  {
    name: "Auth",
    path: "/auth",
    component: () => <Redirect to="/" />,
    restricted: true,
    subPaths: [
      {
        name: "Verify",
        path: "/verify",
        component: VerifyToken,
        restricted: true,
      },
      {
        name: "Forget",
        path: "/forget",
        component: ForgetPassword,
        restricted: true,
      },
    ],
  },

  {
    path: null,
    component: NotFound,
  },
];

export const privatePaths = [
  {
    name: "Dashboard",
    key: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
    props: {
      icon: <MdDashboard />,
    },
  },
  {
    name: "Sample",
    path: "/sample",
    component: () => <Redirect to="/sample/list" />,
    props: {
      icon: <RiBuildingFill />,
    },
    subPaths: [
      {
        name: "List Sample",
        path: "/list",
        component: ListSample,
        props: {
          group: "Sample",
        },
      },
      {
        name: "Add Sample",
        path: "/add",
        component: AddSample,
        props: {
          group: "Sample",
        },
      },
      {
        name: "Edit Sample",
        path: "/edit/:id",
        component: EditSample,
      },
    ],
  },
  {
    name: "Building",
    path: "/building",
    component: () => <Redirect to="/building/list" />,
    props: {
      icon: <RiBuildingFill />,
    },
    subPaths: [
      {
        name: "List Buildings",
        path: "/list",
        component: BuildingPage,
        props: {
          group: "Building",
        },
      },
      {
        name: "Add Building",
        path: "/add",
        component: AddBuildingPage,
        props: {
          group: "Building",
        },
      },
      {
        name: "Edit Building",
        path: "/edit/:id",
        component: EditBuildingPage,
      },
    ],
  },
  {
    name: "Demo",
    key: "Demo",
    path: "/demo",
    component: Demo,
    props: {
      icon: <MdDashboard />,
    },
  },
  {
    name: "Demo Generic",
    key: "Demo Generic",
    path: "/demo-generic",
    component: GenericCheck,
    props: {
      icon: <MdDashboard />,
    },
  },
];
