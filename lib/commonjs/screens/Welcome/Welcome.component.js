"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Welcome;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _PrimaryButtonComponent = _interopRequireDefault(require("../../components/PrimaryButton/PrimaryButton.component.js"));
var _PrimaryImageComponent = _interopRequireDefault(require("../../components/PrimaryImage/PrimaryImage.component.js"));
var _PrimaryTextComponent = _interopRequireDefault(require("../../components/PrimaryText/PrimaryText.component.js"));
var _PrimaryViewComponent = _interopRequireDefault(require("../../components/PrimaryView/PrimaryView.component.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Welcome(props) {
  const {
    onPressGetStarted
  } = props;
  const onPressViewSourceCode = _react.default.useCallback(() => {
    _reactNative.Alert.alert('TODO: Add View Source Code');
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_PrimaryViewComponent.default, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.container, styles.northPanel],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryImageComponent.default, {
        source: require('../../assets/images/welcomeImage.png')
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.container, styles.centerPanel],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
        type: "header",
        style: styles.text,
        children: "Amazon IVS Stages Demo"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
        type: "paragraph",
        style: styles.text,
        children: "This demo app demonstrates how to use Amazon IVS Stages to broadcast a video call"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.container, styles.southPanel],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryButtonComponent.default, {
        title: "Get Started",
        onPress: onPressGetStarted
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryButtonComponent.default, {
        type: "secondary",
        title: "View Source Code",
        onPress: onPressViewSourceCode
      })]
    })]
  });
}
const styles = _reactNative.StyleSheet.create({
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