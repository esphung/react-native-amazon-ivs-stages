"use strict";

import { NativeModules, Platform } from 'react-native';
export { default as useStore } from "../hooks/useStore.js";
export { default as Loading } from "../screens/Loading/Loading.component.js";
export { default as Setup } from "../screens/Setup/Setup.component.js";
export { default as Stage } from "../screens/Stage/Stage.component.js";
export { default as StageList } from "../screens/StageList/StageList.component.js";
export { default as Welcome } from "../screens/Welcome/Welcome.component.js";
export { default as DemoApp } from "../DemoApp.js";
const LINKING_ERROR = `The package 'react-native-amazon-ivs-stages' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const AmazonIvsStages = NativeModules.AmazonIvsStages ? NativeModules.AmazonIvsStages : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export function multiply(a, b) {
  return AmazonIvsStages.multiply(a, b);
}
//# sourceMappingURL=AmazonIvsStages.js.map