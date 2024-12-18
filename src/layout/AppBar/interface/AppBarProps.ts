import * as React from "react";
/**
 * Represents the props of the AppBar component
 * Used to display information, actions, branding titles and additional navigation on the current screen.
 */
export interface AppBarProps {
  /**
   * Represents the children that are passed to the AppBar.
   */
  children?: any;
  /**
   * Sets additional CSS classes to the AppBar.
   */
  className?: string;
  /**
   * Sets additional CSS styles to the AppBar.
   */
  style?: React.CSSProperties;
  /**
   * Sets the `id` property of the root AppBar element.
   */
  id?: string;
  /**
   * Specifies the position of the AppBar.
   *
   * * The possible values are:
   * * 'top' (Default)
   * * 'bottom'
   *
   */
  position?: AppBarPosition;
  /**
   * Specifies the positionMode of the AppBar.
   *
   * * The possible values are:
   * * 'static' (Default)
   * * 'sticky'
   * * 'fixed'
   */
  positionMode?: AppBarPositionMode;
  /**
   * Specifies the theme color of the AppBar.
   *
   * * The possible values are:
   * * `inherit`
   * * `light` (Default)
   * * `dark`
   *
   */
  themeColor?: AppBarThemeColor;
}

/**
 * Specifies the position of the AppBar.
 *
 * * The possible values are:
 * * 'top' (Default)
 * * 'bottom'
 *
 */
export type AppBarPosition = "top" | "bottom";

/**
 * Specifies the positionMode of the AppBar.
 *
 * * The possible values are:
 * * 'static' (Default)
 * * 'sticky'
 * * 'fixed'
 */
export type AppBarPositionMode = "static" | "sticky" | "fixed";

/**
 * Specifies the theme color of the AppBar.
 *
 * * The possible values are:
 * * `inherit`
 * * `light` (Default)
 * * `dark`
 *
 */
export type AppBarThemeColor = "light" | "dark" | "inherit";
