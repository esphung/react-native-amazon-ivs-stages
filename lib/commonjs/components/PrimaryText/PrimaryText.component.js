"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PrimaryText;
var _reactNative = require("react-native");
var React = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const baseStyle = {
  fontSize: 14,
  color: 'white'
};
function PrimaryText(props) {
  const {
    type = 'base',
    style,
    children,
    ...rest
  } = props;
  const memoizedStyle = React.useMemo(() => {
    return [styles[type], style];
  }, [type, style]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    style: memoizedStyle,
    ...rest,
    children: children
  });
}
const styles = _reactNative.StyleSheet.create({
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