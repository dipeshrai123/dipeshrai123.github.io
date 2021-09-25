import React, { useRef, useState } from "react";
import { SpringCore, AnimatedBlock } from "react-ui-animate";
import PropTypes from "prop-types";

import { Text } from "../";

const { useTransition } = SpringCore;

export const Button = ({ title, leftIcon, rightIcon, className, ...rest }) => {
  const _className = ["button"];
  _className.push("default");
  if (className) _className.push(className);

  return (
    <button className={_className.join(" ")} {...rest}>
      {leftIcon && (
        <Text button style={{ marginRight: 4 }}>
          {leftIcon}
        </Text>
      )}
      {title && <Text button>{title}</Text>}
      {rightIcon && (
        <Text button style={{ marginLeft: 4 }}>
          {rightIcon}
        </Text>
      )}
    </button>
  );
};

const IconButton = (props) => {
  const { icon, className, ...rest } = props;

  const _className = ["button"];
  _className.push("icon");
  if (className) _className.push(className);

  return (
    <button className={_className.join(" ")} {...rest}>
      {icon && <Text button>{icon}</Text>}
    </button>
  );
};

const RippleButton = ({
  title,
  leftIcon,
  rightIcon,
  className,
  onClick,
  ...rest
}) => {
  const [ripples, setRipples] = useState([]);
  const key = useRef(0);
  const trasitions = useTransition(ripples, {
    from: { scale: 0, opacity: 1 },
    enter: (item) => async (next) => {
      await next({
        scale: 2.5,
        opacity: 0,
        config: { duration: 500 },
        onRest: function () {
          setRipples((prev) => prev.filter((val) => val.key !== item.key));
        },
      });
    },
  });

  const handleRipple = (e) => {
    key.current = key.current + 1;
    var viewportOffset = e.currentTarget.getBoundingClientRect();
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    const ripplesClone = [
      ...ripples,
      {
        key: key.current,
        x: e.clientX - left - 50,
        y: e.clientY - top - 50,
      },
    ];
    setRipples(ripplesClone);
  };

  const _className = ["button"];
  _className.push("ripple");
  if (className) _className.push(className);

  return (
    <button
      className={_className.join(" ")}
      {...rest}
      onMouseDown={(e) => {
        handleRipple(e);
      }}
      onMouseUp={(e) => {
        onClick && onClick(e);
      }}>
      {leftIcon && (
        <Text button style={{ marginRight: 4 }}>
          {leftIcon}
        </Text>
      )}
      {title && <Text button>{title}</Text>}
      {rightIcon && (
        <Text button style={{ marginLeft: 4 }}>
          {rightIcon}
        </Text>
      )}
      {trasitions(({ scale, opacity }, item) => {
        return (
          <AnimatedBlock
            className="rippleoverlay"
            style={{
              left: item.x,
              top: item.y,
              scale,
              opacity,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </button>
  );
};

Button.Icon = IconButton;
Button.Ripple = RippleButton;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
