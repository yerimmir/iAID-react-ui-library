import React, {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { guid } from '../../utils/guid';
import { GridLayoutHandle } from './gridLayoutHandle';

/**
 * Grid items 수직 정렬을 위한 type 설정
 */
type verticalType = 'top' | 'middle' | 'bottom' | 'stretch';
/**
 * Grid items 수평 정렬을 위한 type 설정
 */
type horizontalType = 'start' | 'center' | 'end' | 'stretch';

/**
 * Grid Layout 수평 수직 정렬 요소 타입
 */
export interface GridLayoutAlign {
  vertical?: verticalType;
  horizontal?: horizontalType;
}

/**
 * 그리드의 열 너비 속성 설정할 때의 타입
 */
export interface GridLayoutColumnProps {
  width?: number | string;
}

/**
 * 그리드의 행 너비 속성 설정할 때의 타입
 */
export interface GridLayoutRowProps {
  height?: number | string;
}

export interface GridLayoutProps {
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
   * 행 높이 속성 정보 집합
   */
  rows?: GridLayoutRowProps[];
  /**
   * 열 높이 속성 정보 집합
   */
  cols?: GridLayoutColumnProps[];
  /**
   * gap : 행/열 사이 간격 설정
   */
  gap?: {
    /**
     * 행 사이 간격
     */
    rows: number | string;
    /**
     * 열 사이 간격
     */
    columns: number | string;
  };
  /**
   * 수평 수직 정렬
   */
  align?: GridLayoutAlign;
}

/**
 * GridLayout을 만들어내는 컴포넌트 생성
 */
export const GridLayout: FC<GridLayoutProps> = React.forwardRef<
  GridLayoutHandle | null,
  GridLayoutProps
>((props, ref) => {
  // props 값 변수에 담기
  const {
    id,
    children,
    style,
    className,
    rows = [],
    cols = [],
    gap = { rows: 'auto', columns: 'auto' },
    align = { vertical: 'stretch', horizontal: 'stretch' },
  } = props;


  // 부모 컴포넌트에서 사용할 ref 만들기
  const elementRef = useRef<HTMLDivElement | null>(null);

  // 부모 컴포넌트로 넘겨줄 인자 설정하는 함수
  const getImperativeHandle = useCallback(
    (): GridLayoutHandle => ({
      element: elementRef.current,
    }),
    []
  );

  // 부모 컴포넌트가 ref값 사용자화 (첫 번째 인자: 부모로부터 받아오는 값, 두 번째 인자: 부모컴포넌트로 넘겨줄 값)
  useImperativeHandle(ref, getImperativeHandle);

  // uuid 만드는 함수
  const uuidValue: string = useMemo(() => guid(), []);

  // rows/cols 배열에서 height attribute 배열 요소 전체를 하나의 string으로 + px 붙이기
  const rowList = (rows || [])
    .map((row) =>
      typeof row.height == 'number' ? row.height + 'px' : row.height
    )
    .join(' ');
  const colList = (cols || [])
    .map((col) => (typeof col.width == 'number' ? col.width + 'px' : col.width))
    .join(' ');

  // props gap의 rows가 숫자면 px가 붙은 문자열로 변환
  const gapRow: string =
    typeof gap.rows == 'number' ? gap.rows + 'px' : gap.rows;

  // props gap의 columns가 숫자면 px가 붙은 문자열로 변환
  const gapColumns: string =
    typeof gap.columns == 'number' ? gap.columns + 'px' : gap.columns;

  // vertical 값을 style 적용에 맞는 값으로 변환
  const alignVertical: string =
    align.vertical == 'top'
      ? 'start'
      : align.vertical == 'middle'
      ? 'center'
      : align.vertical == 'bottom'
      ? 'end'
      : align.vertical == 'stretch' && 'stretch';

  // style value 값 정의
  const styles = {
    ...style,
    gridTemplateRows: rowList,
    gridTemplateColumns: colList,
    gap: `${gapRow} ${gapColumns}`,
    // alignItems: align.vertical,
    // justifyItems: align.horizontal,
    placeItems: `${alignVertical} ${align.horizontal}`,
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
