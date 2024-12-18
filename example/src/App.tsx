import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  MultihostAppViewProxy,
  useRNEventSubscriptions,
  type SubscribedEventEmittedFunc,
} from 'react-native-amazon-ivs-stages';

export default function App() {
  // callbacks
  const onSubscribedEventEmitted: SubscribedEventEmittedFunc =
    React.useCallback((_) => {
      // do something with the event here
    }, []);

  // hooks
  const { startListening } = useRNEventSubscriptions(onSubscribedEventEmitted);

  // side effects
  React.useEffect(() => {
    const removeListeners = startListening();
    return () => {
      removeListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <MultihostAppViewProxy style={styles.container} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // TODO: replace with safe area insets
    marginHorizontal: 20,
  },
  safeAreaContainer: {
    flex: 1,
  },
});
