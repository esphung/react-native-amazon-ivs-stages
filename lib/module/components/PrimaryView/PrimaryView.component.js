"use strict";

import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PrimaryText from "../PrimaryText/PrimaryText.component.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function PrimaryView(props) {
  const {
    scrollEnabled = false,
    style,
    title,
    children,
    ...rest
  } = props;
  const memoizedBody = React.useMemo(() => {
    if (!children) {
      if (title) {
        return /*#__PURE__*/_jsx(PrimaryText, {
          style: styles.text,
          children: title
        });
      }
      return null;
    }
    return children;
  }, [children, title]);
  if (scrollEnabled) {
    return /*#__PURE__*/_jsx(ScrollView, {
      contentContainerStyle: style ? style : styles.container,
      ...rest,
      children: memoizedBody
    });
  }
  return /*#__PURE__*/_jsx(View, {
    style: style ? style : [styles.container, styles.centeredView],
    ...rest,
    children: memoizedBody
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }
});
//# sourceMappingURL=PrimaryView.component.js.map