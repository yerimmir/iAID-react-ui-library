import * as React from 'react';
import * as PropTypes from 'prop-types';

import { BaseIconProps } from './baseIconProps';
import { IconSize } from './models/size';
import { IconThemeColor } from './models/theme-color';
import { IconFlip } from './models/flip';
import { SIZE_CLASSES } from './constants';
import { classNames } from '../../../../utils/classNames';
import "./icon.scss"
// import './icon.css'
import { TrashCan } from '../react-svgIcons/icons/trash-can';
/**
 * @hidden
 * SVGIcon을 만들 때 필요한 타입들 지정
 */
export interface SVGIcon {
    /**
     * The unique name of the icon.
     */
    name: string;
    /**
     * The entire SVG content of the icon.
     */
    content: string;
    /**
     * The [viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)
     * definition that should be used for the icon.
     * viewBox는 svg가 그려지는 영역에서, svg 요소의 크기를 확대 또는 축소, 위치 조정이 가능한 속성,
     * 없이도 화면에 그릴 수 있지만, svg 요소 크기가 고정되어 반응형에 취약
     * 그 때 viewBox 속성을 사용하면 화면의 크기에 따라 요소의 크기가 자동으로 조절됨
     */
    viewBox: string;
}

/**
 * @hidden
 */
export interface SvgIconHandle {
    /**
     * The SvgIconHandle element.
     */
    element: HTMLSpanElement | null;
}

/**
 * Represents the props of the SvgIcon component.
 */
export interface SvgIconProps extends BaseIconProps, React.SVGAttributes<HTMLOrSVGElement> {
    /**
     * Specifies the SVG icon.
     *
     * * The possible keys are:
     * * `name`&mdash;The unique name of the icon.
     * * `content`&mdash;The entire SVG content of the icon.
     * * `viewBox`&mdash;The viewBox definition that should be used for the icon.
     */
    icon?: SVGIcon;
    /**
     * Specifies the viewBox of the custom SVG icon.
     */
    viewBox?: string;
    /**
     * Specifies a list of CSS classes that will be added to the svg element.
     */
    svgClassName?: string;
    /**
     * Sets additional CSS styles to the svg element.
     */
    svgStyle?: React.CSSProperties;
}

/**
 * Represents the SvgIcon component.
 *
 * @example
 * ```jsx
 *
 * const App = () => {
 *   return (
 *       <SvgIcon icon={accessibility} />
 *   );
 * };
 *    ReactDOM.render(<App />, document.querySelector('my-app'));
 * ```
 */
export const SvgIcon = React.forwardRef<SvgIconHandle | null, SvgIconProps>((props, ref) => {
    const {
        children, className, svgClassName, icon, flip,
        size, style, svgStyle, themeColor, viewBox, ...others
    } = props;

    const elementRef = React.useRef<HTMLSpanElement>(null);

    React.useImperativeHandle(
        ref,
        (): SvgIconHandle => ({
            element: elementRef.current
        })
    );

    const iconNameProp = React.useMemo(
        () => icon ? icon.name : defaultProps.icon,
        [icon]
    );

    const themeColorProp = React.useMemo(
        () => themeColor || defaultProps.themeColor,
        [themeColor]
    );

    const sizeProp = React.useMemo(
        () => size || defaultProps.size,
        [size]
    );

    const flipProp = React.useMemo(
        () => flip || defaultProps.flip,
        [flip]
    );

    const viewBoxProp = React.useMemo(
        () => viewBox || defaultProps.viewBox,
        [viewBox]
    );

    /**
     * 이름 붙여주어서 나중에 사용하기 편리하도록
     */
    const elementClassNames = React.useMemo(
        () => classNames(
            'k-svg-icon',
            'k-color-' + themeColorProp,
            /**
             * icon.scss에서 배경을 image로 주는 등 적절히 사용해서 icon화할 수 있음
             */
            'k-svg-i-' + iconNameProp,
            {
                'k-flip-h': flipProp === 'horizontal' || flipProp === 'both',
                'k-flip-v': flipProp === 'vertical' || flipProp === 'both'
            },
            SIZE_CLASSES[sizeProp],
            className
        ),
        [iconNameProp, themeColorProp, sizeProp, flipProp, className]
    );

    const elementStyle = React.useMemo(
        () => {
            if (props.width && props.height) {
                return { width: props.width, height: props.height, ...style };
            } else if (props.width) {
                return { width: props.width, height: props.width, ...style };
            } else if (props.height) {
                return { width: props.height, height: props.height, ...style };
            } else {
                return { ...style };
            }
        },
        [props.width, props.height, style]
    );

    return (
      <span
        className={elementClassNames}
        style={elementStyle}
        ref={elementRef}
        >
        <svg
          className={svgClassName}
          style={svgStyle}
          aria-hidden={true}
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={icon ? icon.viewBox : viewBoxProp}
          dangerouslySetInnerHTML={icon ? { __html: icon.content } : undefined}
          {...others}
            >
          {icon ? undefined : children}
        </svg>
      </span >
    );
});

/**
 * propTypes 지정
 * 이렇게 따로 지정해주면, 위에서 바로 지정해주는 것과 달리
 * javascript로 변환되고 타입 검사를 하지 않는 것이 아닌,
 * 런타임에도 타입 검사를 해줌
 * 실제 배포시에는 거의 사용하지 않고 디버깅이나 개발 과정중에 사용
 */
(SvgIcon as React.ComponentType).propTypes = {
    style: PropTypes.object,
    classNames: PropTypes.string,
    children: PropTypes.any,
    icon: PropTypes.object,
    themeColor: PropTypes.oneOf([
        'inherit', 'primary', 'secondary', 'tertiary',
        'info', 'success', 'error', 'warning',
        'dark', 'light', 'inverse'
    ]),
    size: PropTypes.oneOf(['default', 'xsmall', 'small', 'medium', 'large', 'xlarge']),
    flip: PropTypes.oneOf(['default', 'horizontal', 'vertical', 'both'])
};
/**
 * props 기본값 지정
 */
const defaultProps = {
    size: 'default' as IconSize,
    themeColor: 'inherit' as IconThemeColor,
    flip: 'default' as IconFlip,
    icon: '',
    viewBox: '0 0 24 24'
};

SvgIcon.displayName = 'SvgIcon';