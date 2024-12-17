import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Loading,
  Setup,
  Stage,
  StageList,
  Welcome,
  useStore,
} from 'react-native-amazon-ivs-stages';

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
    showStageList,
  } = useStore();

  // memoized
  const memoizedBody = React.useMemo(() => {
    if (isLoading) {
      return <Loading />;
    }
    if (isStagePresent) {
      if (
        !stageHostDetails?.channel?.ingestEndpoint ||
        !stageHostDetails?.channel?.streamKey
      ) {
        return null;
      }
      return (
        <Stage
          rtmpUrl={stageHostDetails?.channel?.ingestEndpoint}
          streamKey={stageHostDetails?.channel?.streamKey}
          onDismissBroadcast={() => {
            onDeleteStage();
            showStageList();
          }}
        />
      );
    }

    if (isStageListPresent) {
      return (
        <StageList
          stageDetailsState={stageDetailsState}
          onPressCreateNewStage={onPressCreateNewStage}
          onPressJoinStage={onPressJoinStage}
          refreshCurrentStageDetailsList={refreshCurrentStageDetailsList}
          onSelectStageDetails={onSelectStageDetails}
          stageHostDetails={stageHostDetails}
          onDeleteStage={onDeleteStage}
          currentUser={currentUser}
        />
      );
    }
    if (isSetupPresent) {
      return <Setup onPressSignIn={onPressSignIn} />;
    }

    if (isWelcomePresent) {
      return <Welcome onPressGetStarted={onPressGetStarted} />;
    }

    return null;
  }, [
    isLoading,
    isStagePresent,
    isStageListPresent,
    isSetupPresent,
    isWelcomePresent,
    stageHostDetails,
    onDeleteStage,
    showStageList,
    stageDetailsState,
    onPressCreateNewStage,
    onPressJoinStage,
    refreshCurrentStageDetailsList,
    onSelectStageDetails,
    currentUser,
    onPressSignIn,
    onPressGetStarted,
  ]);

  // render
  return <View style={styles.container}>{memoizedBody}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
