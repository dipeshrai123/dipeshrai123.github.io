import React from "react";
import PropTypes from "prop-types";

export const Text = ({
  children,
  p,
  pl,
  pr,
  pt,
  pb,
  m,
  ml,
  mr,
  mt,
  mb,
  className,
  displayxlarge,
  displaylarge,
  displaymedium,
  pageheading,
  heading,
  body,
  subheading,
  caption,
  button,
  style,
  ...rest
}) => {
  const padding = { pl: pl ?? p, pr: pr ?? p, pt: pt ?? p, pb: pb ?? p };
  const margin = { ml: ml ?? m, mr: mr ?? m, mt: mt ?? m, mb: mb ?? m };

  let cName = ["body"];

  if (displayxlarge) cName = ["displayxlarge"];
  if (displaylarge) cName = ["displaylarge"];
  if (displaymedium) cName = ["displaymedium"];
  if (pageheading) cName = ["pageheading"];
  if (heading) cName = ["heading"];
  if (subheading) cName = ["subheading"];
  if (body) cName = ["body"];
  if (caption) cName = ["caption"];
  if (button) cName = ["buttontext"];
  if (className) cName.push(className);

  return (
    <p
      {...rest}
      style={{
        padding: `${padding.pt}px ${padding.pr}px ${padding.pb}px ${padding.pl}px `,
        margin: `${margin.mt}px ${margin.mr}px ${margin.mb}px ${margin.ml}px `,
        ...style,
      }}
      className={cName.join(" ")}>
      {children}
    </p>
  );
};

Text.propTypes = {
  children: PropTypes.any,
  displayxlarge: PropTypes.bool,
  displaylarge: PropTypes.bool,
  displaymedium: PropTypes.bool,
  pageheading: PropTypes.bool,
  heading: PropTypes.bool,
  subheading: PropTypes.bool,
  body: PropTypes.bool,
  caption: PropTypes.bool,
  button: PropTypes.bool,
  p: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
  pt: PropTypes.number,
  pb: PropTypes.number,
  m: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
  className: PropTypes.string,
};

Text.defaultProps = {
  p: 0,
  m: 0,
};
