import classNames from "classnames";
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Draggable } from "../../utils/Draggable";
import { BaseEvent } from "../../utils/event/BaseEvent";
import { Keys } from "../../utils/keys";
import { SliderMark } from "../SliderMark/SliderMark";
import { Direction, createSyntheticEvent } from "./interfaces";
import "../../theme/default/scss/Slider/_index.scss";

export interface SliderProps {
  /**
   * 식별자
   */
  id?: string;
  /**
   * class명
   */
  className?: string;
  /**
   * Slider에 표시된 현재 값
   */
  value?: number;
  /**
   * Slider에 설정된 기본 값
   */
  defaultValue?: number;
  /**
   * Slider의 최소값
   */
  min: number;
  /**
   * Slider의 최대값
   */
  max: number;
  /**
   * Slider에서 값을 클릭했을 때 선택된 값
   */
  step?: number;
  /**
   * Slider를 누른채로 변경될 때 값을 받아오는 함수
   */
  // onChange?: (event: Event) => number;
  onChange?: ((event) => void) | undefined;
  /**
   * Slider의 수평, 수직 여부
   */
  vertical?: boolean;
  /**
   * Slider의 interaction의 반응 여부 설정
   */
  disabled?: boolean;
  /**
   * min, max 값 표시 노출 여부
   */
  showValue?: boolean;
  /**
   * SliderMark 노출 여부
   */
  showMark?: boolean;
  /**
   * draghandle 노출 여부
   */
  showHandle?: boolean;
  /**
   * value 값 변경 버튼 노출 여부
   */
  click?: boolean;
  /**
   * Slider 컴포넌트 내부 요소
   */
  children?: ReactNode;
  /**
   * inline css style 지정
   */
  style?: CSSProperties;
  /**
   * 요소 레이블 식별
   */
  ariaDescribedBy?: string;
  /**
   * 요소를 설명하는 요소 식별
   */
  ariaLabelledBy?: string;
  /**
   * 드래그 이동방향 확인
   */
  dir?: Direction;
  /**
   * 주요 요소 색상 지정
   */
  componentStyle?: {
    dragHandle?: CSSProperties;
    sliderTrack?: CSSProperties;
    sliderTrackSelection?: CSSProperties;
    sliderMark?: CSSProperties;
    value?: CSSProperties;
  };
}

type minMaxType = {
  minRef: number;
  maxRef: number;
  widthRef: number;
};

/**
 * 전달하는 event type 정형화
 *
 * @param eventHandler
 * @param dispatchedEvent
 * @param target
 * @param eventData
 */
export function dispatchEvent<
  // interface BaseEvent, FCHandle을 extends 해옴
  E extends BaseEvent<React.Component | FCHandle>,
  FCHandle = Object
>(
  eventHandler: ((event: E) => void) | undefined,
  dispatchedEvent: React.SyntheticEvent<any>,
  target: E["target"],
  eventData: Exclude<
    // Exclude<T, U> : U에 할당할 수 있는 타입은 T에서 제외
    keyof E, // keyof : 객체 타입에서 객체의 키 값들로 유니언 생성
    keyof BaseEvent<React.Component | FCHandle>
  > extends never // never : 일반적으로 함수의 리턴 타입, 항상 오류를 출력하거나 리턴 값을 절대로 내보내지 않음
    ? undefined
    : Pick<E, Exclude<keyof E, keyof BaseEvent<React.Component | FCHandle>>> // Pick<T, K> : T타입으로부터 K 프로퍼티만 추출
) {
  if (eventHandler) {
    /**
     * @TODO DraggableJS에서 전달하는 마우스 이벤트를 다시 확인 후, 아래 코드에 대해 재 점검 필요
     */
    //@ts-ignore
    const nativeEvent = dispatchedEvent?.nativeEvent;
    const eventBaseData = {
      syntheticEvent: dispatchedEvent,
      //@ts-ignore
      nativeEvent: nativeEvent,
      target,
    };

    eventHandler.call(undefined, Object.assign(eventBaseData, eventData)); // call(): 첫 번째 인자로 객체를 받으면, 그 객체를 this를 사용할 객체로 동작하게 해줌, 두 번째 인자는 함수의 인자로 보낼 요소
    // assign(target, ...sources) : 출처 객체들의 모든 열거 가능한 자체 속성을 target에 복사해 대상 객체에 붙여 넣고 대상 객체를 반환
  }
}

/**
 * @example
 * ```` jsx
 * const App = () => {
 *  return (
 *    <Slider min={0} max={100} />
 *  )
 * };
 *
 * ReactDOM.render(<App />, document.querySelector('App'));
 * ````
 *
 * @param props
 * @returns
 */
export const Slider: FC<SliderProps> = (props: SliderProps) => {
  /**
   *  props 값 변수에 담기
   */
  const {
    id,
    className,
    defaultValue,
    min,
    max,
    step = 1,
    onChange,
    vertical = false,
    disabled = false,
    showValue = true,
    showMark = true,
    showHandle = true,
    click = false,
    ariaDescribedBy,
    ariaLabelledBy,
    children,
    style,
    dir,
    componentStyle = {dragHandle: {display: "inherit"}},
  } = props;

  // State 정의
  // drag 진행 방향
  const [direction, setDirection] = useState(dir); // "rtl" : right to left
  // 현재 value 값 설정
  const [value, setValue] = useState(
    defaultValue === undefined ? min : defaultValue
  );
  // 포커스 여부 관리
  const [focused, setFocused] = useState(false);
  const percentValue = ((value - min) / (max - min)) * 100;

  // Ref. 변수 정의
  // const handle = useRef<HTMLDivElement>(null);
  const _sliderSelection = useRef<HTMLDivElement>(null);
  const _wrap = useRef<HTMLDivElement>(null);
  const _container = useRef<HTMLDivElement>(null);
  const _sliderTrack = useRef<HTMLDivElement>(null);

  const minMaxRefs = useRef<minMaxType>({
    minRef: min,
    maxRef: max,
    widthRef: Number(String(props.style.width).slice(0, -2)),
  });

  /**
   * 컴포넌트 마운트 시점 초기화
   */
  // 사용자가 직접 direction 정보를 입력하지 않았다면, 컴포넌트 마운트 시점에 window 기본 스타일에서 direction 정보를 획득하여 반영
  useEffect(() => {
    // props로 dir값이 없거나, wind
    if (!props.dir && window && _container) {
      const direction = window.getComputedStyle(_container.current)!
        .direction as Direction; // window.getComputedStyle(속성값을 얻으려는 element) : 인자로 전달받은 모든 요소의 모든 CSS 속성값을 받은 객체를 회신
      // ! : 앞의 값이 무조건 할당되어 있다고 컴파일러에게 전달해 null 제약 조건 완화
      if (direction) {
        setDirection(direction);
      }
    }
  }, [dir]);

  /**
   * State 값 범위 제한
   */
  // value 값의 범위를 min-max 범위 내 설정
  useEffect(() => {
    const { min, max } = props;
    // props에 value값 존재 시 newValue 값으로 설정, 없으면 state의 value 값으로
    let newValue = props.value !== undefined ? props.value : value;
    // newValue가 undefined면 null 반환 아니면 뒤의 값 반환
    newValue =
      newValue === undefined ? null : Math.min(Math.max(newValue, min), max);
    setValue(newValue);
  }, [value, min, max]);

  /**
   * 컴포넌트 동작 핸들러 정의
   */

  /**
   * Focus 정의 핸들러
   */
  const onFocus = useCallback(() => {
    setFocused(true);
  }, [setFocused]);

  /**
   * Blur 정의 핸들러
   */
  const onBlur = useCallback(() => {
    setFocused(false);
  }, [setFocused]);

  /**
   * key 입력에 따른 Slider 동작 핸들러
   */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let newValue: number | undefined = undefined;
      if (e.keyCode === Keys.left || e.keyCode === Keys.down) {
        newValue = value - step;
      } else if (e.keyCode === Keys.right || e.keyCode === Keys.up) {
        newValue = value + step;
      } else if (e.keyCode === Keys.home) {
        newValue = min;
      } else if (e.keyCode === Keys.end) {
        newValue = max;
      } else {
        newValue = value;
      }

      change(e, newValue);
    },
    [value, step]
  );

  /**
   * Drag 핸들러 정의
   */
  const drag = useCallback(
    (e) => {
      // 이벤트가 일어나는 element의 상대적 위치 정보
      const computed = e.target.getBoundingClientRect();
      // 이동 방향에 따른 distance 값 설정
      const distance = vertical
        ? computed.bottom - e.clientY
        : dir === "rtl"
        ? computed.right - e.clientX
        : e.clientX - computed.left;
      // 수직 수평 여부에 따른 element의 size 정보
      const size = vertical ? computed.height : computed.width;
      //  이동 거리 / element 전체 크기
      const percentage = distance / size;
      change(e, min + percentage * (max - min));
    },
    [vertical]
  );

  /**
   * Slider 수치 변경에 따른 onChange 함수 호출
   * 이 때, dispatchEvent를 사용해 onChange에 전달되는 값을 정의
   */
  const change = useCallback(
    (e: any, value: number) => {
      value = Math.min(Math.max(value, min), max);
      // Math.min : 주어진 숫자들 중 가장 작은 값 반환
      setValue(value);
      dispatchEvent(onChange, e, _container.current, { value: value });
    },
    [setValue]
  );

  /**
   * 드래그 이벤트가 시작될 때 사용되는 함수
   */
  const dragStart = useCallback((e) => {
    let reactName = "onDrag";
    const syntheticEvent = createSyntheticEvent(e).call(
      {},
      reactName,
      null,
      e.event.type,
      e.event.originalEvent,
      e.element
    );
    const { event } = e;
    if (event.isTouch) {
      event.originalEvent.preventDefault();
    }
    drag(syntheticEvent);
  }, []);

  /**
   * 드래그 이벤트가 일어나는 중에 사용되는 함수
   */
  const dragOver = useCallback((e) => {
    let reactName = "onDrag";
    const syntheticEvent = createSyntheticEvent(e).call(
      {},
      reactName,
      null,
      e.event.type,
      e.event.originalEvent,
      e.element
    );
    const { event } = e;
    event.originalEvent.preventDefault();
    drag(syntheticEvent);
  }, []);

  /**
   * 버튼을 이용해 value를 조절할 때 사용하는 함수
   */
  const buttonClick = useCallback(
    (e) => {
      let newValue: number | undefined = undefined;

      if (e.target.value === "-") {
        newValue = value - step;
      } else if (e.target.value === "+") {
        newValue = value + step;
      }
      change(e, newValue);
    },
    [value, step]
  );

  // children이 props로 position을 가졌는지 여부 확인 (SliderLabel인지 확인)
  const validateLabelPosition = (child) => {
    const childRef = useRef(child);
    if (child.props.position === undefined || vertical === undefined) {
      return React.cloneElement(child);
    } else {
      const position = (100 * (child.props.position - min)) / (max - min);
      return React.cloneElement(child, {
        position: position,
        vertical: vertical,
        onClick: clickLabelValue,
      });
    }
  };

  /**
   * Label의 value 값 클릭 시, slider의 값으로 설정되도록 하는 메소드
   * @param e
   */
  const clickLabelValue = (e) => {
    setValue(e.target.innerText);
  };

  // 기본 Style 정의
  const trackStyles: React.CSSProperties = vertical
    ? { marginTop: "0.5rem", marginBottom: "0.5rem" }
    : { marginLeft: "0.5rem", marginRight: "0.5rem" };
  const sliderItemsStyle: React.CSSProperties = vertical
    ? // ? { paddingTop: 0, height: "100%" }
      {}
    : {};

  // 세부 요소 Style 정의 
  const dragHandleStyle = componentStyle.dragHandle ? componentStyle.dragHandle : null;
  const trackSelectionStyle = componentStyle.sliderTrackSelection ? componentStyle.sliderTrackSelection : null;
  const trackStyle = componentStyle.sliderTrack ? componentStyle.sliderTrack : null;
  const markStyle = componentStyle.sliderMark ? componentStyle.sliderMark : null;
  const valueStyle = componentStyle.value ? componentStyle.value : null;

  return (
    <>
      <div
        id={id}
        className={classNames(
          "k-slider k-widget",
          {
            "k-state-focused": focused,
            "k-state-disabled": disabled,
            "k-slider-horizontal": !vertical,
            "k-slider-vertical": vertical,
          },
          className
        )}
        ref={_container}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled ? "true" : undefined}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        role="slider"
        dir={dir}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        tabIndex={-1} // keydown 이벤트 적용을 위해 index 순서 앞으로
      >
        <div
          className="k-slider-wrap"
          ref={_wrap}
          style={{ width: props.style.width, height: props.style.height }}
        >
          {showValue && (
            <div className="k-slider-num k-slider-num-min" style={valueStyle}>
              {" "}
              {direction === "ltr" ? min : max}{" "}
            </div>
          )}
          {click && dir === "rtl" ? (
            <button
              className="k-slider-button k-slider-minus"
              value="+"
              onClick={buttonClick}
            >
              +
            </button>
          ) : (
            click &&
            dir === "ltr" && (
              <button
                className="k-slider-button k-slider-minus"
                value="-"
                onClick={buttonClick}
              >
                -
              </button>
            )
          )}
          <Draggable onPress={(e) => dragStart(e)} onDrag={dragOver}>
            <div
              className="k-slider-track-wrap"
              // onClick={click}
              // onDrag={dragHandler}
              // onDragEnd={dragEndHandler}
              style={{
                // display:"flex",
                flexGrow: 1,
                // position: "relative",
                touchAction: "none",
                ...trackStyles,
                ...trackStyle
              }}
            >
              {showMark && (
                <SliderMark
                  value={value}
                  position={((value - min) / (max - min)) * 100}
                  vertical={vertical}
                  className={classNames({ "k-marker-rtl": dir === "rtl" })}
                >
                  {value}
                </SliderMark>
              )}
              {children && (
                <ul
                  className="k-reset k-slider-items"
                  style={{ margin: 0, ...sliderItemsStyle }}
                >
                  {React.Children.map(children, (child: any) => {
                    return validateLabelPosition(child);
                  })}
                </ul>
              )}
              <div
                className="k-slider-track"
                style={
                  vertical
                    ? { bottom: 0 }
                    : {
                        [dir === "rtl" ? "right" : "left"]: 0,
                      }
                }
                ref={_sliderTrack}
              ></div>
              <div
                className="k-slider-selection"
                ref={_sliderSelection}
                style={
                  vertical
                    ? { height: percentValue + "%", width: 'inherit' }
                    : {
                        width: percentValue + "%",
                        right: dir === "rtl" && 0,
                        height: 'inherit',
                        ...trackSelectionStyle,
                      }
                }
              />
              {showHandle && (
                <a
                  className={classNames("k-dragHandle", {
                    "k-dragHandle-right": direction === "rtl",
                    "k-dragHandle-left": direction === "ltr",
                  })}
                  draggable="true"
                  style={
                    vertical
                      ? { bottom: "calc(" + percentValue + "%)" }
                      : {
                          [dir === "rtl" ? "right" : "left"]:
                            "calc(" + percentValue + "%)",
                          zIndex: 1,
                          ...dragHandleStyle,
                        }
                  }
                />
              )}
            </div>
          </Draggable>
          {click && dir === "rtl" ? (
            <button
              className="k-slider-button k-slider-plus"
              value="-"
              onClick={buttonClick}
            >
              -
            </button>
          ) : (
            click &&
            dir === "ltr" && (
              <button
                className="k-slider-button k-slider-plus"
                value="+"
                onClick={buttonClick}
              >
                +
              </button>
            )
          )}
          {showValue && (
            <div className="k-slider-num k-slider-num-max" style={valueStyle}>
              {" "}
              {direction === "ltr" ? max : min}{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
