"use strict";

import { StyleSheet, Text } from 'react-native';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const baseStyle = {
  fontSize: 14,
  color: 'white'
};
export default function PrimaryText(props) {
  const {
    type = 'base',
    style,
    children,
    ...rest
  } = props;
  const memoizedStyle = React.useMemo(() => {
    return [styles[type], style];
  }, [type, style]);
  return /*#__PURE__*/_jsx(Text, {
    style: memoizedStyle,
    ...rest,
    children: children
  });
}
const styles = StyleSheet.create({
  base: {
    ...baseStyle
  },
  header: {
    ...baseStyle,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  },
  paragraph: {
    ...baseStyle,
    fontSize: 14,
    color: 'white'
  },
  primaryBtnTitle: {
    ...baseStyle,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  secondaryBtnTitle: {
    ...baseStyle,
    fontSize: 16,
    color: '#FAC140'
  },
  textInputLabel: {
    ...baseStyle,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }
});
//# sourceMappingURL=PrimaryText.component.js.map