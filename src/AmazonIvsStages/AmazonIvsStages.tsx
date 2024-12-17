import { NativeModules, Platform } from 'react-native';
export { default as useStore } from '../hooks/useStore';
export { default as Loading } from '../screens/Loading/Loading.component';
export { default as Setup } from '../screens/Setup/Setup.component';
export { default as Stage } from '../screens/Stage/Stage.component';
export { default as StageList } from '../screens/StageList/StageList.component';
export { default as Welcome } from '../screens/Welcome/Welcome.component';
export { default as DemoApp } from '../DemoApp';

const LINKING_ERROR =
  `The package 'react-native-amazon-ivs-stages' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AmazonIvsStages = NativeModules.AmazonIvsStages
  ? NativeModules.AmazonIvsStages
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return AmazonIvsStages.multiply(a, b);
}
