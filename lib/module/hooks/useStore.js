"use strict";

import React from 'react';
import { DevSettings } from 'react-native';
import { createStage, deleteStage, disconnectSync, getAllStages, joinStage } from "../Server/index.js";
// import mockStageDetails from '../__mocks__/mockStageDetails';
import uuid from 'react-native-uuid';
export const transformRTMPSUrl = (ingestEndpoint, streamKey) => {
  const rtmpsUrl = `rtmps://${ingestEndpoint}/${streamKey}`;
  return rtmpsUrl;
};
const useStore = () => {
  const [currentUser, setCurrentUser] = React.useState();
  const [stageDetailsState, setStageDetailsState] = React.useState({
    success: false,
    stages: [],
    // stages: mockStageDetails,
    loading: false,
    selected: null
  });
  const [stageHostDetails, setStageHostDetails] = React.useState();
  const [stageJoinDetails, setStageJoinDetails] = React.useState();
  console.debug('stageDetailsState.stages', stageDetailsState.stages.map(s => s.groupId));
  const [state, setState] = React.useState({
    isWelcomePresent: true,
    isSetupPresent: false,
    isStageListPresent: false,
    isStagePresent: false,
    isLoading: false
  });

  // callbacks
  const showWelcome = React.useCallback(() => {
    setState({
      isWelcomePresent: true,
      isSetupPresent: false,
      isStageListPresent: false,
      isStagePresent: false,
      isLoading: false
    });
  }, []);
  const showSetup = React.useCallback(() => {
    setState({
      isWelcomePresent: false,
      isSetupPresent: true,
      isStageListPresent: false,
      isStagePresent: false,
      isLoading: false
    });
  }, []);
  const showStage = React.useCallback(() => {
    setState({
      isWelcomePresent: false,
      isSetupPresent: false,
      isStageListPresent: false,
      isStagePresent: true,
      isLoading: false
    });
  }, []);
  const showLoading = React.useCallback(() => {
    setState({
      isWelcomePresent: false,
      isSetupPresent: false,
      isStageListPresent: false,
      isStagePresent: false,
      isLoading: true
    });
  }, []);
  const onSelectStageDetails = React.useCallback(stageDetails => {
    setStageDetailsState(prev => {
      if (prev.selected?.channelId !== stageDetails?.channelId && stageDetails?.channelId) {
        return {
          ...prev,
          selected: stageDetails
        };
      } else {
        return {
          ...prev,
          selected: null
        };
      }
    });
  }, []);
  const onPressGetStarted = React.useCallback(() => {
    showSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const createNewUser = React.useCallback(inputValues => {
    setCurrentUser({
      userId: uuid.v4(),
      username: inputValues.username,
      avatarUrl: inputValues.avatarUrl,
      isHost: false
    });
  }, []);
  const updateUser = React.useCallback(({
    isHost
  }) => {
    setCurrentUser(prev => {
      if (!prev) {
        return {
          userId: uuid.v4(),
          username: 'Random User',
          avatarUrl: 'https://randomuser.me/api/portraits',
          isHost
        };
      }
      return {
        ...prev,
        isHost
      };
    });
  }, []);
  const showStageList = React.useCallback(() => {
    setState({
      isLoading: false,
      isWelcomePresent: false,
      isSetupPresent: false,
      isStagePresent: false,
      isStageListPresent: true
    });
  }, []);
  const onPressSignIn = React.useCallback(({
    username,
    avatarUrl
  }) => {
    createNewUser({
      username,
      avatarUrl
    });
    showStageList();
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  const onPressJoinStage = React.useCallback(() => {
    console.debug('Join Stage');
    if (!currentUser?.userId || !currentUser?.username || !currentUser?.avatarUrl) {
      console.error('No user id or username or avatar url');
      return;
    }
    if (!stageDetailsState.selected) {
      console.error('No stage selected');
      return;
    }
    joinStage({
      user: {
        userId: currentUser?.userId,
        username: currentUser?.username,
        avatarUrl: currentUser?.avatarUrl,
        isHost: false
      },
      groupId: stageDetailsState.selected?.groupId
    }).then(res => {
      console.debug('[DEBUG] Join Stage Test Result: ', JSON.stringify(res, null, 2));
    });
  }, [currentUser?.avatarUrl, currentUser?.userId, currentUser?.username, stageDetailsState.selected]);
  const refreshCurrentStageDetailsList = React.useCallback(() => {
    setStageDetailsState(prev => ({
      ...prev,
      loading: true
    }));
    getAllStages().then(res => {
      setStageDetailsState(prev => ({
        ...prev,
        success: res.success,
        stages: res.stages,
        loading: false
      }));
    }).then(() => setStageDetailsState(prev => ({
      ...prev,
      loading: false
    })));
  }, []);
  const onPressCreateNewStage = React.useCallback(() => {
    if (!currentUser?.userId || !currentUser?.username || !currentUser?.avatarUrl) {
      console.debug({
        currentUser
      });
      console.error('No user id or username or avatar url');
      return;
    }
    setStageDetailsState(prev => ({
      ...prev,
      loading: true
    }));
    createStage({
      ...currentUser,
      isHost: true
    }).then(res => {
      console.debug('[DEBUG] Create Stage Result: ', JSON.stringify(res, null, 2));
      if (!res.stageHostDetails) {
        console.error('No stage host details returned', JSON.stringify(res));
        return;
      }
      // refresh stages list
      setStageHostDetails(res.stageHostDetails);
      updateUser({
        isHost: true
      });
    }).finally(() => {
      refreshCurrentStageDetailsList();
      setStageDetailsState(prev => ({
        ...prev,
        loading: false
      }));
      showStage();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const onJoinStage = React.useCallback(() => {
    if (!currentUser?.userId || !currentUser?.username || !currentUser?.avatarUrl) {
      console.error('No user id or username or avatar url');
      return;
    }
    if (!stageHostDetails?.groupId) {
      console.error('No group id');
      return;
    }
    joinStage({
      user: {
        ...currentUser,
        isHost: false
      },
      groupId: stageHostDetails?.groupId
    }).then(res => {
      console.debug('[DEBUG] Join Stage Test Result: ', JSON.stringify(res, null, 2));
      setStageJoinDetails(res.stageJoinDetails);
      updateUser({
        isHost: false
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, stageHostDetails?.groupId]);
  const onDisconnectSync = React.useCallback(() => {
    if (!stageJoinDetails?.stage?.participantId) {
      console.error('No participant id');
      return;
    }
    if (!stageJoinDetails?.stage?.id) {
      console.error('No stage id');
      return;
    }
    if (!currentUser?.userId) {
      console.error('No user id');
      return;
    }
    disconnectSync(stageJoinDetails?.stage?.participantId, stageJoinDetails?.stage?.id, currentUser?.userId);
  }, [currentUser?.userId, stageJoinDetails?.stage?.id, stageJoinDetails?.stage?.participantId]);
  const onDeleteStage = React.useCallback(() => {
    if (!currentUser?.isHost) {
      console.error('[useStore] User is not a host');
      return;
    }
    deleteStage().then(res => {
      if (res.success) {
        setStageHostDetails(undefined);
        updateUser({
          isHost: false
        });
        refreshCurrentStageDetailsList();
        console.debug('[useStore] Stage deleted');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.isHost]);
  const onClearAllState = React.useCallback(() => {
    setCurrentUser(undefined);
    setStageHostDetails(undefined);
    setStageJoinDetails(undefined);
    setStageDetailsState({
      success: false,
      stages: [],
      loading: false,
      selected: null
    });
    setState({
      isWelcomePresent: true,
      isSetupPresent: false,
      isStageListPresent: false,
      isStagePresent: false,
      isLoading: false
    });
  }, []);

  // side effects
  React.useEffect(() => {
    if (!__DEV__) {
      return;
    }
    DevSettings.addMenuItem('Show Welcome', () => {
      showWelcome();
    });
    DevSettings.addMenuItem('Show Setup', () => {
      showSetup();
    });
    DevSettings.addMenuItem('Show Stage', () => {
      showStage();
    });
    DevSettings.addMenuItem('Show Loading', () => {
      showLoading();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    ...state,
    onPressGetStarted,
    onPressSignIn,
    currentUser,
    setCurrentUser,
    stageDetailsState,
    onPressCreateNewStage,
    onPressJoinStage,
    refreshCurrentStageDetailsList,
    onSelectStageDetails,
    stageHostDetails,
    setStageHostDetails,
    stageJoinDetails,
    setStageJoinDetails,
    onJoinStage,
    onDisconnectSync,
    onClearAllState,
    onDeleteStage,
    createNewUser,
    showStageList
  };
};
export default useStore;
//# sourceMappingURL=useStore.js.map