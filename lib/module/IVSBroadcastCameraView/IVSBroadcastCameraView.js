"use strict";

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Platform, UIManager, findNodeHandle, requireNativeComponent } from 'react-native';
import { BroadcastQualityEnum, Command, NetworkHealthEnum, StateStatusEnum } from "./IVSBroadcastCameraView.types.js";
import { jsx as _jsx } from "react/jsx-runtime";
const isNumber = value => typeof value === 'number';
const UNKNOWN = 'unknown';
export const NATIVE_VIEW_NAME = 'RCTIVSBroadcastCameraView';
const NATIVE_SIDE_COMMANDS = UIManager.getViewManagerConfig(NATIVE_VIEW_NAME).Commands;
const RCTIVSBroadcastCameraView = requireNativeComponent(NATIVE_VIEW_NAME);
export const getCommandIdByPlatform = command => {
  switch (Platform.OS) {
    case 'android':
      {
        return command;
      }
    case 'ios':
      {
        return NATIVE_SIDE_COMMANDS[command];
      }
    default:
      {
        return '';
      }
  }
};
const IVSBroadcastCameraView = /*#__PURE__*/forwardRef((props, parentRef) => {
  const {
    onError,
    onBroadcastError,
    onIsBroadcastReady,
    onBroadcastAudioStats,
    onBroadcastStateChanged,
    onBroadcastQualityChanged,
    onNetworkHealthChanged,
    onTransmissionStatisticsChanged,
    onAudioSessionInterrupted,
    onAudioSessionResumed,
    onMediaServicesWereLost,
    onMediaServicesWereReset,
    isMuted = false,
    isCameraPreviewMirrored = false,
    cameraPosition = 'back',
    cameraPreviewAspectMode = 'none',
    logLevel = 'error',
    sessionLogLevel = 'error',
    ...restProps
  } = props;
  const nativeViewRef = useRef(null);
  useImperativeHandle(parentRef, () => {
    const reactTag = findNodeHandle(nativeViewRef.current);
    const dispatchViewManagerCommand = (command, ...params) => UIManager.dispatchViewManagerCommand(reactTag, getCommandIdByPlatform(command) || '', params ?? []);
    return {
      start: (options = {}) => dispatchViewManagerCommand(Command.Start, options),
      stop: () => dispatchViewManagerCommand(Command.Stop),
      /**
       * @deprecated in favor of {@link cameraPosition}
       */
      swapCamera: () => dispatchViewManagerCommand(Command.SwapCamera)
    };
  }, []);
  const onErrorHandler = ({
    nativeEvent
  }) => onError?.(nativeEvent.message);
  const onBroadcastErrorHandler = ({
    nativeEvent
  }) => {
    const {
      code,
      type,
      detail,
      source,
      isFatal,
      sessionId
    } = nativeEvent.exception;
    onBroadcastError?.({
      code: String(code) ?? UNKNOWN,
      type: type ?? UNKNOWN,
      source: source ?? UNKNOWN,
      detail: detail ?? '',
      isFatal: !!isFatal,
      sessionId: sessionId ?? UNKNOWN
    });
  };
  const onIsBroadcastReadyHandler = ({
    nativeEvent
  }) => onIsBroadcastReady?.(nativeEvent.isReady);
  const onBroadcastAudioStatsHandler = ({
    nativeEvent
  }) => onBroadcastAudioStats?.(nativeEvent.audioStats);
  const onBroadcastStateChangedHandler = ({
    nativeEvent
  }) => {
    const {
      stateStatus: incomingStateStatus,
      metadata
    } = nativeEvent;
    const outcomingStateStatus = isNumber(incomingStateStatus) ? StateStatusEnum[incomingStateStatus] : incomingStateStatus;
    onBroadcastStateChanged?.(outcomingStateStatus, metadata);
  };

  /**
   * @deprecated in favor of {@link onTransmissionStatisticsChangedHandler}
   */
  const onNetworkHealthChangedHandler = ({
    nativeEvent
  }) => onNetworkHealthChanged?.(nativeEvent.networkHealth);

  /**
   * @deprecated in favor of {@link onTransmissionStatisticsChangedHandler}
   */
  const onBroadcastQualityChangedHandler = ({
    nativeEvent
  }) => onBroadcastQualityChanged?.(nativeEvent.quality);
  const onTransmissionStatisticsChangedHandler = ({
    nativeEvent
  }) => {
    const {
      networkHealth: incomingNetworkHealth,
      broadcastQuality: incomingBroadcastQuality,
      ...rest
    } = nativeEvent.statistics;
    const networkHealth = isNumber(incomingNetworkHealth) ? NetworkHealthEnum[incomingNetworkHealth] : incomingNetworkHealth;
    const broadcastQuality = isNumber(incomingBroadcastQuality) ? BroadcastQualityEnum[incomingBroadcastQuality] : incomingBroadcastQuality;
    return onTransmissionStatisticsChanged?.({
      networkHealth,
      broadcastQuality,
      ...rest
    });
  };
  const onAudioSessionInterruptedHandler = () => onAudioSessionInterrupted?.();
  const onAudioSessionResumedHandler = () => onAudioSessionResumed?.();
  const onMediaServicesWereLostHandler = () => onMediaServicesWereLost?.();
  const onMediaServicesWereResetHandler = () => onMediaServicesWereReset?.();
  return /*#__PURE__*/_jsx(RCTIVSBroadcastCameraView, {
    testID: NATIVE_VIEW_NAME,
    ...restProps,
    ref: nativeViewRef,
    isMuted: isMuted,
    logLevel: logLevel,
    sessionLogLevel: sessionLogLevel,
    cameraPreviewAspectMode: cameraPreviewAspectMode,
    isCameraPreviewMirrored: isCameraPreviewMirrored,
    cameraPosition: cameraPosition,
    onError: onErrorHandler,
    onBroadcastError: onBroadcastErrorHandler,
    onIsBroadcastReady: onIsBroadcastReadyHandler,
    onBroadcastAudioStats: onBroadcastAudioStatsHandler,
    onBroadcastStateChanged: onBroadcastStateChangedHandler,
    onBroadcastQualityChanged: onBroadcastQualityChangedHandler,
    onNetworkHealthChanged: onNetworkHealthChangedHandler,
    onTransmissionStatisticsChanged: onTransmissionStatisticsChangedHandler,
    onAudioSessionInterrupted: onAudioSessionInterruptedHandler,
    onAudioSessionResumed: onAudioSessionResumedHandler,
    onMediaServicesWereLost: onMediaServicesWereLostHandler,
    onMediaServicesWereReset: onMediaServicesWereResetHandler
  });
});
export default IVSBroadcastCameraView;
//# sourceMappingURL=IVSBroadcastCameraView.js.map