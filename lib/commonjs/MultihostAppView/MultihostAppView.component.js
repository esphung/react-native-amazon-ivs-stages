"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultihostAppViewProxy = void 0;
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const LINKING_ERROR = `The package 'react-native-amazon-ivs-multihost' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = 'MultihostAppView';
const NativeMultihostAppViewProxy = _reactNative.UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
const MultihostAppViewProxy = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeMultihostAppViewProxy, {
    ...props
  });
};
exports.MultihostAppViewProxy = MultihostAppViewProxy;
MultihostAppViewProxy.displayName = 'MultihostAppViewProxy';
//# sourceMappingURL=MultihostAppView.component.js.map