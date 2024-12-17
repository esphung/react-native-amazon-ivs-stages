"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PrimaryTextInput;
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function PrimaryTextInput(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
    style: styles.textinput,
    placeholderTextColor: "gray",
    ...props
  });
}
const styles = _reactNative.StyleSheet.create({
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