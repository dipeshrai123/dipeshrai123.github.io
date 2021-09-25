import React from "react";
import { CompWrapper } from "../../hocs";

import { VerifyToken, ForgetPassword } from "./components";

export function Auth() {
  // const { query } = router;

  const getAuthRoute = () => {
    // switch (query.authName) {
    //   case "verify":
    //     return <VerifyToken />;
    //   case "forget":
    //     return <ForgetPassword />;
    //   default:
    //     return null;
    // }
  };

  return (
    <CompWrapper>
      <p>AUTH</p>
      {/* {getAuthRoute()} */}
    </CompWrapper>
  );
}
