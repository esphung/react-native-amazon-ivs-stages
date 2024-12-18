"use strict";

import { NativeEventEmitter, NativeModules } from 'react-native';
const {
  RNEventEmitter
} = NativeModules;
const eventEmitter = new NativeEventEmitter(RNEventEmitter);

// Returns a subscription
function startListening(eventName, callback) {
  const subscription = eventEmitter.addListener(eventName, res => {
    callback(res);
  });
  return () => {
    subscription.remove();
  };
}
export default {
  startListening
};
//# sourceMappingURL=RNEventEmitter.js.map