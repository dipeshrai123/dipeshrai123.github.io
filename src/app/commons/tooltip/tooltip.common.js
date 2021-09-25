import React from "react";
import PropTypes from "prop-types";

export const ToolTip = (props) => {
  const { children, text, style, containerStyle, left, right, top } = props;
  const position = top
    ? { bottom: "100%", left: "50%", transform: "translateX(-50%)" }
    : right
    ? { left: "100%", top: "50%", transform: "translateY(-50%)" }
    : left
    ? { right: "100%", top: "50%", transform: "translateY(-50%)" }
    : { top: "100%", left: "50%", transform: "translateX(-50%)" };

  return (
    <span className="tooltip-wrapper" style={{ ...containerStyle }}>
      {children ? children : null}
      <span className="tooltip-text" style={Object.assign(position, style)}>
        {text ? text : null}
      </span>
    </span>
  );
};

ToolTip.propTypes = {
  children: PropTypes.any,
  text: PropTypes.string,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
};

{
  /* <span className="tooltip-text" style={{ left: 0, bottom: "100%" }}> */
}
