import React from "react";
import {GenderSelector} from './GenderSelector'

/* storybook 메뉴에 렌더링될 요소 지정 */
export default {
    component: GenderSelector,
    title: "GenderSelector",
    /**
     * args의 Type 지정
     */
    argsTypes: {
        id: { type: "string" },
        className: { type: "string" },
        role: { type: " string" },
        aria_label: { type: "string" },
        disabled: { type: "boolean" },
        defaultGender: { type: "Gender" },
        gender: { type: "Gender" },
        onChange: { type: "(gender:Gender) => void" },
        width: "string",
        height: "string",
        activeMaleColor: "string",
        activeFemaleColor: "string",
    }
}

/**
 * 렌더링에 필요한 함수
 * @param args
 * @returns
 */
const Template = (args) => {
    return (
        <GenderSelector width height {...args} />
    )
}

/**
 * Gender라는 화면 렌더링
 */
export const Gender = Template.bind({});
/**
 * 각 프로퍼티에 값 설정
 */
Gender.args = {
    id: "gender-selector",
    className: "gender-selector",
    role: "switch",
    disabled: false,
    gender: "male",
    defaultGender: "female",
    onChange: (value: "Gender")=>{console.log(value)},
    width: "100px",
    height: "100px",
    // activeMaleColor: "black",
    // activeFemaleColor: "red",
}