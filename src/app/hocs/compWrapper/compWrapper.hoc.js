import React from "react";
import { useAuth } from "react-auth-navigation";
import {
  useAnimatedValue,
  AnimatedBlock,
  bInterpolate,
} from "react-ui-animate";

import { Header } from "../../commons";

export function CompWrapper(props) {
  const { children } = props;

  const { sideMenuStable } = useAuth();
  const sideMenuStableAnimation = useAnimatedValue(sideMenuStable);

  return (
    <AnimatedBlock
      className="compwrapper-container"
      style={{
        paddingLeft: bInterpolate(sideMenuStableAnimation.value, [110, 300]),
      }}>
      <Header />
      <div className="compwrapper">{children}</div>
    </AnimatedBlock>
  );
}
