"use strict";

import React from 'react';
import RNEventEmitter from "../RNEventEmitter.js";
var EventTag = /*#__PURE__*/function (EventTag) {
  EventTag["onPress"] = "onPress";
  EventTag["broadcastSession"] = "broadcastSession";
  EventTag["getAllStages"] = "getAllStages";
  return EventTag;
}(EventTag || {});
const subscriptionFactory = (name, callback) => {
  return RNEventEmitter.startListening(name, res => {
    callback?.({
      ...res.data,
      name
    });
  });
};
const useRNEventSubscriptions = onSubscribedEventCallback => {
  const startListening = React.useCallback(() => {
    const subs = [];
    subs.push(subscriptionFactory(EventTag.onPress, onSubscribedEventCallback));
    subs.push(subscriptionFactory(EventTag.broadcastSession, onSubscribedEventCallback));
    subs.push(subscriptionFactory(EventTag.getAllStages, onSubscribedEventCallback));
    return () => {
      if (!subs.length) {
        return;
      }
      subs.forEach(unsub => {
        unsub();
      });
      subs.length = 0;
    };
  }, [onSubscribedEventCallback]);
  return {
    startListening
  };
};
export default useRNEventSubscriptions;
//# sourceMappingURL=useRNEventSubscriptions.js.map