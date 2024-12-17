"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DemoApp;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeAmazonIvsStages = require("react-native-amazon-ivs-stages");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function DemoApp() {
  // hooks
  const {
    isSetupPresent,
    isStagePresent,
    isWelcomePresent,
    isLoading,
    isStageListPresent,
    onPressGetStarted,
    onPressSignIn,
    stageDetailsState,
    onPressCreateNewStage,
    onPressJoinStage,
    refreshCurrentStageDetailsList,
    onSelectStageDetails,
    stageHostDetails,
    onDeleteStage,
    currentUser,
    showStageList
  } = (0, _reactNativeAmazonIvsStages.useStore)();

  // memoized
  const memoizedBody = React.useMemo(() => {
    if (isLoading) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeAmazonIvsStages.Loading, {});
    }
    if (isStagePresent) {
      if (!stageHostDetails?.channel?.ingestEndpoint || !stageHostDetails?.channel?.streamKey) {
        return null;
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeAmazonIvsStages.Stage, {
        rtmpUrl: stageHostDetails?.channel?.ingestEndpoint,
        streamKey: stageHostDetails?.channel?.streamKey,
        onDismissBroadcast: () => {
          onDeleteStage();
          showStageList();
        }
      });
    }
    if (isStageListPresent) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeAmazonIvsStages.StageList, {
        stageDetailsState: stageDetailsState,
        onPressCreateNewStage: onPressCreateNewStage,
        onPressJoinStage: onPressJoinStage,
        refreshCurrentStageDetailsList: refreshCurrentStageDetailsList,
        onSelectStageDetails: onSelectStageDetails,
        stageHostDetails: stageHostDetails,
        onDeleteStage: onDeleteStage,
        currentUser: currentUser
      });
    }
    if (isSetupPresent) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeAmazonIvsStages.Setup, {
        onPressSignIn: onPressSignIn
      });
    }
    if (isWelcomePresent) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeAmazonIvsStages.Welcome, {
        onPressGetStarted: onPressGetStarted
      });
    }
    return null;
  }, [isLoading, isStagePresent, isStageListPresent, isSetupPresent, isWelcomePresent, stageHostDetails, onDeleteStage, showStageList, stageDetailsState, onPressCreateNewStage, onPressJoinStage, refreshCurrentStageDetailsList, onSelectStageDetails, currentUser, onPressSignIn, onPressGetStarted]);

  // render
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: memoizedBody
  });
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=DemoApp.js.map