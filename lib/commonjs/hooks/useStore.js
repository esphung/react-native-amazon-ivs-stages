"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformRTMPSUrl = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _index = require("../Server/index.js");
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import mockStageDetails from '../__mocks__/mockStageDetails';

const transformRTMPSUrl = (ingestEndpoint, streamKey) => {
  const rtmpsUrl = `rtmps://${ingestEndpoint}/${streamKey}`;
  return rtmpsUrl;
};
exports.transformRTMPSUrl = transformRTMPSUrl;
const useStore = () => {
  const [currentUser, setCurrentUser] = _react.default.useState();
  const [stageDetailsState, setStageDetailsState] = _react.default.useState({
    success: false,
    stages: [],
    // stages: mockStageDetails,
    loading: false,
    selected: null
  });
  const [stageHostDetails, setStageHostDetails] = _react.default.useState();
  const [stageJoinDetails, setStageJoinDetails] = _react.default.useState();
  console.debug('stageDetailsState.stages', stageDetailsState.stages.map(s => s.groupId));
  const [state, setState] = _react.default.useState({
    isWelcomePresent: true,
    isSetupPresent: false,
    isStageListPresent: false,
    isStagePresent: false,
    isLoading: false
  });

  // callbacks
  const showWelcome = _react.default.useCallback(() => {
    setState({
      isWelcomePresent: true,
      isSetupPresent: false,
      isStageListPresent: false,
      isStagePresent: false,
      isLoading: false
    });
  }, []);
  const showSetup = _react.default.useCallback(() => {
    setState({
      isWelcomePresent: false,
      isSetupPresent: true,
      isStageListPresent: false,
      isStagePresent: false,
      isLoading: false
    });
  }, []);
  const showStage = _react.default.useCallback(() => {
    setState({
      isWelcomePresent: false,
      isSetupPresent: false,
      isStageListPresent: false,
      isStagePresent: true,
      isLoading: false
    });
  }, []);
  const showLoading = _react.default.useCallback(() => {
    setState({
      isWelcomePresent: false,
      isSetupPresent: false,
      isStageListPresent: false,
      isStagePresent: false,
      isLoading: true
    });
  }, []);
  const onSelectStageDetails = _react.default.useCallback(stageDetails => {
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
  const onPressGetStarted = _react.default.useCallback(() => {
    showSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const createNewUser = _react.default.useCallback(inputValues => {
    setCurrentUser({
      userId: _reactNativeUuid.default.v4(),
      username: inputValues.username,
      avatarUrl: inputValues.avatarUrl,
      isHost: false
    });
  }, []);
  const updateUser = _react.default.useCallback(({
    isHost
  }) => {
    setCurrentUser(prev => {
      if (!prev) {
        return {
          userId: _reactNativeUuid.default.v4(),
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
  const showStageList = _react.default.useCallback(() => {
    setState({
      isLoading: false,
      isWelcomePresent: false,
      isSetupPresent: false,
      isStagePresent: false,
      isStageListPresent: true
    });
  }, []);
  const onPressSignIn = _react.default.useCallback(({
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
  const onPressJoinStage = _react.default.useCallback(() => {
    console.debug('Join Stage');
    if (!currentUser?.userId || !currentUser?.username || !currentUser?.avatarUrl) {
      console.error('No user id or username or avatar url');
      return;
    }
    if (!stageDetailsState.selected) {
      console.error('No stage selected');
      return;
    }
    (0, _index.joinStage)({
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
  const refreshCurrentStageDetailsList = _react.default.useCallback(() => {
    setStageDetailsState(prev => ({
      ...prev,
      loading: true
    }));
    (0, _index.getAllStages)().then(res => {
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
  const onPressCreateNewStage = _react.default.useCallback(() => {
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
    (0, _index.createStage)({
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
  const onJoinStage = _react.default.useCallback(() => {
    if (!currentUser?.userId || !currentUser?.username || !currentUser?.avatarUrl) {
      console.error('No user id or username or avatar url');
      return;
    }
    if (!stageHostDetails?.groupId) {
      console.error('No group id');
      return;
    }
    (0, _index.joinStage)({
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
  const onDisconnectSync = _react.default.useCallback(() => {
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
    (0, _index.disconnectSync)(stageJoinDetails?.stage?.participantId, stageJoinDetails?.stage?.id, currentUser?.userId);
  }, [currentUser?.userId, stageJoinDetails?.stage?.id, stageJoinDetails?.stage?.participantId]);
  const onDeleteStage = _react.default.useCallback(() => {
    if (!currentUser?.isHost) {
      console.error('[useStore] User is not a host');
      return;
    }
    (0, _index.deleteStage)().then(res => {
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
  const onClearAllState = _react.default.useCallback(() => {
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
  _react.default.useEffect(() => {
    if (!__DEV__) {
      return;
    }
    _reactNative.DevSettings.addMenuItem('Show Welcome', () => {
      showWelcome();
    });
    _reactNative.DevSettings.addMenuItem('Show Setup', () => {
      showSetup();
    });
    _reactNative.DevSettings.addMenuItem('Show Stage', () => {
      showStage();
    });
    _reactNative.DevSettings.addMenuItem('Show Loading', () => {
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
var _default = exports.default = useStore;
//# sourceMappingURL=useStore.js.map