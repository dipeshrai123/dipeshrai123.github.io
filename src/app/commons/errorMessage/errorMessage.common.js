import React from "react";

export const ErrorMessage = ({ errorValue }) => (
  <p
    style={{
      color: "red",
    }}>
    {errorValue}
  </p>
);
