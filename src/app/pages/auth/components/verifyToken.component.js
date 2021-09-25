import React, { useEffect } from "react";
import { useAuth, useNavigation } from "react-auth-navigation";
import { useDispatch, useSelector } from "react-redux";

import { verifyUser } from "../../../../redux";

export function VerifyToken() {
  const { location, navigation } = useNavigation();
  const { navigate } = navigation;
  const { toast } = useAuth();
  const dispatch = useDispatch();
  const { user, loading, verificationSuccess } = useSelector(
    (state) => state.user,
  );

  const token = location.search.replace("?token=", "");

  useEffect(() => {
    if (token !== null && token !== undefined) {
      dispatch(
        verifyUser(token, toast, () => {
          // redirect to `/`
          navigate("/");
        }),
      );
    }
  }, [token]);

  return (
    <div className="auth-verification-container">
      {loading ? (
        <div className="auth-verification">
          <p className="auth-verification-info">Verifying...</p>
        </div>
      ) : verificationSuccess ? (
        <div className="auth-verification">
          <h1 className="auth-verification-header">Email Verification</h1>

          <p className="auth-verification-info">
            Email verification for <b>{user?.email}</b>
          </p>

          <div className="auth-verification-suggestion">
            <p className="suggestion-para">
              Your email verification has complete... Redirecting...
            </p>
          </div>
        </div>
      ) : (
        <div className="auth-verification">
          <h1 className="auth-verification-header">Email Verification</h1>

          <div className="auth-verification-suggestion">
            <p className="suggestion-para">
              <div>Sorry, We cannot verify your account!</div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
