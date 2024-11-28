import classNames from "classnames";
import * as React from "react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { focusFirstFocusableChild } from "../../utils/focus";
import { guid } from "../../utils/guid";
import { AppBarProps } from "./interface/AppBarProps";

/**
 * AppBar ref.
 */
export interface AppBarHandle {
  /**
   * The Appbar element.
   */
  element: HTMLDivElement | null;
    /**
     * Focus the AppBar.
     */
  focus: () => void;
}

/**
 * Represents the AppBar component.
 * Used to display information, actions, branding titles and additional navigation on the current screen.
 *
 * @example
 * ```jsx
 *
 * const App = () => {
 *   return (
 *       <AppBar>
 *           <AppBarSection>
 *               <h1 className="title">{tc.text} AppBar</h1>
 *           </AppBarSection>
 *           <AppBarSpacer />
 *      </AppBar>
 *   );
 * };
 *    ReactDOM.render(<App />, document.querySelector('my-app'));
 * ```
 */
export const AppBar = forwardRef<AppBarHandle | null, AppBarProps>(
  (props, target) => {
    const {
      position: positionProp = "top",
      positionMode: positionModeProp = "static",
      themeColor: themeColorProp = "light",
      children,
      className,
      style,
      id,
    } = props;

    const elementRef = useRef<HTMLDivElement>(null);
    const focusElement = React.useCallback(() => {
      if (elementRef.current) {
        focusFirstFocusableChild(elementRef.current);
      }
    }, []);

    const getImperativeHandle = useCallback(
      (): AppBarHandle => ({
        element: elementRef.current,
        focus: focusElement,
      }),
      [focusElement]
    );

    useImperativeHandle(target, getImperativeHandle);

    const generatedId = useMemo(() => guid(), []);

    const themeColor = useMemo(() => themeColorProp, [themeColorProp]);

    const position = useMemo(() => positionProp, [positionProp]);

    const positionMode = useMemo(() => positionModeProp, [positionModeProp]);

    const appbarClasses = useMemo(
      () =>
        classNames(
          "k-appbar",
          {
            "k-appbar-top": position === "top",
            "k-appbar-bottom": position === "bottom",
            "k-appbar-static": positionMode === "static",
            "k-appbar-sticky": positionMode === "sticky",
            "k-appbar-fixed": positionMode === "fixed",
            "k-appbar-light": themeColor === "light",
            "k-appbar-dark": themeColor === "dark",
            "k-appbar-inherit": themeColor === "inherit",
          },
          className
        ),
      [position, positionMode, themeColor, className]
    );
    return (
      <div className={appbarClasses} style={style} id={id || generatedId}>
        {children}
      </div>
    );
  }
);
