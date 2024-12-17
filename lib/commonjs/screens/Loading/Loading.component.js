"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Loading;
var _reactNative = require("react-native");
var _PrimaryViewComponent = _interopRequireDefault(require("../../components/PrimaryView/PrimaryView.component.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Loading() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryViewComponent.default, {
    title: "Loading",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
      size: "large"
    })
  });
}
//# sourceMappingURL=Loading.component.js.map