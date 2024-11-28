import React from 'react';
import { GridLayout } from './GridLayout';
import { GridLayoutItem } from './GridLayoutItem';
import './GridLayout.css';

/**
 * 메뉴 탭에 나타낼 제목과 사용할 component 지정
 */
export default {
  component: GridLayout,
  title: 'GridLayout',
};

/**
 * 렌더링에 필요한 함수
 * @param args
 * @returns
 */
const Template = (args) => {
  const { align, ...rest } = args;
  const ref = React.useRef();
  const itemRef = React.useRef();
  return (
    <GridLayout ref={ref} {...args}>
      <GridLayoutItem className="box rect" col={1} row={1} colSpan={2}>
        Box0
      </GridLayoutItem>
      <GridLayoutItem className="box" col={3} row={1}>
        Box1
      </GridLayoutItem>
      <GridLayoutItem className="box" col={1} row={2}>
        Box2
      </GridLayoutItem>
      <GridLayoutItem
        className="box big"
        col={2}
        row={2}
        colSpan={2}
        rowSpan={2}
      >
        Box3
      </GridLayoutItem>
      <GridLayoutItem className="box rect" col={1} row={3} rowSpan={2}>
        Box4
      </GridLayoutItem>
      <GridLayoutItem className="box" col={2} row={4}>
        Box5
      </GridLayoutItem>
      <GridLayoutItem className="box" col={3} row={4}>
        Box6
      </GridLayoutItem>
      <GridLayoutItem className="box" col={1} row={5}>
        Box7
      </GridLayoutItem>
      <GridLayoutItem className="box" col={2} row={5}>
        Box8
      </GridLayoutItem>
      <GridLayoutItem className="box" col={3} row={5}>
        Box9
      </GridLayoutItem>
    </GridLayout>
  );
};

/**
 * Grid 화면 렌더링
 */
export const Grid = Template.bind({});
/**
 * 프로퍼티 값 설정
 */
Grid.args = {
  // id: 'id',
  // children: '',
  // className: 'classNameName',
  style: {
    display: 'grid',
    border: '1px solid black',
    padding: '10px',
  },
  rows: [
    {
      height: '1fr',
    },
    {
      height: '1fr',
    },
    {
      height: '1fr',
    },
    {
      height: '1fr',
    },
    {
      height: '1fr',
    },
  ],
  cols: [
    {
      width: '1fr',
    },
    {
      width: '1fr',
    },
    {
      width: '1fr',
    },
  ],
  gap: {
    rows: 5,
    cols: 5,
  },
  align: {
    vertical: 'stretch',
    horizontal: 'stretch',
  },
};
