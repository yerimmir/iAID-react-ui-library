import React, { FC, useState, useEffect, useCallback, ChangeEvent, CSSProperties } from 'react';
import './GenderSelector.css';
import { SvgIcon } from './svg-icon/svg-icons/svgIcon';
import { Male as MaleIcon } from './svg-icon/react-svgIcons/icons/male';
import { Female as FemaleIcon } from './svg-icon/react-svgIcons/icons/female';
import cx from 'classnames'

/**
 *  타입 설정을 위한 타입 선언
 */
type FemaleType = 'female'
type MaleType = 'male'
/**
 * Gender 타입 오타 방지를 위한 타입 설정
 */
 type Gender = MaleType | FemaleType

/**
 * 오타 방지를 위한 Female값 상수
 */
const Female: Gender = "female"
/**
 * 오타 방지를 위한 Male값 상수
 */
const Male: Gender = "male"

/*
* 라디오 버튼이 체크되지 않았을 때 색상
*/
const inactiveColor: string = '#4b505b'
/**
 * 라디오 버튼이 체크됐을 때의 기본 색상
 */
const activeColor: string = '#06abd8'

/**
 * 타입 설정을 위한 인터페이스
 */
export interface GenderSelectorProps {
    /**
     * 식별자
     */
    id?: string
    /**
     * element의 역할
     */
    role?: string
    /**
     * classname 지정
     */
    className:string
    /**
     * 시각적으로 확인(ex. 스크린 리더) 하기 위한 라벨 표시
     */
    aria_label?:string
    /**
     * radio 버튼 활성화 여부
     */
    disabled?: boolean
    /**
     * gender의 기본 값
     */
    defaultGender?: Gender
    /*
     * 외부에서 gender value를 지정해서 적용하고 싶을 때 사용
     */
    gender?: Gender
    /**
     * 현재 check된 값을 다른 곳에서도 확인할 수 있도록 부모 Component인 GenderSelector.stories에 props로 전달
     */
    onChange?: (gender:Gender) => void
    /**
     * svgicon의 크기 설정
     */
    width?: string
    /**
     * svgicon의 높이 설정
     */
    height?: string
    /**
     * 남성이 선택됐을 때의 색 지정
     */
    activeMaleColor?: string
    /**
     * 여성이 선택됐을 때의 색 지정
     */
    activeFemaleColor?: string
    /**
     * 남성 스타일 별도 지정
     */
    maleStyle?: CSSProperties
    /**
     * 여성 스타일 별도 지정
     */
    femaleStyle?: CSSProperties
}

/**
 * 성별을 선택하는 컴포넌트 UI
* @example
 * ```jsx
 * const App = () => {
 *   return (
 *       <GenderSelector defaultGender={'male'} />
 *   );
 * };
 *    ReactDOM.render(<App />, document.querySelector('my-app'));
 * ```
 */
export const GenderSelector:FC<GenderSelectorProps> = (props: GenderSelectorProps) => {
    /**
     * props 값 받아와서 변수에 담기
     */
    const  { id, className,
        role, aria_label,
        disabled=false, defaultGender=Male, gender,
        width="150px", height="150px", activeMaleColor=activeColor, activeFemaleColor=activeColor,
        onChange, maleStyle, femaleStyle }  = props;

    /*
     * 현재 선택된 Gender값(상태) 확인
     */
    const [stateValue, setStateValue] = useState(defaultGender);

    /*
     * 외부에서 받아온 값으로 gender값 설정 + 화면에 렌더링
     */
    useEffect(() => {
        gender == undefined ? stateValue : setStateValue(gender)},[gender]
    );

    /**
     * 클릭이벤트로 값이 변경됐을 때 값 변경을 위해 사용할 함수
     * @param e
     */
    const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement> | undefined) => {
        const changedValue = e.target.value as Gender;
        setStateValue(changedValue);
        onChange && onChange(changedValue);
    },[gender]);

    return (
        <div
            id={id}
            className={cx('k-gender-selector', className)}
            role={role}
            aria-label={aria_label}
        >
            <label>
                <input
                    type="radio"
                    name="gender"
                    checked={stateValue === Male}
                    disabled={disabled}
                    value={Male}
                    onChange={onChangeValue}
                />
                <SvgIcon className={`k-gender-selector__male-icon icon ${Male}`}
                    fill={stateValue == Male ? activeMaleColor : inactiveColor}
                    fillRule="evenodd"
                    icon={MaleIcon}
                    width={width}
                    height={height} 
                    style={maleStyle}/>
            </label>

            <label>
                <input
                    type="radio"
                    name="gender"
                    checked={stateValue === Female}
                    disabled={disabled}
                    value={Female}
                    onChange={onChangeValue}
                />

                <SvgIcon className={`k-gender-selector__female-icon icon ${Female}`}
                    fill={stateValue == Female ? activeFemaleColor : inactiveColor}
                    fillRule="evenodd"
                    icon={FemaleIcon}
                    width={width}
                    height={height}
                    style={femaleStyle} />
            </label>
        </div>
    )
}