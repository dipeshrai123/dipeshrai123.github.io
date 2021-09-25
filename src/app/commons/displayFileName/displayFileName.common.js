import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";

export const DisplayFileName = ({ label, onClick, old }) => {
  return (
    <div
      style={{
        border: old ? "1px solid #e1e1e1" : "1px solid #0284a4",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 4,
        padding: "5px 10px",
      }}>
      <div>{label}</div>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}>
        <RiCloseCircleFill color="red" size={25} />
      </div>
    </div>
  );
};
