"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiply = multiply;
var _reactNative = require("react-native");
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
//# sourceMappingURL=AmazonIvsStages.module.js.map