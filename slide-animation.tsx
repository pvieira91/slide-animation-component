import { CSSTransitionGroup } from "react-transition-group";
import styled, {
  StyledProps,
  injectGlobal
} from "../../../theme/themed-styled-components";
import * as React from "react";

const ANIMATION_DURATION_MS = 350;

export enum SlideAnimationsDirection {
  FROM_BOTTOM,
  FROM_TOP,
  FROM_LEFT,
  FROM_RIGHT
}

interface ComponentProps {
  direction: SlideAnimationsDirection;
}

export const SlideAnimation: React.SFC<ComponentProps> = props => (
  <CSSTransitionGroup
    transitionName={`slide-animation-${props.direction}`}
    transitionAppear={true}
    transitionAppearTimeout={ANIMATION_DURATION_MS}
    transitionEnterTimeout={ANIMATION_DURATION_MS}
    transitionLeaveTimeout={ANIMATION_DURATION_MS}
  >
    {props.children}
  </CSSTransitionGroup>
);

const directionToCssTransform = {
  [SlideAnimationsDirection.FROM_BOTTOM]: "translate(0%, 100%)",
  [SlideAnimationsDirection.FROM_LEFT]: "translate(-100%, 0%)",
  [SlideAnimationsDirection.FROM_RIGHT]: "translate(100%, 0%)",
  [SlideAnimationsDirection.FROM_TOP]: "translate(0%, -100%)"
};

const createCssAnimation = (direction: SlideAnimationsDirection) => {
  const animationName = `.slide-animation-${direction}`;
  const enterAnimationName = `${animationName}-enter`;
  const enterActiveAnimationName = `${animationName}-enter-active`;
  const appearAnimationName = `${animationName}-appear`;
  const appearActiveAnimationName = `${animationName}-appear-active`;
  const leaveAnimationName = `${animationName}-leave`;
  const leaveActiveAnimationName = `${animationName}-leave-active`;
  const startCssTransformValue = "translate(0%, 0%)";
  const endCssTransformValue = directionToCssTransform[direction];
  const transitionCssRule = `transition: all ${ANIMATION_DURATION_MS}ms cubic-bezier(0.42, 0, 0.06, 1);`;

  return `${enterAnimationName} {
    transform: ${endCssTransformValue};
  }

  ${enterAnimationName}${enterActiveAnimationName} {
    ${transitionCssRule};
    transform: ${startCssTransformValue}
  }

  ${appearAnimationName} {
    transform: ${endCssTransformValue};
  }

  ${appearAnimationName}${appearActiveAnimationName} {
    ${transitionCssRule};
    transform: ${startCssTransformValue}
  }

  ${leaveAnimationName} {
    transform: ${startCssTransformValue};
  }

  ${leaveAnimationName}${leaveActiveAnimationName} {
    transform: ${endCssTransformValue};
    ${transitionCssRule};
  }`;
};

injectGlobal`
  ${[
    SlideAnimationsDirection.FROM_BOTTOM,
    SlideAnimationsDirection.FROM_TOP,
    SlideAnimationsDirection.FROM_LEFT,
    SlideAnimationsDirection.FROM_RIGHT
  ].map(createCssAnimation)};
`;
