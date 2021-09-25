import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../../../utils";

export const KeyValue = ({ data, rightAligned }) => {
  return (
    <div className="keyvalue-table">
      {Object.keys(data).map(function (key, index) {
        let cName = "keyvalue";
        if (rightAligned) cName += " right-aligned";

        return (
          <div key={index} className={cName}>
            <div className="left">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </div>
            <div className="right">{data[key]}</div>
          </div>
        );
      })}
    </div>
  );
};

KeyValue.propTypes = {
  data: PropTypes.object,
  rightAligned: PropTypes.bool,
};
