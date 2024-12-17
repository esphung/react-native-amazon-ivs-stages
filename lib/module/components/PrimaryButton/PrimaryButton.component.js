"use strict";

import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryText from "../PrimaryText/PrimaryText.component.js";
import { jsx as _jsx } from "react/jsx-runtime";
const baseStyle = {
  width: '100%',
  backgroundColor: '#FAC140',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  maxWidth: 300,
  height: 50
};
export default function PrimaryButton(props) {
  const {
    disabled = false,
    type = 'primary',
    title,
    style,
    children,
    ...rest
  } = props;
  const memoizedStyle = React.useMemo(() => {
    return [styles[type], style, disabled && styles.disabled];
  }, [disabled, style, type]);
  const memoizedTitleType = React.useMemo(() => {
    switch (type) {
      case 'secondary':
        return 'secondaryBtnTitle';
      default:
        return 'primaryBtnTitle';
    }
  }, [type]);
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    disabled: disabled,
    style: memoizedStyle,
    ...rest,
    children: title ? /*#__PURE__*/_jsx(PrimaryText, {
      style: [disabled && styles.disabledBtnTitle],
      type: memoizedTitleType,
      children: title
    }) : children
  });
}
const styles = StyleSheet.create({
  primary: {
    ...baseStyle
  },
  secondary: {
    ...baseStyle,
    backgroundColor: 'transparent'
  },
  disabled: {
    ...baseStyle,
    backgroundColor: 'lightgray',
    opacity: 0.5
  },
  disabledBtnTitle: {
    color: 'white'
  }
});
//# sourceMappingURL=PrimaryButton.component.js.map