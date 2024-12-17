"use strict";

import { StyleSheet, TextInput } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
export default function PrimaryTextInput(props) {
  return /*#__PURE__*/_jsx(TextInput, {
    style: styles.textinput,
    placeholderTextColor: "gray",
    ...props
  });
}
const styles = StyleSheet.create({
  textinput: {
    height: 50,
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white'
  }
});
//# sourceMappingURL=PrimaryTextInput.component.js.map