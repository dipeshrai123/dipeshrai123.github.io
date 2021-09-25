export const userType = {
  SUPERADMIN: "SUPERADMIN",
  USER: "user",
};

export const userRoles = {
  [userType.SUPERADMIN]: {
    access: [
      "/",
      "/change-password",
      "/dashboard",
      "/building/*",
      "/sample/*",
      "/demo",
      "/demo-generic",
    ],
  },
  [userType.USER]: {
    access: ["/", "/log-in", "/change-password", "/auth/*"],
  },
};
