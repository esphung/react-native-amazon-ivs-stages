"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _PrimaryTextComponent = _interopRequireDefault(require("../../components/PrimaryText/PrimaryText.component.js"));
var _PrimaryImageComponent = _interopRequireDefault(require("../../components/PrimaryImage/PrimaryImage.component.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const StageListItem = ({
  disabled,
  userAttributes: {
    username,
    avatarUrl
  },
  onPress,
  selected = false,
  currentUser
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
  disabled: disabled || onPress === undefined,
  style: [styles.item, selected && styles.itemSelected],
  onPress: onPress,
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.itemRowView,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryImageComponent.default, {
      type: "circle",
      source: {
        uri: avatarUrl
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
      children: `${capitalizeFirstLetter(`${currentUser?.username?.toLowerCase() === username?.toLowerCase() ? 'Your' : `${username}'s`}`)} Stage`
    })]
  })
});
const styles = _reactNative.StyleSheet.create({
  item: {
    // backgroundColor: 'purple',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  itemRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  itemSelected: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'orange'
  }
});
var _default = exports.default = StageListItem;
//# sourceMappingURL=StageListItem.component.js.map