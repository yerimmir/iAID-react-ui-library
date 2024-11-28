import React from "react";
import { BaseEvent } from "./BaseEvent";

/**
 * @hidden
 * 발생한 이벤트의 context 구조를 수정하여 Component에 전달달
 *
 * @param eventHandler
 * @param dispatchedEvent
 * @param target
 * @param eventData
 */
export function dispatchEvent<
  E extends BaseEvent<React.Component | FCHandle>,
  FCHandle = object
>(
  eventHandler: ((event: E) => void) | undefined,
  dispatchedEvent: React.SyntheticEvent<any>,
  target: E["target"],
  eventData: any
) {
  if (eventHandler) {
    const eventBaseData = {
      syntheticEvent: dispatchedEvent,
      nativeEvent: dispatchedEvent.nativeEvent,
      target,
    };

    eventHandler.call(undefined, Object.assign(eventBaseData, eventData));
  }
}
