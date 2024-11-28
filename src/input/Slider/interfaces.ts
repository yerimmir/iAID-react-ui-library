export type Direction = 'ltr' | 'rtl';

type EventInterfaceType = {
    [propName: string]: 0 | ((event: { [propName: string]: any }) => any),
};

const EventInterface = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (event) {
        return event.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
};

const UIEventInterface = {
    ...EventInterface,
    view: 0,
    detail: 0,
};

/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */
const modifierKeyToProp = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
};

// Older browsers (Safari <= 10, iOS Safari <= 10.2) do not support
// getModifierState. If getModifierState is not supported, we map it to a set of
// modifier keys exposed by the event. In this case, Lock-keys are not supported.
function modifierStateGetter(keyArg) {
    const syntheticEvent = this;
    const nativeEvent = syntheticEvent.nativeEvent;
    if (nativeEvent.getModifierState) {
        return nativeEvent.getModifierState(keyArg);
    }
    const keyProp = modifierKeyToProp[keyArg];
    return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
    return modifierStateGetter;
};

let lastMovementX;
let lastMovementY;
let lastMouseEvent;

function updateMouseMovementPolyfillState(event) {
    if (event !== lastMouseEvent) {
      if (lastMouseEvent && event.type === 'mousemove') {
        lastMovementX = event.screenX - lastMouseEvent.screenX;
        lastMovementY = event.screenY - lastMouseEvent.screenY;
      } else {
        lastMovementX = 0;
        lastMovementY = 0;
      }
      lastMouseEvent = event;
    }
  }

const MouseEventInterface = {
    ...UIEventInterface,
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: getEventModifierState,
    button: 0,
    buttons: 0,
    relatedTarget: function (event) {
        if (event.relatedTarget === undefined)
            return event.fromElement === event.srcElement
                ? event.toElement
                : event.fromElement;

        return event.relatedTarget;
    },
    movementX: function (event) {
        if ('movementX' in event) {
            return event.movementX;
        }
        updateMouseMovementPolyfillState(event);
        return lastMovementX;
    },
    movementY: function (event) {
        if ('movementY' in event) {
            return event.movementY;
        }
        // Don't need to call updateMouseMovementPolyfillState() here
        // because it's guaranteed to have already run when movementX
        // was copied.
        return lastMovementY;
    },
};

export function createSyntheticEvent(Interface: EventInterfaceType) {
    function SyntheticBaseEvent(
        reactName: string | null,
        targetInst: any,
        reactEventType: string,
        nativeEvent: { [propName: string]: any },
        nativeEventTarget: null | EventTarget,
    ) {
        this._reactName = reactName;
        this._targetInst = targetInst;
        this.type = reactEventType;
        this.nativeEvent = nativeEvent;
        this.target = nativeEventTarget
        this.currentTarget = null;

        let i = 0;
            for (const propName in MouseEventInterface) {
                // for ...in : 상속된 열거 가능 속성 + 객체에서 문자열로 키가 지정된 모든 열거 가능한 속성에 대해 반복
                // if (!InterfaceEvent.hasOwnProperty(propName)) {
                //     continue;
                // }
                const normalize = nativeEvent[propName];
                if (normalize) {
                    this[propName] = normalize;
                } else {
                    this[propName] = nativeEvent[propName];
                }
            }
            
        const defaultPrevented =
            nativeEvent.defaultPrevented != null
                ? nativeEvent.defaultPrevented
                : nativeEvent.returnValue === false;
        if (defaultPrevented) {
            this.isDefaultPrevented = true;
        } else {
            this.isDefaultPrevented = false;
        }
        this.isPropagationStopped = false;
        return this;
    }

    Object.assign(SyntheticBaseEvent.prototype, {
        preventDefault: function () {
            this.defaultPrevented = true;
            const event = this.nativeEvent;
            if (!event) {
                return;
            }

            if (event.preventDefault) {
                event.preventDefault();
                // $FlowFixMe - flow is not aware of `unknown` in IE
            } else if (typeof event.returnValue !== 'undefined') {
                event.returnValue = false;
            }
            this.isDefaultPrevented = true;
        },

        stopPropagation: function () {
            const event = this.nativeEvent;
            if (!event) {
                return;
            }

            if (event.stopPropagation) {
                event.stopPropagation();
            } else if (typeof event.cancelBubble !== 'undefined') {
                event.cancelBubble = true;
            }

            this.isPropagationStopped = true;
        },

        persist: function () {
            // Modern event system doesn't use pooling.
        },

        isPersistent: true,
    });
    return SyntheticBaseEvent;
};