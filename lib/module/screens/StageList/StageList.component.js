"use strict";

import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton.component.js";
import PrimaryText from "../../components/PrimaryText/PrimaryText.component.js";
import PrimaryView from "../../components/PrimaryView/PrimaryView.component.js";
import StageListItem from "./StageListItem.component.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StageList(props) {
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
  }) => /*#__PURE__*/_jsx(StageListItem, {
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
    return /*#__PURE__*/_jsxs(View, {
      style: [styles.container, styles.centeredView],
      children: [/*#__PURE__*/_jsx(PrimaryText, {
        children: "No stages are available"
      }), /*#__PURE__*/_jsx(PrimaryText, {
        children: "Create a new stage to get started"
      })]
    });
  }, []);

  // memoized
  const memoizedFlatList = React.useMemo(() => /*#__PURE__*/_jsx(FlatList, {
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
  return /*#__PURE__*/_jsxs(PrimaryView, {
    style: styles.container,
    title: "StageList",
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.northPanel,
      children: memoizedFlatList
    }), /*#__PURE__*/_jsx(View, {
      style: styles.centerPanel,
      children: /*#__PURE__*/_jsx(PrimaryText, {
        children: JSON.stringify(currentUser, null, 2)
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.southPanel,
      children: [/*#__PURE__*/_jsx(PrimaryButton, {
        disabled: isFetchingStagesList,
        title: "Refresh Stages List",
        onPress: refreshCurrentStageDetailsList
      }), /*#__PURE__*/_jsx(PrimaryButton, {
        disabled: !selectedStageDetails || isFetchingStagesList || selectedStageDetails?.groupId === stageHostDetails?.groupId,
        title: "Join Stage",
        onPress: onPressJoinStage
      }), stageHostDetails ? /*#__PURE__*/_jsx(PrimaryButton, {
        title: "Delete My Stage",
        disabled: isFetchingStagesList,
        onPress: onDeleteStage
      }) : /*#__PURE__*/_jsx(PrimaryButton, {
        disabled: isFetchingStagesList,
        title: "Create My Stage",
        onPress: onPressCreateNewStage
      })]
    })]
  });
}
const styles = StyleSheet.create({
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