import React from "react";

export interface BaseEvent<T> {
  /**
   * React synthetic event
   * (브라우저마다 상이한 event context를 React 에서 통일)
   */
  syntheticEvent: React.SyntheticEvent<any>;
  /**
   * 브라우터에서 생성한 native dom event
   */
  nativeEvent: any;
  /**
   * event target
   */
  target: T;
}
