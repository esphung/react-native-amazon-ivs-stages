import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  MultihostAppViewProxy,
  useRNEventSubscriptions,
  type SubscribedEventEmittedFunc,
} from 'react-native-amazon-ivs-stages';

export default function App() {
  const onNativeEventHandler: SubscribedEventEmittedFunc = React.useCallback(
    (eventData) => {
      // do something with the event that fired in the native view
      console.debug({ eventData });
    },
    []
  );

  const { startListening } = useRNEventSubscriptions(onNativeEventHandler);

  React.useEffect(() => {
    const removeListeners = startListening();
    return () => {
      removeListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <MultihostAppViewProxy style={styles.nativeView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nativeView: {
    flex: 1,
  },
});
