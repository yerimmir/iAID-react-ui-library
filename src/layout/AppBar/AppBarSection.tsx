import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AppBarSectionProps } from './interface/AppBarSectionProps';
import { classNames } from '../../utils/classNames';
import { focusFirstFocusableChild } from '../../utils/focus';


/**
 * The AppBarSection ref.
 */

export interface AppBarSectionHandle {
    /**
     * The AppBarSection element.
     */
    element: HTMLDivElement | null;
    /**
     * Focus the AppBarSection.
     */
    focus: () => void;
}

/**
 * Represents AppBarSection component.
 *
 * @example
 * ```jsx
 *
 * const App = () => {
 *   return (
 *       <AppBar>
 *           <AppBarSection>
 *               <span className="k-icon k-i-menu" />
 *           </AppBarSection>
 *
 *           <AppBarSpacer style={{ width: 8 }} />
 *
 *           <AppBarSection>
 *               <h1 className="title">{tc.text} AppBar</h1>
 *           </AppBarSection>
 *
 *           <AppBarSpacer />
 *
 *           <AppBarSection>
 *               <BadgeContainer>
 *                   <span className="k-icon k-i-bell" />
 *                   <Badge themeColor="info" shape="dot" />
 *               </BadgeContainer>
 *           </AppBarSection>
 *      </AppBar>
 *   );
 * };
 *    ReactDOM.render(<App />, document.querySelector('my-app'));
 * ```
 */
export const AppBarSection = React.forwardRef<AppBarSectionHandle | null, AppBarSectionProps>((props, target) => {
    const {
        children, className, style
    } = props;

    const elementRef = React.useRef<HTMLDivElement>(null);
    const focusElement = React.useCallback(
        () => {
            if (elementRef.current) {
                focusFirstFocusableChild(elementRef.current);
            }
        },
        []
    );

    const getImperativeHandle = React.useCallback(
        (): AppBarSectionHandle => ({
            element: elementRef.current,
            focus: focusElement
        }),
        [focusElement]
    );

    React.useImperativeHandle(target, getImperativeHandle);

    const sectionClasses = React.useMemo(
        () => classNames(
            'k-appbar-section',
            className
        ),
        [className]
    );
    return (
      <div className={sectionClasses} style={style}>
        {children}
      </div>
    );
});