"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _RNEventEmitter = _interopRequireDefault(require("../RNEventEmitter.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var EventTag = /*#__PURE__*/function (EventTag) {
  EventTag["onPress"] = "onPress";
  EventTag["broadcastSession"] = "broadcastSession";
  EventTag["getAllStages"] = "getAllStages";
  return EventTag;
}(EventTag || {});
const subscriptionFactory = (name, callback) => {
  return _RNEventEmitter.default.startListening(name, res => {
    callback?.({
      ...res.data,
      name
    });
  });
};
const useRNEventSubscriptions = onSubscribedEventCallback => {
  const startListening = _react.default.useCallback(() => {
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
var _default = exports.default = useRNEventSubscriptions;
//# sourceMappingURL=useRNEventSubscriptions.js.map