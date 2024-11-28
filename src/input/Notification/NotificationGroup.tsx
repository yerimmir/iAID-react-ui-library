import React, { CSSProperties } from 'react';
import '../../theme/default/scss/Notification/NotificationGroup.scss'

export interface NotificationGroupInterface {
    /**
     * className 지정
     */
    className?: string;
    /**
     * inline style(정렬 지정에 이용) 지정
     */
    style?: CSSProperties;
    /**
     * Notification component
     */
    children?: JSX.Element;
}

/**
 * 
 * @param props 
 * @returns 
 */
const NotificationGroup = (props: NotificationGroupInterface) => {
    const {className, style={}, children} = props;

    const groupStyle: CSSProperties = {
      justifyContent: 'center', width: '95%', border: '1px solid gray', borderRadius: '5px', ... style}

    return (
        <div className={className ? `k-notification-group ${className}` : `k-notification-group`} style={groupStyle}>{children}</div>
    )
}

export default NotificationGroup;