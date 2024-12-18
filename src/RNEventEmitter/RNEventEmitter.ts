import { NativeEventEmitter, NativeModules } from 'react-native';

const { RNEventEmitter } = NativeModules;
const eventEmitter = new NativeEventEmitter(RNEventEmitter);

// Returns a subscription
function startListening(
  eventName: string,
  callback: (res: {
    data: {
      screen?: string;
      error?: string;
      state?: string;
    };
  }) => void
) {
  const subscription = eventEmitter.addListener(eventName, (res) => {
    callback(res);
  });

  return () => {
    subscription.remove();
  };
}

export default {
  startListening,
};
