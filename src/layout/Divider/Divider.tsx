import React, {ElementType, FC} from "react";
// import "./Divider.css";
import cx from "classnames";

/**
 * Divider를 위한 타입 설정
 */
export interface DividerProps {
    /**
     * 스타일링 위한 className 받아오기
     */
    className?: string;
    /**
     * 가로, 세로 결정 기준 값
     */
    horizontal: boolean;
    /**
     * 태그의 타입 결정값 - 값을 받아서 Element화
     */
    as: ElementType;
}

/**
 * Divider 컴포넌트를 반환하는 함수
 * @param props
 * @returns
 */
export const Divider:FC<DividerProps> = (props: DividerProps) => {
    /**
     * props 받아오기
     */
    const {className, horizontal = true, as: Tag = 'div'} = props;

    // Issue: 컴포넌트, property 간 이름 규칙이 상이함으로 인해 rename
    const Component = Tag;

    return (
        /**
         * k-divider: 스타일에 사용되는 클래스네임
         */
        <Component className={cx('k-divider', horizontal ? 'horizontal' : 'vertical', className)}/>
    )
}
