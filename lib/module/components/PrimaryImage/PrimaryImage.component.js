"use strict";

import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
export default function PrimaryImage(props) {
  const {
    type = 'base',
    onPress,
    selected = false,
    ...rest
  } = props;
  const memoizedBody = React.useMemo(() => /*#__PURE__*/_jsx(Image, {
    style: [type === 'circle' ? styles.imageCircle : styles.image, selected && styles.selected],
    source: {
      uri: 'https://reactnative.dev/img/tiny_logo.png'
    },
    resizeMode: "contain",
    ...rest
  }), [rest, selected, type]);
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    disabled: !onPress,
    style: [styles.imageBtnContainer, type === 'circle' && styles.imageBtnContainerCircle],
    onPress: onPress,
    children: memoizedBody
  });
}
const styles = StyleSheet.create({
  image: {
    height: '100%'
  },
  imageCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 50
  },
  imageBtnContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageBtnContainerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    borderWidth: 2,
    borderColor: '#FAC140'
  }
});
//# sourceMappingURL=PrimaryImage.component.js.map