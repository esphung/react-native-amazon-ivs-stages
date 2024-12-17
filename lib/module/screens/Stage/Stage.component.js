"use strict";

import * as React from 'react';
import { Alert, AppState, StyleSheet } from 'react-native';
import BroadcastViewExample from "../../components/BroadcastViewExample.js";
import PrimaryView from "../../components/PrimaryView/PrimaryView.component.js";
import { transformRTMPSUrl } from "../../hooks/useStore.js";
import { SessionReadyStatus } from "../../enums/SessionReadyStatus.js";
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  bitrate: 7500000,
  targetFrameRate: 60,
  keyframeInterval: 2,
  isBFrames: true,
  isAutoBitrate: true,
  maxBitrate: 8500000,
  minBitrate: 1500000
};
const INITIAL_BROADCAST_STATE_STATUS = 'INVALID';
const INITIAL_STATE = {
  readyStatus: SessionReadyStatus.None,
  stateStatus: INITIAL_BROADCAST_STATE_STATUS
};
const INITIAL_META_DATA_STATE = {
  audioStats: {
    rms: 0,
    peak: 0
  },
  broadcastQuality: '',
  networkHealth: ''
};
const useBroadcastView = () => {
  const cameraViewRef = React.useRef(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isMirrored, setIsMirrored] = React.useState(false);
  const [aspectMode, setAspectMode] = React.useState('fit');
  const [cameraPosition, setCameraPosition] = React.useState('back');
  const [statusState, setStatusState] = React.useState(INITIAL_STATE);
  // { audioStats, networkHealth, broadcastQuality }
  const [metadata, setMetaData] = React.useState(INITIAL_META_DATA_STATE);

  // callbacks
  const onPressPlayButtonHandler = React.useCallback(() => {
    cameraViewRef.current?.start();
  }, []);
  const onPressStopButtonHandler = React.useCallback(() => {
    cameraViewRef.current?.stop();
  }, []);
  const onBroadcastErrorHandler = React.useCallback(exception => console.log('Broadcast session error: ', exception), []);
  const onErrorHandler = React.useCallback(errorMessage => console.log('Internal module error: ', errorMessage), []);
  const onMediaServicesWereLostHandler = React.useCallback(() => console.log('The media server is terminated.'), []);
  const onMediaServicesWereResetHandler = React.useCallback(() => console.log('The media server is restarted.'), []);
  const onAudioSessionInterruptedHandler = React.useCallback(() => {
    console.log('The audio session is interrupted.');
  }, []);
  const onAudioSessionResumedHandler = React.useCallback(() => {
    console.log('The audio session is resumed.');
  }, []);
  const onPressSwapCameraButtonHandler = React.useCallback(() => setCameraPosition(currentPosition => currentPosition === 'back' ? 'front' : 'back'), []);
  const onPressMuteButtonHandler = React.useCallback(() => setIsMuted(currentIsMuted => !currentIsMuted), []);
  const onPressMirrorButtonHandler = React.useCallback(() => setIsMirrored(currentIsMirrored => !currentIsMirrored), []);
  const onPressAspectModeButtonHandler = React.useCallback(mode => setAspectMode(mode), []);
  const onIsBroadcastReadyHandler = React.useCallback(isReady => setStatusState(currentState => ({
    ...currentState,
    readyStatus: isReady ? SessionReadyStatus.Ready : SessionReadyStatus.NotReady
  })), []);
  const onBroadcastStateChangedHandler = React.useCallback(status => setStatusState(currentState => ({
    ...currentState,
    stateStatus: status
  })), []);
  const onBroadcastAudioStatsHandler = React.useCallback(stats => setMetaData(currentState => ({
    ...currentState,
    audioStats: {
      ...currentState.audioStats,
      ...stats
    }
  })), []);
  const onTransmissionStatisticsChangedHandler = React.useCallback(transmissionStatistics => setMetaData(currentState => ({
    ...currentState,
    networkHealth: transmissionStatistics.networkHealth,
    broadcastQuality: transmissionStatistics.broadcastQuality
  })), []);

  // listeners
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        if (typeof cameraViewRef !== 'function' && cameraViewRef) {
          cameraViewRef.current?.stop();
        }
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  React.useEffect(() => {
    if (statusState.readyStatus === SessionReadyStatus.NotReady) {
      Alert.alert('Sorry, something went wrong :(', 'Broadcast session is not ready. Please try again.');
    }
  }, [statusState.readyStatus]);
  return {
    cameraViewRef,
    isMuted,
    isMirrored,
    aspectMode,
    cameraPosition,
    statusState,
    metadata,
    onPressPlayButtonHandler,
    onPressStopButtonHandler,
    onBroadcastErrorHandler,
    onErrorHandler,
    onMediaServicesWereLostHandler,
    onMediaServicesWereResetHandler,
    onAudioSessionInterruptedHandler,
    onAudioSessionResumedHandler,
    onPressSwapCameraButtonHandler,
    onPressMuteButtonHandler,
    onPressMirrorButtonHandler,
    onPressAspectModeButtonHandler,
    onIsBroadcastReadyHandler,
    onBroadcastStateChangedHandler,
    onBroadcastAudioStatsHandler,
    onTransmissionStatisticsChangedHandler,
    videoConfig: {
      ...DEFAULT_VIDEO_CONFIG,
      width: 1080,
      height: 1080
    }
  };
};
export default function Stage(props) {
  const {
    rtmpUrl,
    streamKey,
    onDismissBroadcast
  } = props;
  const {
    cameraViewRef,
    isMirrored,
    isMuted,
    aspectMode,
    cameraPosition,
    statusState,
    metadata,
    onPressPlayButtonHandler,
    onPressStopButtonHandler,
    onBroadcastErrorHandler,
    onErrorHandler,
    onMediaServicesWereLostHandler,
    onMediaServicesWereResetHandler,
    onAudioSessionInterruptedHandler,
    onAudioSessionResumedHandler,
    onPressSwapCameraButtonHandler,
    onPressMuteButtonHandler,
    onPressMirrorButtonHandler,
    onPressAspectModeButtonHandler,
    onBroadcastAudioStatsHandler,
    onIsBroadcastReadyHandler,
    onBroadcastStateChangedHandler,
    onTransmissionStatisticsChangedHandler,
    videoConfig
  } = useBroadcastView();
  const transformedRtmpsUrl = React.useMemo(() => transformRTMPSUrl(rtmpUrl, streamKey), [rtmpUrl, streamKey]);
  return /*#__PURE__*/_jsx(PrimaryView, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(BroadcastViewExample, {
      onPressDismiss: onDismissBroadcast,
      rtmpsUrl: transformedRtmpsUrl,
      streamKey: streamKey,
      ref: cameraViewRef,
      isMuted: isMuted,
      isMirrored: isMirrored,
      aspectMode: aspectMode,
      cameraPosition: cameraPosition,
      stateStatus: statusState,
      metadata: metadata,
      onPressPlayButtonHandler: onPressPlayButtonHandler,
      onPressStopButtonHandler: onPressStopButtonHandler,
      onBroadcastErrorHandler: onBroadcastErrorHandler,
      onErrorHandler: onErrorHandler,
      onMediaServicesWereLostHandler: onMediaServicesWereLostHandler,
      onMediaServicesWereResetHandler: onMediaServicesWereResetHandler,
      onAudioSessionInterruptedHandler: onAudioSessionInterruptedHandler,
      onAudioSessionResumedHandler: onAudioSessionResumedHandler,
      onPressSwapCameraButtonHandler: onPressSwapCameraButtonHandler,
      onPressMuteButtonHandler: onPressMuteButtonHandler,
      onPressMirrorButtonHandler: onPressMirrorButtonHandler,
      onPressAspectModeButtonHandler: onPressAspectModeButtonHandler,
      onBroadcastAudioStatsHandler: onBroadcastAudioStatsHandler,
      onIsBroadcastReadyHandler: onIsBroadcastReadyHandler,
      onBroadcastStateChangedHandler: onBroadcastStateChangedHandler,
      onTransmissionStatisticsChangedHandler: onTransmissionStatisticsChangedHandler,
      videoConfig: videoConfig
    })
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=Stage.component.js.map