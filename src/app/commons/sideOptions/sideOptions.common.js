import React, { useRef } from "react";
import {
  useMountedValue,
  interpolate,
  AnimatedBlock,
  useOutsideClick,
} from "react-ui-animate";
import { Card } from "../../hocs";
export const SideOptions = (props) => {
  const open = useMountedValue(props.open, [0, 1, 0]);
  const clickoutside = useRef();

  useOutsideClick(clickoutside, () => {
    props.close();
  });

  return (
    <>
      {open((animation, mounted) => {
        return (
          mounted && (
            <AnimatedBlock
              ref={clickoutside}
              style={{
                right: interpolate(animation.value, [0, 1], [-400, 0]),
              }}
              className="sideoptions-wrapper">
              <Card>Hello world</Card>
            </AnimatedBlock>
          )
        );
      })}
    </>
  );
};
