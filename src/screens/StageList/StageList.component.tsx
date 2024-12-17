import * as React from 'react';
import { FlatList, StyleSheet, View, type FlatListProps } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton.component';
import PrimaryText from '../../components/PrimaryText/PrimaryText.component';
import PrimaryView from '../../components/PrimaryView/PrimaryView.component';
import type { StageDetails } from '../../types/StageDetails';
import type { StageHostDetails } from '../../types/StageHostDetails';
import type { ItemProps } from './StageListItem.component';
import StageListItem from './StageListItem.component';
import type { IUser } from '../../types/IUser';

interface Props extends Omit<FlatListProps<ItemProps>, 'renderItem' | 'data'> {
  stageDetailsState: {
    success: boolean;
    stages: StageDetails[];
    loading: boolean;
    selected: StageDetails | null;
  };
  onSelectStageDetails: (stageDetails: StageDetails | null) => void;
  onPressCreateNewStage: () => void;
  onPressJoinStage: () => void;
  refreshCurrentStageDetailsList: () => void;
  stageHostDetails?: StageHostDetails;
  onDeleteStage: () => void;
  currentUser?: IUser;
}

export default function StageList(props: Props) {
  // props
  const {
    stageDetailsState: {
      stages: data = [],
      loading: isFetchingStagesList,
      selected: selectedStageDetails,
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
  const renderItem = React.useCallback(
    ({ item }: { item: ItemProps }) => (
      <StageListItem
        {...item}
        selected={selectedStageDetails?.channelId === item.channelId}
        currentUser={currentUser}
        onPress={() => {
          if (item.groupId !== stageHostDetails?.groupId) {
            onSelectStageDetails(item);
          } else {
            onSelectStageDetails(null);
          }
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, selectedStageDetails?.channelId, stageHostDetails?.groupId]
  );

  const renderListEmptyComponent = React.useCallback(() => {
    return (
      <View style={[styles.container, styles.centeredView]}>
        <PrimaryText>No stages are available</PrimaryText>
        <PrimaryText>Create a new stage to get started</PrimaryText>
      </View>
    );
  }, []);

  // memoized
  const memoizedFlatList = React.useMemo(
    () => (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.channelId}`}
        ListEmptyComponent={renderListEmptyComponent}
        onRefresh={refreshCurrentStageDetailsList}
        refreshing={isFetchingStagesList}
        {...rest}
      />
    ),
    [
      data,
      renderItem,
      renderListEmptyComponent,
      refreshCurrentStageDetailsList,
      isFetchingStagesList,
      rest,
    ]
  );

  // side effects
  React.useEffect(() => {
    // on mount, refresh the stages list
    refreshCurrentStageDetailsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PrimaryView style={styles.container} title="StageList">
      <View style={styles.northPanel}>{memoizedFlatList}</View>
      <View style={styles.centerPanel}>
        <PrimaryText>{JSON.stringify(currentUser, null, 2)}</PrimaryText>
      </View>
      <View style={styles.southPanel}>
        <PrimaryButton
          disabled={isFetchingStagesList}
          title="Refresh Stages List"
          onPress={refreshCurrentStageDetailsList}
        />
        <PrimaryButton
          disabled={
            !selectedStageDetails ||
            isFetchingStagesList ||
            selectedStageDetails?.groupId === stageHostDetails?.groupId
          }
          title="Join Stage"
          onPress={onPressJoinStage}
        />

        {stageHostDetails ? (
          <PrimaryButton
            title="Delete My Stage"
            disabled={isFetchingStagesList}
            onPress={onDeleteStage}
          />
        ) : (
          <PrimaryButton
            disabled={isFetchingStagesList}
            title="Create My Stage"
            onPress={onPressCreateNewStage}
          />
        )}
      </View>
    </PrimaryView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  northPanel: {
    flex: 1,
  },
  centerPanel: {
    flex: 0.5,
  },
  southPanel: {
    flex: 0.5,
    gap: 8,
    justifyContent: 'center',
  },
  listFooterComponentContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'white',
  },
});
