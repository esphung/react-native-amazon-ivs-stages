import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton.component';
import PrimaryImage from '../../components/PrimaryImage/PrimaryImage.component';
import PrimaryText from '../../components/PrimaryText/PrimaryText.component';
import PrimaryView from '../../components/PrimaryView/PrimaryView.component';

interface Props {
  onPressGetStarted: () => void;
}

export default function Welcome(props: Props) {
  const { onPressGetStarted } = props;

  const onPressViewSourceCode = React.useCallback(() => {
    Alert.alert('TODO: Add View Source Code');
  }, []);

  return (
    <PrimaryView style={styles.container}>
      <View style={[styles.container, styles.northPanel]}>
        <PrimaryImage
          source={require('../../assets/images/welcomeImage.png')}
        />
      </View>
      <View style={[styles.container, styles.centerPanel]}>
        <PrimaryText type="header" style={styles.text}>
          Amazon IVS Stages Demo
        </PrimaryText>
        <PrimaryText type="paragraph" style={styles.text}>
          This demo app demonstrates how to use Amazon IVS Stages to broadcast a
          video call
        </PrimaryText>
      </View>
      <View style={[styles.container, styles.southPanel]}>
        <PrimaryButton title="Get Started" onPress={onPressGetStarted} />
        <PrimaryButton
          type="secondary"
          title="View Source Code"
          onPress={onPressViewSourceCode}
        />
      </View>
    </PrimaryView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  northPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPanel: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  southPanel: {
    flex: 0.5,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
