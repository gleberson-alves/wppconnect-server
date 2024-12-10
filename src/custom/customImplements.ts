import { Whatsapp } from "@wppconnect-team/wppconnect";
import { isArray } from "lodash";

Whatsapp.prototype.customEventDispose = function (event: string) {
  if ((this as any).listenerEmitter._events[event]) {
    if (isArray((this as any).listenerEmitter._events[event])) {
      for (const listener of (this as any).listenerEmitter._events[event]) {
        (this as any).listenerEmitter.off(event, listener)
        return
      }
    }
    (this as any).listenerEmitter.off(event, (this as any).listenerEmitter._events[event])
  }
};

const originalRegisterEvent = (Whatsapp as any).prototype.registerEvent;
(Whatsapp as any).prototype.registerEvent = function (event, listener) {
  if ((this as any).listenerEmitter._events[event] != null)
    return {
      dispose: function () {
        (this as any).listenerEmitter.off(event, listener);
      },
    };

  return originalRegisterEvent.call(this, event, listener)
}

Whatsapp.prototype