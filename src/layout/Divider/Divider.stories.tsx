import React from "react";
import {Divider} from "./Divider";

/**
 * 사이드바 메뉴 구현
 */
export default {
    /**
     * 화면에 구현할 컴포넌트
     */
    component: Divider,
    /**
     * 사이드바 토글메뉴 이름
     */
    title: "DividerTS",
};

/**
 * storybook 화면에 나타내기
 * @returns
 */
export const horizontal = () => {
   return (
        <Divider horizontal={true} as="span" className="className"></Divider>
   )
}