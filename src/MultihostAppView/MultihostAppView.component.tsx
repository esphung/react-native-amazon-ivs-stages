import {
  type ViewStyle,
  Platform,
  UIManager,
  requireNativeComponent,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-amazon-ivs-multihost' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type MultihostAppViewProps = {
  style: ViewStyle;
};

const ComponentName = 'MultihostAppView';

const NativeMultihostAppViewProxy =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<MultihostAppViewProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

const MultihostAppViewProxy: React.ComponentType<MultihostAppViewProps> = (
  props
) => {
  return <NativeMultihostAppViewProxy {...props} />;
};

MultihostAppViewProxy.displayName = 'MultihostAppViewProxy';

export { MultihostAppViewProxy };
