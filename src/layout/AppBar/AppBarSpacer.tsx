import * as React from 'react';
import * as PropTypes from 'prop-types';
import { focusFirstFocusableChild } from '../../utils/focus';
import { classNames } from '../../utils/classNames';
import { AppBarSpacerProps } from './interface/AppBarSpacerProps';

/**
 * The AppBarSpacer ref.
 */

export interface AppBarSpacerHandle {
    /**
     * The AppBarSpacer element.
     */
    element: HTMLDivElement | null;
    /**
     * Focus the AppBarSpacer.
     */
    focus: () => void;
}

/**
 * Used to give additional white space between the AppBar sections and provides a way for customizing its width.
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
 *      </AppBar>
 *   );
 * };
 *    ReactDOM.render(<App />, document.querySelector('my-app'));
 * ```
 */
export const AppBarSpacer = React.forwardRef<AppBarSpacerHandle | null, AppBarSpacerProps>((props, target) => {
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
        (): AppBarSpacerHandle => ({
            element: elementRef.current,
            focus: focusElement
        }),
        [focusElement]
    );

    React.useImperativeHandle(target, getImperativeHandle);

    const spacerClasses = React.useMemo(
        () => classNames(
            'k-appbar-spacer',
            {
                'k-appbar-spacer-sized': style && style.width && style.width !== null
            },
            className
        ),
        [className, style]
    );

    const spacerStyles = React.useMemo(
        () => {
            return {
                flexBasis: style && style.width ? style.width : undefined
            };
        },
        [style]
    );
    return (
      <span className={spacerClasses} style={spacerStyles}>
        {children}
      </span>
    );
});
