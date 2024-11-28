import React from "react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { classNames } from "../../utils/classNames";
import { guid } from "../../utils/guid";
import { StackLayoutProps } from "./StackLayoutProps";

/**
 * Represents the Object which is passed to the [`ref`](https://reactjs.org/docs/refs-and-the-dom.html)
 * callback of the StackLayout component.
 */
export interface StackLayoutHandle {
  /**
   * Represents the current element. If no current element is present, `element` is `null`.
   */
  element: HTMLDivElement | null;
}
const DefaultHorizontalAlign = 'stretch'
const DefaultVerticalAlign = 'stretch'
/**
 * Arranges its inner elements horizontally, or vertically in a stack. Nesting stack layouts is supported to build more complex layouts.
 *
 * @example
 * ```jsx
 *
 * const App = () => {
 *   return (
 *     <StackLayout
 *       orientation="vertical"
 *       align={{horizontal: 'stretch', vertical: 'stretch'}}
 *       gap={10}
 *     >
 *       <div>Box</div>
 *       <div>Box</div>
 *       <div>Box</div>
 *       <div>Box</div>
 *     </StackLayout>
 *   );
 * };
 *    ReactDOM.render(<App />, document.querySelector('my-app'));
 * ```
 */
export const StackLayout = forwardRef<
  StackLayoutHandle | null,
  StackLayoutProps
>((props, ref) => {
  const { orientation: orientationProp = "horizontal" } = props;
  const elementRef = useRef<HTMLDivElement | null>(null);

  const getImperativeHandle = useCallback(
    (): StackLayoutHandle => ({
      element: elementRef.current,
    }),
    []
  );

  useImperativeHandle(ref, getImperativeHandle);

  const { align:alignProp, className, style, id, children } = props;
  const layoutId = useMemo(() => guid(), []);

  const orientation = useMemo(() => orientationProp, [orientationProp]);

  const isHorizontal = orientation === "horizontal";
  const hAlign = useMemo(
    () =>
    alignProp && alignProp?.horizontal
        ? alignProp?.horizontal
        : DefaultHorizontalAlign,
    [alignProp]
  );

  const vAlign = useMemo(
    () =>
    alignProp && alignProp.vertical
        ? alignProp.vertical
        : DefaultVerticalAlign,
    [alignProp]
  );2

  const stackLayoutClasses = useMemo(
    () =>
      classNames(
        "k-stack-layout",
        {
          "k-hstack": orientation === "horizontal",
          "k-vstack": orientation === "vertical",
          "k-justify-content-start":
            (isHorizontal && hAlign === "start") ||
            (!isHorizontal && vAlign === "top"),
          "k-justify-content-center":
            (isHorizontal && hAlign === "center") ||
            (!isHorizontal && vAlign === "middle"),
          "k-justify-content-end":
            (isHorizontal && hAlign === "end") ||
            (!isHorizontal && vAlign === "bottom"),
          "k-justify-content-stretch":
            (isHorizontal && hAlign === "stretch") ||
            (!isHorizontal && vAlign === "stretch"),
          "k-align-items-start":
            (!isHorizontal && hAlign === "start") ||
            (isHorizontal && vAlign === "top"),
          "k-align-items-center":
            (!isHorizontal && hAlign === "center") ||
            (isHorizontal && vAlign === "middle"),
          "k-align-items-end":
            (!isHorizontal && hAlign === "end") ||
            (isHorizontal && vAlign === "bottom"),
          "k-align-items-stretch":
            (!isHorizontal && hAlign === "stretch") ||
            (isHorizontal && vAlign === "stretch"),
        },
        className
      ),
    [orientation, isHorizontal, hAlign, vAlign, className]
  );
  const stackLayoutStyles = {
    gap: `${typeof props.gap === "number" ? props.gap + "px" : props.gap}`,
    ...style,
  };

  return (
    <div
      ref={elementRef}
      className={stackLayoutClasses}
      style={stackLayoutStyles}
      id={id || layoutId}
    >
      {children}
    </div>
  );
});
