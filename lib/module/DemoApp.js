"use strict";

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Loading, Setup, Stage, StageList, Welcome, useStore } from 'react-native-amazon-ivs-stages';
import { jsx as _jsx } from "react/jsx-runtime";
export default function DemoApp() {
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
  } = useStore();

  // memoized
  const memoizedBody = React.useMemo(() => {
    if (isLoading) {
      return /*#__PURE__*/_jsx(Loading, {});
    }
    if (isStagePresent) {
      if (!stageHostDetails?.channel?.ingestEndpoint || !stageHostDetails?.channel?.streamKey) {
        return null;
      }
      return /*#__PURE__*/_jsx(Stage, {
        rtmpUrl: stageHostDetails?.channel?.ingestEndpoint,
        streamKey: stageHostDetails?.channel?.streamKey,
        onDismissBroadcast: () => {
          onDeleteStage();
          showStageList();
        }
      });
    }
    if (isStageListPresent) {
      return /*#__PURE__*/_jsx(StageList, {
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
      return /*#__PURE__*/_jsx(Setup, {
        onPressSignIn: onPressSignIn
      });
    }
    if (isWelcomePresent) {
      return /*#__PURE__*/_jsx(Welcome, {
        onPressGetStarted: onPressGetStarted
      });
    }
    return null;
  }, [isLoading, isStagePresent, isStageListPresent, isSetupPresent, isWelcomePresent, stageHostDetails, onDeleteStage, showStageList, stageDetailsState, onPressCreateNewStage, onPressJoinStage, refreshCurrentStageDetailsList, onSelectStageDetails, currentUser, onPressSignIn, onPressGetStarted]);

  // render
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: memoizedBody
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=DemoApp.js.map