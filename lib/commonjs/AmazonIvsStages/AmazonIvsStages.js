"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DemoApp", {
  enumerable: true,
  get: function () {
    return _DemoApp.default;
  }
});
Object.defineProperty(exports, "Loading", {
  enumerable: true,
  get: function () {
    return _LoadingComponent.default;
  }
});
Object.defineProperty(exports, "Setup", {
  enumerable: true,
  get: function () {
    return _SetupComponent.default;
  }
});
Object.defineProperty(exports, "Stage", {
  enumerable: true,
  get: function () {
    return _StageComponent.default;
  }
});
Object.defineProperty(exports, "StageList", {
  enumerable: true,
  get: function () {
    return _StageListComponent.default;
  }
});
Object.defineProperty(exports, "Welcome", {
  enumerable: true,
  get: function () {
    return _WelcomeComponent.default;
  }
});
exports.multiply = multiply;
Object.defineProperty(exports, "useStore", {
  enumerable: true,
  get: function () {
    return _useStore.default;
  }
});
var _reactNative = require("react-native");
var _useStore = _interopRequireDefault(require("../hooks/useStore.js"));
var _LoadingComponent = _interopRequireDefault(require("../screens/Loading/Loading.component.js"));
var _SetupComponent = _interopRequireDefault(require("../screens/Setup/Setup.component.js"));
var _StageComponent = _interopRequireDefault(require("../screens/Stage/Stage.component.js"));
var _StageListComponent = _interopRequireDefault(require("../screens/StageList/StageList.component.js"));
var _WelcomeComponent = _interopRequireDefault(require("../screens/Welcome/Welcome.component.js"));
var _DemoApp = _interopRequireDefault(require("../DemoApp.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LINKING_ERROR = `The package 'react-native-amazon-ivs-stages' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const AmazonIvsStages = _reactNative.NativeModules.AmazonIvsStages ? _reactNative.NativeModules.AmazonIvsStages : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function multiply(a, b) {
  return AmazonIvsStages.multiply(a, b);
}
//# sourceMappingURL=AmazonIvsStages.js.map