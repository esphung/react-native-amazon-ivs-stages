import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { multiply } from 'react-native-amazon-ivs-stages';
import BroadcastViewExample from './BroadcastViewExample';

const App = (): React.JSX.Element => {
  const [result, setResult] = useState<number | undefined>();
  const [shouldShowBroadcastView, setShouldShowBroadcastView] =
    useState<boolean>(false);

  useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  if (shouldShowBroadcastView) {
    return <BroadcastViewExample />;
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button
        title="Go to BroadcastView"
        onPress={() => {
          setShouldShowBroadcastView(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
