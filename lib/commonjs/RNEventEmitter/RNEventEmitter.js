"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const {
  RNEventEmitter
} = _reactNative.NativeModules;
const eventEmitter = new _reactNative.NativeEventEmitter(RNEventEmitter);

// Returns a subscription
function startListening(eventName, callback) {
  const subscription = eventEmitter.addListener(eventName, res => {
    callback(res);
  });
  return () => {
    subscription.remove();
  };
}
var _default = exports.default = {
  startListening
};
//# sourceMappingURL=RNEventEmitter.js.map