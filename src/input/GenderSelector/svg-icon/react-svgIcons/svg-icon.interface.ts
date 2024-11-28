import { string } from "prop-types";

/**
 * Define SVG icon data structure
 */
export interface SVGIconData {
  /**
   * The unique name of svg icon
   */
  name: string;
  /**
   * The entire SVG content of icon
   */
  content: string;
  /**
   * The [viewbox](https://developer.mozilla.org/ko/docs/Web/SVG/Attribute/viewBox)
   * Definition that should be used for the icon
   */
  viewBox: string;
}
