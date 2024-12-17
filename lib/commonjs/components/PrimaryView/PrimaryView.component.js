"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PrimaryView;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PrimaryTextComponent = _interopRequireDefault(require("../PrimaryText/PrimaryText.component.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function PrimaryView(props) {
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
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
          style: styles.text,
          children: title
        });
      }
      return null;
    }
    return children;
  }, [children, title]);
  if (scrollEnabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      contentContainerStyle: style ? style : styles.container,
      ...rest,
      children: memoizedBody
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: style ? style : [styles.container, styles.centeredView],
    ...rest,
    children: memoizedBody
  });
}
const styles = _reactNative.StyleSheet.create({
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