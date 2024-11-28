import classNames from "classnames";
import React from "react";

export interface SliderMarkProps {
  /**
   * 식별자
   */
  className?: string;
  /**
   * Mark 위치에 해당하는 값
   */
  value: number;
  /**
   * Mark가 표시되어야하는 위치(percentage)
   */
  position?: number;
  /**
   * 수평, 수직 여부 - true는 수직
   */
  vertical?: boolean;
  /**
   * SkiderLabel 컴포넌트 내부 요소
   */
  children?: React.ReactNode;
}

/**
 * @hidden
 */
function useDir(
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

export const SliderMark = (props: SliderMarkProps) => {
  const { className, value, position, vertical, children } =
    props;

  const SliderMarkRef = React.useRef(null);
  const dir = useDir(SliderMarkRef);

  return (
    <div
      className={classNames("k-marker", className)}
      ref={SliderMarkRef}
      style={
        vertical
          ? { 
              bottom: "calc(" + position + "% + 10px)",
              zIndex: 1,
              left: "-600%",
            }
          : {
              [dir === "rtl" ? "right" : "left"]:
                "calc(" + position + "% - 18px)",
              zIndex: 1,
              top: "-600%",
            }
      }
      onDrag={(e) => {e.stopPropagation()}}
    >
      {typeof(children) === 'number' ? Math.round(value * 100) / 100 : children}
    </div>
  );
};