import React, {
  forwardRef,
  ReactElement,
  useRef,
} from 'react';
import { FC, useEffect } from 'react';
import { Draggable as DraggableJS } from '@iaid-o/draggablejs';

/**
 * 이벤트 타입 설정
 */
type Event = MouseEvent | PointerEvent | TouchEvent;

/**
 * DraggableComponent Props의 타입 설정
 */
export interface DraggableProps {
  /**
   * press event 처리 함수
   */
  onPress?: (args: { event: Event; element: HTMLElement }) => any;
  /**
   * drag event 처리 함수
   */
  onDrag?: (args: { event: Event; element: HTMLElement }) => any;
  /**
   * release event 처리 함수
   */
  onRelease?: (args: { event: Event }) => any;
  /**
   * Children 컴포넌트의 element를 전달 받는 함수
   */
  childRef?: (arg: HTMLElement) => any;
  /**
   * ReactChildren을 받아오는 변수
   */
  children: ReactElement;
}

/**
 * Draggable 컴포넌트를 반환하는 함수
 * @param props
 * @returns
 * ```jsx
 *  <Draggable
 *    onPress={(args) => {
 *        const { event, element } = args;
 *         console.log(`event: ${event}, element: ${element}`);
*      }}
 *      onDrag={(args) => {
 *        const { event, element } = args;
 *        console.log(`event: ${event}, element: ${element}`);
 *      }}
 *      onRelease={(event) => {
 *        console.log(`event: ${event}`);
 *      }}
 *  >
 *  <div
 *    style={{
 *      border: '1px solid black',
 *      padding: '30px',
 *      textAlign: 'center',
 *    }}
 *  >
 *    hello
 *  </div>
 *</Draggable>
 * ```
 */
export const Draggable: FC<DraggableProps> = (props: DraggableProps) => {
  const { onPress, onDrag, onRelease, childRef, children } = props;

  const element = useRef<HTMLElement | null>(null);

  const draggable = useRef(
    new DraggableJS({
      press: (e) => {
        if (element.current !== null && onPress !== undefined) {
          onPress({ event: e, element: element.current });
        }
      },
      drag: (e) => {
        if (element.current !== null && onDrag !== undefined) {
          onDrag({ event: e, element: element.current });
        }
      },
      release: (e) => {
        if (element.current !== null && onRelease !== undefined) {
          onRelease({ event: e });
        }
      },
    })
  );

  useEffect(() => {
    // udpate 시 제대로 binding 되도록
    if (element.current !== null) {
      draggable.current.bindTo(element.current);
    }
    return () => {
      draggable.current.destroy();
    };
  }, [onPress, onDrag, onRelease]);

  const childRefCallback = (elem: HTMLElement) => {
    element.current = elem;
    if (childRef !== undefined) {
      childRef(element.current);
    }
  };

  return React.cloneElement(React.Children.only(children), {
    ref: childRefCallback,
  });
}