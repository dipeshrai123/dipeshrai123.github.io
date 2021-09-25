import React from "react";
import PropTypes from "prop-types";
import { useBreakPoints } from "../../../hooks/useBreakPoints.hook";

const GridContainer = ({ childs, lg, md, sm, children }) => {
  const [size, setSize] = React.useState();
  useBreakPoints(
    {
      576: "sm",
      768: "md",
      15000: "lg",
    },
    function (value) {
      setSize(value);
    },
  );

  const getRepeat = (size) => {
    switch (size) {
      case "sm":
        return sm;
      case "md":
        return md;
      case "lg":
        return lg;
      default:
        return lg;
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${getRepeat(size)},1fr)`,
        rowGap: 16,
        columnGap: 16,
      }}>
      {children}
    </div>
  );
};

const GridItem = ({ children, lg }) => {
  return (
    <div
      style={{
        background: "red",
        width: "100%",
        height: 100,
      }}>
      {children}
    </div>
  );
};

export const Grid = {
  Container: GridContainer,
  Item: GridItem,
};

GridContainer.propTypes = {
  lg: PropTypes.number.isRequired,
  md: PropTypes.number.isRequired,
  sm: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
};
