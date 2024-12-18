"use strict";

import { Platform, UIManager, requireNativeComponent } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
const LINKING_ERROR = `The package 'react-native-amazon-ivs-multihost' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = 'MultihostAppView';
const NativeMultihostAppViewProxy = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
const MultihostAppViewProxy = props => {
  return /*#__PURE__*/_jsx(NativeMultihostAppViewProxy, {
    ...props
  });
};
MultihostAppViewProxy.displayName = 'MultihostAppViewProxy';
export { MultihostAppViewProxy };
//# sourceMappingURL=MultihostAppView.component.js.map