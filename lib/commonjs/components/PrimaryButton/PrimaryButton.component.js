"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PrimaryButton;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PrimaryTextComponent = _interopRequireDefault(require("../PrimaryText/PrimaryText.component.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
function PrimaryButton(props) {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    disabled: disabled,
    style: memoizedStyle,
    ...rest,
    children: title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
      style: [disabled && styles.disabledBtnTitle],
      type: memoizedTitleType,
      children: title
    }) : children
  });
}
const styles = _reactNative.StyleSheet.create({
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