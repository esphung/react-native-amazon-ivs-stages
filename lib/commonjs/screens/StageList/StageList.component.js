"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StageList;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PrimaryButtonComponent = _interopRequireDefault(require("../../components/PrimaryButton/PrimaryButton.component.js"));
var _PrimaryTextComponent = _interopRequireDefault(require("../../components/PrimaryText/PrimaryText.component.js"));
var _PrimaryViewComponent = _interopRequireDefault(require("../../components/PrimaryView/PrimaryView.component.js"));
var _StageListItemComponent = _interopRequireDefault(require("./StageListItem.component.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function StageList(props) {
  // props
  const {
    stageDetailsState: {
      stages: data = [],
      loading: isFetchingStagesList,
      selected: selectedStageDetails
    },
    onSelectStageDetails,
    onPressCreateNewStage,
    onPressJoinStage,
    refreshCurrentStageDetailsList,
    stageHostDetails,
    onDeleteStage,
    currentUser,
    ...rest
  } = props;

  // callbacks
  const renderItem = React.useCallback(({
    item
  }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_StageListItemComponent.default, {
    ...item,
    selected: selectedStageDetails?.channelId === item.channelId,
    currentUser: currentUser,
    onPress: () => {
      if (item.groupId !== stageHostDetails?.groupId) {
        onSelectStageDetails(item);
      } else {
        onSelectStageDetails(null);
      }
    }
  }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [currentUser, selectedStageDetails?.channelId, stageHostDetails?.groupId]);
  const renderListEmptyComponent = React.useCallback(() => {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.container, styles.centeredView],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
        children: "No stages are available"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
        children: "Create a new stage to get started"
      })]
    });
  }, []);

  // memoized
  const memoizedFlatList = React.useMemo(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
    data: data,
    renderItem: renderItem,
    keyExtractor: item => `${item.channelId}`,
    ListEmptyComponent: renderListEmptyComponent,
    onRefresh: refreshCurrentStageDetailsList,
    refreshing: isFetchingStagesList,
    ...rest
  }), [data, renderItem, renderListEmptyComponent, refreshCurrentStageDetailsList, isFetchingStagesList, rest]);

  // side effects
  React.useEffect(() => {
    // on mount, refresh the stages list
    refreshCurrentStageDetailsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_PrimaryViewComponent.default, {
    style: styles.container,
    title: "StageList",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.northPanel,
      children: memoizedFlatList
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.centerPanel,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryTextComponent.default, {
        children: JSON.stringify(currentUser, null, 2)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.southPanel,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryButtonComponent.default, {
        disabled: isFetchingStagesList,
        title: "Refresh Stages List",
        onPress: refreshCurrentStageDetailsList
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryButtonComponent.default, {
        disabled: !selectedStageDetails || isFetchingStagesList || selectedStageDetails?.groupId === stageHostDetails?.groupId,
        title: "Join Stage",
        onPress: onPressJoinStage
      }), stageHostDetails ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryButtonComponent.default, {
        title: "Delete My Stage",
        disabled: isFetchingStagesList,
        onPress: onDeleteStage
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrimaryButtonComponent.default, {
        disabled: isFetchingStagesList,
        title: "Create My Stage",
        onPress: onPressCreateNewStage
      })]
    })]
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
  northPanel: {
    flex: 1
  },
  centerPanel: {
    flex: 0.5
  },
  southPanel: {
    flex: 0.5,
    gap: 8,
    justifyContent: 'center'
  },
  listFooterComponentContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'white'
  }
});
//# sourceMappingURL=StageList.component.js.map