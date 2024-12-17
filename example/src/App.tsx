import React, { useState } from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ButtonProps,
} from 'react-native';
import { DemoApp, useStore } from 'react-native-amazon-ivs-stages';
import userAvatarUrls from '../../src/constants/userAvatarUrls';

const App = (): React.JSX.Element => {
  const [isMultihostAppVisible, setIsMultihostAppVisible] =
    useState<boolean>(true);

  const {
    currentUser,
    stageJoinDetails,
    stageHostDetails,
    onPressCreateNewStage,
    onJoinStage,
    onDisconnectSync,
    refreshCurrentStageDetailsList,
    stageDetailsState,
    onClearAllState,
    onDeleteStage,
    createNewUser,
  } = useStore();

  const renderBtnItem = React.useCallback(({ item }: { item: ButtonProps }) => {
    return <Button {...item} key={item.title} />;
  }, []);

  const mainView = React.useMemo(
    () => (
      <View style={styles.container}>
        <ScrollView>
          {[
            {
              disabled: !currentUser,
              title: 'Clear All State',
              onPress: onClearAllState,
            },
            {
              disabled: !!currentUser,
              title: 'Create Fake User',
              onPress: () => {
                const avatarUrl = userAvatarUrls[0];
                if (!avatarUrl) {
                  console.error('No avatar url found');
                  return;
                }
                createNewUser({
                  username: 'test-user',
                  avatarUrl,
                });
              },
            },
            {
              disabled: !currentUser,
              title: 'Get All Stages',
              onPress: refreshCurrentStageDetailsList,
            },
            {
              disabled: !currentUser || !!stageHostDetails?.groupId,
              title: 'Create New Stage',
              onPress: onPressCreateNewStage,
            },
            {
              disabled: !stageHostDetails?.groupId,
              title: 'Delete Stage',
              onPress: onDeleteStage,
            },
            {
              disabled: !stageDetailsState.selected || !currentUser,
              title: 'Join Stage',
              onPress: onJoinStage,
            },
            {
              disabled:
                !stageJoinDetails?.stage?.id ||
                !stageJoinDetails?.stage?.participantId,
              title: 'Disconnect Sync',
              onPress: onDisconnectSync,
            },
            {
              title: 'Show DemoApp',
              onPress: () => {
                setIsMultihostAppVisible(true);
              },
            },
          ].map((item) => renderBtnItem({ item }))}

          <Text style={styles.text}>
            user: {JSON.stringify(currentUser, null, 2)}
          </Text>
          <Text style={styles.text}>
            stages: {JSON.stringify(stageDetailsState.stages, null, 2)}
          </Text>
          <Text style={styles.text}>
            stageHostingDetails: {JSON.stringify(stageHostDetails, null, 2)}
          </Text>
          <Text style={styles.text}>
            stageJoinDetails: {JSON.stringify(stageJoinDetails, null, 2)}
          </Text>
        </ScrollView>
      </View>
    ),
    [
      currentUser,
      onClearAllState,
      refreshCurrentStageDetailsList,
      stageHostDetails,
      onPressCreateNewStage,
      onDeleteStage,
      stageDetailsState.selected,
      stageDetailsState.stages,
      onJoinStage,
      stageJoinDetails,
      onDisconnectSync,
      createNewUser,
      renderBtnItem,
    ]
  );

  const multihostAppView = React.useMemo(() => {
    return <DemoApp />;
  }, []);

  const currentView = React.useMemo(() => {
    return isMultihostAppVisible ? multihostAppView : mainView;
  }, [isMultihostAppVisible, mainView, multihostAppView]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>{currentView}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : undefined, // for iOS notch
  },
  container: {
    flex: 1,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default App;
