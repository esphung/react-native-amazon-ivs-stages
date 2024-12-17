"use strict";

import React from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IVSBroadcastCameraView } from 'react-native-amazon-ivs-stages';
import { SessionReadyStatus } from "../enums/SessionReadyStatus.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const AUDIO_CONFIG = {
  bitrate: 128000
};
const Spinner = () => /*#__PURE__*/_jsx(ActivityIndicator, {
  style: styles.spinner
});
const Button = ({
  onPress,
  title
}) => /*#__PURE__*/_jsx(TouchableOpacity, {
  style: styles.button,
  onPress: onPress,
  children: /*#__PURE__*/_jsx(Text, {
    style: styles.buttonText,
    children: title
  })
});

// For testing purposes

const BroadcastViewExample = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    onPressDismiss,
    rtmpsUrl,
    streamKey,
    isMirrored,
    isMuted,
    aspectMode,
    cameraPosition,
    stateStatus: {
      stateStatus,
      readyStatus
    },
    metadata: {
      audioStats,
      networkHealth,
      broadcastQuality
    },
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
    onBroadcastStateChangedHandler,
    onIsBroadcastReadyHandler,
    onTransmissionStatisticsChangedHandler,
    videoConfig
  } = props;
  const isConnecting = stateStatus === 'CONNECTING';
  const isConnected = stateStatus === 'CONNECTED';
  const isDisconnected = stateStatus === 'DISCONNECTED';
  const isStartButtonVisible = React.useMemo(() => isDisconnected || stateStatus === 'INVALID', [isDisconnected, stateStatus]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(IVSBroadcastCameraView, {
      ref: ref,
      style: styles.cameraView,
      rtmpsUrl: rtmpsUrl,
      streamKey: streamKey,
      videoConfig: videoConfig,
      audioConfig: AUDIO_CONFIG,
      isMuted: isMuted,
      isCameraPreviewMirrored: isMirrored,
      cameraPosition: cameraPosition,
      cameraPreviewAspectMode: aspectMode,
      onError: onErrorHandler,
      onBroadcastError: onBroadcastErrorHandler,
      onIsBroadcastReady: onIsBroadcastReadyHandler,
      onBroadcastAudioStats: onBroadcastAudioStatsHandler,
      onBroadcastStateChanged: onBroadcastStateChangedHandler,
      onTransmissionStatisticsChanged: onTransmissionStatisticsChangedHandler,
      onMediaServicesWereLost: onMediaServicesWereLostHandler,
      onMediaServicesWereReset: onMediaServicesWereResetHandler,
      onAudioSessionInterrupted: onAudioSessionInterruptedHandler,
      onAudioSessionResumed: onAudioSessionResumedHandler,
      ...(__DEV__ && {
        logLevel: 'debug',
        sessionLogLevel: 'debug'
      })
    }), /*#__PURE__*/_jsx(Modal, {
      visible: true,
      transparent: true,
      animationType: "fade",
      supportedOrientations: ['landscape', 'portrait'],
      children: /*#__PURE__*/_jsx(View, {
        style: styles.modalView,
        children: readyStatus === SessionReadyStatus.None ? /*#__PURE__*/_jsx(Spinner, {}) : readyStatus === SessionReadyStatus.Ready && /*#__PURE__*/_jsxs(View, {
          testID: "primary-container",
          style: styles.primaryContainer,
          children: [/*#__PURE__*/_jsx(View, {
            style: styles.topContainer,
            children: /*#__PURE__*/_jsxs(ScrollView, {
              contentContainerStyle: styles.btnScrollViewContainer,
              horizontal: true,
              children: [/*#__PURE__*/_jsx(Button, {
                title: "Dismiss",
                onPress: () => onPressDismiss?.()
              }), isConnected && /*#__PURE__*/_jsx(Button, {
                title: "Stop",
                onPress: onPressStopButtonHandler
              }), ['none', 'fill', 'fit'].map(mode => /*#__PURE__*/_jsx(Button, {
                title: mode,
                onPress: () => onPressAspectModeButtonHandler(mode)
              }, mode)), /*#__PURE__*/_jsx(Button, {
                title: "Swap",
                onPress: onPressSwapCameraButtonHandler
              }), /*#__PURE__*/_jsx(Button, {
                title: isMuted ? 'Unmute' : 'Mute',
                onPress: onPressMuteButtonHandler
              }), /*#__PURE__*/_jsx(Button, {
                title: "Toggle mirroring",
                onPress: onPressMirrorButtonHandler
              })]
            })
          }), /*#__PURE__*/_jsxs(View, {
            style: styles.bottomContainer,
            children: [/*#__PURE__*/_jsxs(View, {
              style: styles.metaDataContainer,
              children: [/*#__PURE__*/_jsx(Text, {
                style: styles.metaDataText,
                children: `Peak ${audioStats.peak?.toFixed(2)}, Rms: ${audioStats.rms?.toFixed(2)}`
              }), /*#__PURE__*/_jsx(Text, {
                style: styles.metaDataText,
                children: `Stream quality: ${broadcastQuality}`
              }), /*#__PURE__*/_jsx(Text, {
                style: styles.metaDataText,
                children: `Network health: ${networkHealth}`
              })]
            }), (isStartButtonVisible || isConnecting) && /*#__PURE__*/_jsxs(View, {
              style: styles.startBtnAndSpinnerContainer,
              children: [isStartButtonVisible && /*#__PURE__*/_jsx(Button, {
                title: "Start",
                onPress: onPressPlayButtonHandler
              }), isConnecting && /*#__PURE__*/_jsx(Spinner, {})]
            }), isConnected && /*#__PURE__*/_jsx(Text, {
              style: styles.liveText,
              children: "LIVE"
            })]
          })]
        })
      })
    })]
  });
});
const styles = StyleSheet.create({
  spinner: {
    flex: 1
  },
  topContainer: {
    marginTop: 50
  },
  btnScrollViewContainer: {
    // borderWidth: 1,
    // borderColor: 'white',
  },
  startBtnAndSpinnerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 40
  },
  button: {
    marginHorizontal: 8
  },
  buttonText: {
    padding: 8,
    borderRadius: 8,
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    textTransform: 'capitalize'
  },
  metaDataContainer: {
    flex: 1
  },
  metaDataText: {
    color: '#ffffff'
  },
  liveText: {
    color: '#ffffff',
    padding: 8,
    backgroundColor: '#FF5C5C',
    borderRadius: 8
  },
  cameraView: {
    flex: 1,
    backgroundColor: '#000000'

    // borderWidth: 1,
    // borderColor: '#ffffff',
  },
  primaryContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between'
  },
  modalView: {
    flex: 1
  }
});
export default BroadcastViewExample;
//# sourceMappingURL=BroadcastViewExample.js.map