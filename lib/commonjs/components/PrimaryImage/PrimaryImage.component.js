"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PrimaryImage;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function PrimaryImage(props) {
  const {
    type = 'base',
    onPress,
    selected = false,
    ...rest
  } = props;
  const memoizedBody = _react.default.useMemo(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
    style: [type === 'circle' ? styles.imageCircle : styles.image, selected && styles.selected],
    source: {
      uri: 'https://reactnative.dev/img/tiny_logo.png'
    },
    resizeMode: "contain",
    ...rest
  }), [rest, selected, type]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    disabled: !onPress,
    style: [styles.imageBtnContainer, type === 'circle' && styles.imageBtnContainerCircle],
    onPress: onPress,
    children: memoizedBody
  });
}
const styles = _reactNative.StyleSheet.create({
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