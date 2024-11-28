import React, {
  CSSProperties,
  FC,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { guid } from '../../utils/guid';
import { GridLayoutHandle } from './gridLayoutHandle';

export interface GridLayoutItemProps {
  /**
   * DOM Element id(식별자)
   */
  id?: string;
  /**
   * GridLayout을 구성하는 div 컴포넌트의 자식 컴포넌트로 구성
   */
  children?: ReactNode;
  /**
   * inline CSS Style 지정
   */
  style?: CSSProperties;
  /**
   * classname 지정
   */
  className?: string;
  /**
   * 열 위치 번호
   */
  col?: number;
  /**
   * 행 위치 번호
   */
  row?: number;
  /**
   * 행 방향으로 cell의 넓이(행 개수)
   */
  rowSpan?: number;
  /**
   * 열 방향으로 cell 높이(열 개수)
   */
  colSpan?: number;
}

/**
 * GridLayout 안에 들어갈 컴포넌트 생성
 */
export const GridLayoutItem: FC<GridLayoutItemProps> = React.forwardRef<
  GridLayoutHandle | null,
  GridLayoutItemProps
>((props, ref) => {
  // props 값 변수에 담기
  const {
    id,
    children,
    style,
    className,
    col = 'auto',
    row = 'auto',
    rowSpan = 'auto',
    colSpan = 'auto',
  } = props;

  // 부모 컴포넌트에서 사용할 ref 만들기
  const elementRef = useRef<HTMLDivElement | null>(null);

  // 부모 컴포넌트로 넘겨줄 인자 설정 함수
  const getImperativeHandle = React.useCallback(
    (): GridLayoutHandle => ({
      element: elementRef.current,
    }),
    []
  );

  // 부모 컴포넌트가 ref값 사용자화 (첫 번째 인자: 부모로부터 받아오는 값, 두 번째 인자: 부모컴포넌트로 넘겨줄 값)
  useImperativeHandle(ref, getImperativeHandle);

  // uuid 만드는 함수
  const uuidValue: string = useMemo(() => guid(), []);

  // rowSpan, colspan 값 재정의
  const rowSpanValue = rowSpan != 'auto' ? 'span ' + rowSpan : 'auto';
  const colSpanValue = colSpan != 'auto' ? 'span ' + colSpan : 'auto';

  // gridArea의 value 값 변수
  const gridArea = `${row} / ${col} / ${rowSpanValue} / ${colSpanValue}`;

  // style value값 정의
  const styles = {
    ...style,
    gridArea: gridArea,
  };

  return (
    <div
      ref={elementRef}
      id={id || uuidValue}
      className={className}
      style={styles}
    >
      {children}
    </div>
  );
});
