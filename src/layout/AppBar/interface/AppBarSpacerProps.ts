import * as React from "react";
/**
 * Represents the props of the AppBarSpacer component.
 * Used to give additional white space between the AppBar sections and provides a way for customizing its width.
 */
export interface AppBarSpacerProps {
  /**
   * Represents the children that are passed to the AppBarSection.
   */
  children?: any;
  /**
   * Sets additional CSS classes to the AppBarSpacer.
   */
  className?: string;
  /**
   * Sets additional CSS styles to the AppBarSpacer.
   */
  style?: React.CSSProperties;
}
