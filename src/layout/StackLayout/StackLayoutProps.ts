import * as React from "react";

/**
 * Represents the props of the StackLayout component.
 */
export interface StackLayoutProps {
  /**
   * The React elements that will be rendered inside the StackLayout.
   */
  children?: React.ReactNode;
  /**
   * Sets additional CSS classes to the StackLayout.
   */
  className?: string;
  /**
   * Sets additional CSS styles to the StackLayout.
   */
  style?: React.CSSProperties;
  /**
   * Sets the `id` property of the root StackLayout element.
   */
  id?: string;
  /**
   * Specifies the gap between the inner elements ([see example]({% slug layout_stacklayout %}#toc-gaps)).
   */
  gap?: number | string;
  /**
   * Specifies the orientation of the StackLayout.
   * ([see example]({% slug layout_stacklayout %}#toc-orientation)).
   *
   * The possible values are:
   * * (Default)`horizontal`
   * * `vertical`
   */
  orientation?: StackLayoutOrientation;
  /**
   * Specifies the horizontal and vertical alignment of the inner StackLayout elements.
   * Demo ([here]({% slug layout_stacklayout %}#toc-horizontal-align)) and ([here]({% slug layout_stacklayout %}#toc-vertical-align)).
   *
   * The possible keys are:
   * * `horizontal`&mdash;Defines the possible horizontal alignment of the inner StackLayout elements.
   *   * `start`&mdash;Uses the start point of the container.
   *   * `center`&mdash;Uses the central point of the container.
   *   * `end`&mdash;Uses the end point of the container.
   *   * (Default)`stretch`&mdash;Stretches the items to fill the width of the container.
   * * `vertical`&mdash;Defines the possible vertical alignment of the inner StackLayout elements.
   *   * `top`&mdash;Uses the top point of the container.
   *   * `middle`&mdash;Uses the middle point of the container.
   *   * `bottom`&mdash;Uses the bottom point of the container.
   *   * (Default)`stretch`&mdash;Stretches the items to fill the height of the container.
   */
  align?: StackLayoutAlign;
}

/**
 * Specifies the orientation of the StackLayout ([see example]({% slug layout_stacklayout %}#toc-orientation)).
 *
 * The possible values are:
 * * (Default)`horizontal`
 * * `vertical`
 *
 */
export type StackLayoutOrientation = "horizontal" | "vertical";

/**
 * Specifies the horizontal and vertical alignment of the inner StackLayout elements.
 */
export interface StackLayoutAlign {
  /**
   * Defines the possible horizontal alignment of the inner StackLayout elements
   * ([see example]({% slug layout_stacklayout %}#toc-horizontal-align)).
   *
   * The available values are:
   * - `start`&mdash;Uses the start point of the container.
   * - `center`&mdash;Uses the center point of the container.
   * - `end`&mdash;Uses the end point of the container.
   * - (Default)`stretch`&mdash;Stretches the items to fill the width of the container.
   */
  horizontal?: "start" | "center" | "end" | "stretch";
  /**
   * Defines the possible vertical alignment of the inner StackLayout elements
   * ([see example]({% slug layout_stacklayout %}#toc-vertical-align)).
   *
   * The available values are:
   * - `top`&mdash;Uses the top point of the container.
   * - `middle`&mdash;Uses the middle point of the container.
   * - `bottom`&mdash;Uses the bottom point of the container.
   * - (Default)`stretch`&mdash;Stretches the items to fill the height of the container.
   */
  vertical?: "top" | "middle" | "bottom" | "stretch";
}
