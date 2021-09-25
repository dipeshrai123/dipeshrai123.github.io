import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useAnimatedValue, AnimatedBlock, interpolate } from "react-ui-animate";

export const CheckBox = React.forwardRef(
  ({ label, name, handleCheckboxChange, check }, ref) => {
    const checknow = useAnimatedValue(!!check);

    const toggleCheckboxChange = () => {
      handleCheckboxChange(name);
    };

    return (
      <div className="checkbox-container">
        <div className="checkbox">
          <label
            style={{
              display: "flex",
            }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "inherit",
                justifyContent: "inherit",
                position: "relative",
                cursor: "pointer",
              }}>
              <input
                ref={ref}
                name={name}
                type="checkbox"
                checked={check}
                onChange={toggleCheckboxChange}
                style={{
                  top: 0,
                  left: 0,
                  width: "100%",
                  cursor: "inherit",
                  height: "100%",
                  margin: 0,
                  opacity: 0,
                  padding: 0,
                  zIndex: 1,
                  position: "absolute",
                }}
              />
              <AnimatedBlock
                style={{
                  border: interpolate(
                    checknow.value,
                    [1, 0],
                    ["1px solid #3bc35a", "1px solid grey"],
                  ),
                  borderRadius: 15,
                  height: 20,
                  width: 20,
                }}>
                <AnimatedBlock
                  style={{
                    border: "2px solid white",
                    borderRadius: 10,
                    height: 18,
                    width: 18,
                    background: interpolate(
                      checknow.value,
                      [1, 0],
                      ["#3bc35a", "white"],
                    ),
                  }}
                />
              </AnimatedBlock>
            </div>
            <div className="checkbox-label">{label}</div>
          </label>
        </div>
      </div>
    );
  },
);

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};
