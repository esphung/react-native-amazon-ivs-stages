"use strict";

import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton.component.js";
import PrimaryImage from "../../components/PrimaryImage/PrimaryImage.component.js";
import PrimaryText from "../../components/PrimaryText/PrimaryText.component.js";
import PrimaryView from "../../components/PrimaryView/PrimaryView.component.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Welcome(props) {
  const {
    onPressGetStarted
  } = props;
  const onPressViewSourceCode = React.useCallback(() => {
    Alert.alert('TODO: Add View Source Code');
  }, []);
  return /*#__PURE__*/_jsxs(PrimaryView, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(View, {
      style: [styles.container, styles.northPanel],
      children: /*#__PURE__*/_jsx(PrimaryImage, {
        source: require('../../assets/images/welcomeImage.png')
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.container, styles.centerPanel],
      children: [/*#__PURE__*/_jsx(PrimaryText, {
        type: "header",
        style: styles.text,
        children: "Amazon IVS Stages Demo"
      }), /*#__PURE__*/_jsx(PrimaryText, {
        type: "paragraph",
        style: styles.text,
        children: "This demo app demonstrates how to use Amazon IVS Stages to broadcast a video call"
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.container, styles.southPanel],
      children: [/*#__PURE__*/_jsx(PrimaryButton, {
        title: "Get Started",
        onPress: onPressGetStarted
      }), /*#__PURE__*/_jsx(PrimaryButton, {
        type: "secondary",
        title: "View Source Code",
        onPress: onPressViewSourceCode
      })]
    })]
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  northPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerPanel: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  southPanel: {
    flex: 0.5,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
//# sourceMappingURL=Welcome.component.js.map