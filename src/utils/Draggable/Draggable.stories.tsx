import React from 'react';
import {Draggable} from './Draggable';

/**
 * 사이드바 메뉴
 */
export default {
  component: Draggable,
  title: 'DraggableJS',
};

export const draggableComponent = () => {
  return (
    <Draggable
      onPress={(args) => {
        const { event, element } = args;
        console.log(`event: ${event}, element: ${element}`);
      }}
      onDrag={(args) => {
        const { event, element } = args;
        console.log(`event: ${event}, element: ${element}`);
      }}
      onRelease={(event) => {
        console.log(`event: ${event}`);
      }}
    >
      <div
        style={{
          border: '1px solid black',
          padding: '30px',
          textAlign: 'center',
        }}
      >
        hello
      </div>
    </Draggable>
  );
};
