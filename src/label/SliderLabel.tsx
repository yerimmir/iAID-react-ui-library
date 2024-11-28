import React from "react";
import classNames from "classnames";

interface SliderLabelProps {
  /**
   * class 선택자
   */
  className?: string;
  /**
   * <li>의 title 속성 값
   */
  title?: string;
  /**
   * 기준점에서 label이 표시되어야하는 위치(percentage)
   */
  position: number;
  /**
   * 수평, 수직 여부 - true는 수직
   */
  vertical?: boolean;
  /**
   * 클릭 이벤트 리스너
   */
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  /**
   * SkiderLabel 컴포넌트 내부 요소
   */
  children?: React.ReactNode;
}

/**
 * @hidden
 */
export function useDir(
  elementRef: React.RefObject<HTMLElement | null>,
  initialDir?: string,
  args?: any
): string | undefined {
  const [dir, setDir] = React.useState(initialDir);
  React.useEffect(() => {
    if (!dir && window && elementRef.current) {
      // Note: getComputedStyle forces reflow
      const rtlCandidate = window.getComputedStyle(
        elementRef.current
      )!.direction;

      if (rtlCandidate) {
        setDir(rtlCandidate);
      }
    }
  }, args);
  return dir;
}

export const SliderLabel = (props: SliderLabelProps) => {
  /**
   * props 받아오기
   */
  const {
    className,
    title,
    position,
    vertical = false,
    onClick,
    children,
  } = props;

  const SliderLabelRef = React.useRef<HTMLLIElement>(null);
  const dir = useDir(SliderLabelRef);
  
  const style: React.CSSProperties = vertical
    ? {bottom: `${position - 0.3}%`, height: '1px', width: '100%'}
    : {[dir === 'rtl' ? 'right' : 'left']: position !== 100 ? `${position}%` : `${position - 0.3}%`, width: '1px'}

  return (
    <li
      className={classNames(
        "k-tick",
        { "k-tick-vertical": vertical, "k-tick-horizontal": !vertical }[
          "k-tick-horizontal"
        ],
        className
      )}
      title={title}
      role="presentation"
      ref={SliderLabelRef}
      style={{
        zIndex: 0,
        position: 'absolute',
        ...style
      }}
    >
      <div className={classNames("k-graduation", {"k-left-graduation": vertical, "k-top-graduation": !vertical})} ></div>
      <div className={classNames("k-graduation", {"k-right-graduation": vertical, "k-bottom-graduation": !vertical})}></div>
      <span
        className="k-label"
        onClick={onClick}
      >
        {children}
      </span>
    </li>
  );
};