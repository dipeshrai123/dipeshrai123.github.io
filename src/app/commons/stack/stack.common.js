import React from "react";
import PropTypes from "prop-types";

export const Stack = ({
  children,
  flex,
  p,
  px,
  py,
  pl,
  pr,
  pt,
  pb,
  m,
  mx,
  my,
  ml,
  mr,
  mt,
  mb,
  spacing,
  className,
  style,

  direction,
  align,
  justify,
  wrap,

  ...rest
}) => {
  const padding = {
    pl: pl ?? px ?? p,
    pr: pr ?? px ?? p,
    pt: pt ?? py ?? p,
    pb: pb ?? py ?? p,
  };

  const margin = {
    ml: ml ?? mx ?? m,
    mr: mr ?? mx ?? m,
    mt: mt ?? my ?? m,
    mb: mb ?? my ?? m,
  };

  const cName = ["box"];

  if (className) cName.push(className);

  return (
    <div
      {...rest}
      style={{
        padding: `${padding.pt}px ${padding.pr}px ${padding.pb}px ${padding.pl}px `,
        margin: `${margin.mt}px ${margin.mr}px ${margin.mb}px ${margin.ml}px `,
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        flex: `${flex}`,
        columnGap: spacing,
        rowGap: spacing,
        ...style,
      }}
      className={cName.join(" ")}>
      {children}
    </div>
  );
};

Stack.propTypes = {
  children: PropTypes.any,
  p: PropTypes.number,
  px: PropTypes.number,
  py: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
  pt: PropTypes.number,
  pb: PropTypes.number,
  m: PropTypes.number,
  my: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
  spacing: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Stack.defaultProps = {
  p: 0,
  m: 0,
};
