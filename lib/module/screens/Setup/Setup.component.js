"use strict";

import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton.component.js";
import PrimaryImage from "../../components/PrimaryImage/PrimaryImage.component.js";
import PrimaryText from "../../components/PrimaryText/PrimaryText.component.js";
import PrimaryTextInput from "../../components/PrimaryTextInput/PrimaryTextInput.component.js";
import PrimaryView from "../../components/PrimaryView/PrimaryView.component.js";
import userAvatarUrls from "../../constants/userAvatarUrls.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Setup(props) {
  const {
    onPressSignIn
  } = props;
  const [username, setUsername] = React.useState('');
  const [avatarUrl, setAvatar] = React.useState('');
  const renderItem = React.useCallback(({
    item
  }) => {
    return /*#__PURE__*/_jsx(View, {
      style: styles.itemView,
      children: /*#__PURE__*/_jsx(PrimaryImage, {
        type: "circle",
        source: {
          uri: item
        },
        onPress: () => {
          setAvatar(prev => prev === item ? '' : item);
        },
        selected: avatarUrl === item
      })
    });
  }, [avatarUrl]);
  const memoizedNameInput = React.useMemo(() => {
    return /*#__PURE__*/_jsx(PrimaryTextInput, {
      value: username,
      onChangeText: setUsername,
      placeholder: "Enter your username",
      autoComplete: "username-new",
      autoCorrect: false,
      autoCapitalize: "none",
      clearButtonMode: "always"
    });
  }, [username]);
  return /*#__PURE__*/_jsxs(PrimaryView, {
    style: styles.container,
    scrollEnabled: true,
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.northPanel
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.centerPanel,
      children: [/*#__PURE__*/_jsx(PrimaryText, {
        type: "textInputLabel",
        style: styles.text,
        children: "Introduce yourself"
      }), memoizedNameInput]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.southPanel,
      children: [/*#__PURE__*/_jsx(PrimaryText, {
        type: "textInputLabel",
        style: styles.text,
        children: "Select Avatar"
      }), /*#__PURE__*/_jsx(FlatList, {
        data: userAvatarUrls,
        renderItem: renderItem,
        keyExtractor: (_, index) => index.toString(),
        horizontal: true,
        showsHorizontalScrollIndicator: false
      }), /*#__PURE__*/_jsx(PrimaryButton, {
        disabled: !username || !avatarUrl,
        title: "Sign In",
        onPress: () => {
          if (!avatarUrl) {
            console.error('No avatar url selected');
            return;
          }
          onPressSignIn({
            username,
            avatarUrl: avatarUrl
          });
        }
      })]
    })]
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  northPanel: {
    flex: 1
  },
  centerPanel: {
    flex: 0.5,
    paddingHorizontal: 20
  },
  southPanel: {
    flex: 0.5,
    paddingHorizontal: 20,
    paddingBottom: 12
  },
  text: {
    paddingVertical: 12
  },
  itemView: {
    marginHorizontal: 4
  }
});
//# sourceMappingURL=Setup.component.js.map