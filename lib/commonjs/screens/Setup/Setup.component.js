"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Setup;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PrimaryButtonComponent = _interopRequireDefault(require("../../components/PrimaryButton/PrimaryButton.component.js"));
var _PrimaryImageComponent = _interopRequireDefault(require("../../components/PrimaryImage/PrimaryImage.component.js"));
var _PrimaryTextComponent = _interopRequireDefault(require("../../components/PrimaryText/PrimaryText.component.js"));
var _PrimaryTextInputComponent = _interopRequireDefault(require("../../components/PrimaryTextInput/PrimaryTextInput.component.js"));
var _PrimaryViewComponent = _interopRequireDefault(require("../../components/PrimaryView/PrimaryView.component.js"));
var _userAvatarUrls = _interopRequireDefault(require("../../constants/userAvatarUrls.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Setup(props) {
  const {
    onPressSignIn
  } = props;
  const [username, setUsername] = React.useState('');
  const [avatarUrl, setAvatar] = React.useState('');
  const renderItem = React.useCallback(({
    item
  }) => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.itemView,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryImageComponent.default, {
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
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextInputComponent.default, {
      value: username,
      onChangeText: setUsername,
      placeholder: "Enter your username",
      autoComplete: "username-new",
      autoCorrect: false,
      autoCapitalize: "none",
      clearButtonMode: "always"
    });
  }, [username]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_PrimaryViewComponent.default, {
    style: styles.container,
    scrollEnabled: true,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.northPanel
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.centerPanel,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
        type: "textInputLabel",
        style: styles.text,
        children: "Introduce yourself"
      }), memoizedNameInput]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.southPanel,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
        type: "textInputLabel",
        style: styles.text,
        children: "Select Avatar"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
        data: _userAvatarUrls.default,
        renderItem: renderItem,
        keyExtractor: (_, index) => index.toString(),
        horizontal: true,
        showsHorizontalScrollIndicator: false
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryButtonComponent.default, {
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
const styles = _reactNative.StyleSheet.create({
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