import { IconFlip } from "./models/flip";
import { IconSize } from "./models/size";
import { IconThemeColor } from "./models/theme-color";

/**
 * @hidden
 */
export interface BaseIconProps {
  /**
   * Sets additional CSS styles to the icon.
   */
  style?: React.CSSProperties;
  /**
   * Specifies a list of CSS classes that will be added to the root DOM element.
   */
  className?: string;
  /**
   * Specifies the theme color of the Icon.
   *
   * The possible values are:
   * * `inherit` (Default)&mdash;Applies coloring based on the current color.
   * * `primary` &mdash;Applies coloring based on primary theme color.
   * * `secondary`&mdash;Applies coloring based on secondary theme color.
   * * `tertiary`&mdash; Applies coloring based on tertiary theme color.
   * * `info`&mdash;Applies coloring based on info theme color.
   * * `success`&mdash; Applies coloring based on success theme color.
   * * `warning`&mdash; Applies coloring based on warning theme color.
   * * `error`&mdash; Applies coloring based on error theme color.
   * * `dark`&mdash; Applies coloring based on dark theme color.
   * * `light`&mdash; Applies coloring based on light theme color.
   * * `inverse`&mdash; Applies coloring based on inverse theme color.
   *
   * If the property is not set, the icon inherits the color from its parent.
   *
   * You can use the `style` prop to apply custom color related properties to the icon.
   */
  themeColor?: IconThemeColor;
  /**
   * Specifies the size of the icon.
   *
   * The possible values are:
   * * `default` (Default)&mdash;Font-size: 16px; Width: 16px; Height: 16px.
   * * `xsmall`&mdash;Font-size: 8px; Width: 8px; Height: 8px.
   * * `small`&mdash;Font-size: 12px; Width: 12px; Height: 12px.
   * * `medium`&mdash;Font-size: 32px; Width: 32px; Height: 32px.
   * * `large`&mdash;Font-size: 48px; Width: 48px; Height: 48px.
   * * `xlarge`&mdash;Font-size: 64px; Width: 64px; Height: 64px.
   *
   * You can use the `style` prop to apply custom font size to the icon.
   */
  size?: IconSize;
  /**
   * Specifies the icon flip direction.
   *
   * The possible values are:
   * * `default` (Default)&mdash;No flipping applied.
   * * `horizontal`&mdash;Flips the icon in horizontal direction.
   * * `vertical`&mdash;Flips the icon in vertical direction.
   * * `both`&mdash;Flips the icon in both horizontal and vertical directions.
   *
   */
  flip?: IconFlip;
}
