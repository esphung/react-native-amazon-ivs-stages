"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommandIdByPlatform = exports.default = exports.NATIVE_VIEW_NAME = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _IVSBroadcastCameraViewTypes = require("./IVSBroadcastCameraView.types.js");
var _jsxRuntime = require("react/jsx-runtime");
const isNumber = value => typeof value === 'number';
const UNKNOWN = 'unknown';
const NATIVE_VIEW_NAME = exports.NATIVE_VIEW_NAME = 'RCTIVSBroadcastCameraView';
const NATIVE_SIDE_COMMANDS = _reactNative.UIManager.getViewManagerConfig(NATIVE_VIEW_NAME).Commands;
const RCTIVSBroadcastCameraView = (0, _reactNative.requireNativeComponent)(NATIVE_VIEW_NAME);
const getCommandIdByPlatform = command => {
  switch (_reactNative.Platform.OS) {
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
exports.getCommandIdByPlatform = getCommandIdByPlatform;
const IVSBroadcastCameraView = /*#__PURE__*/(0, _react.forwardRef)((props, parentRef) => {
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
  const nativeViewRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(parentRef, () => {
    const reactTag = (0, _reactNative.findNodeHandle)(nativeViewRef.current);
    const dispatchViewManagerCommand = (command, ...params) => _reactNative.UIManager.dispatchViewManagerCommand(reactTag, getCommandIdByPlatform(command) || 'START', params ?? []);
    return {
      start: (options = {}) => dispatchViewManagerCommand(_IVSBroadcastCameraViewTypes.Command.Start, options),
      stop: () => dispatchViewManagerCommand(_IVSBroadcastCameraViewTypes.Command.Stop),
      /**
       * @deprecated in favor of {@link cameraPosition}
       */
      swapCamera: () => dispatchViewManagerCommand(_IVSBroadcastCameraViewTypes.Command.SwapCamera)
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
    const outcomingStateStatus = isNumber(incomingStateStatus) ? _IVSBroadcastCameraViewTypes.StateStatusEnum[incomingStateStatus] : incomingStateStatus;
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
    const networkHealth = isNumber(incomingNetworkHealth) ? _IVSBroadcastCameraViewTypes.NetworkHealthEnum[incomingNetworkHealth] : incomingNetworkHealth;
    const broadcastQuality = isNumber(incomingBroadcastQuality) ? _IVSBroadcastCameraViewTypes.BroadcastQualityEnum[incomingBroadcastQuality] : incomingBroadcastQuality;
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(RCTIVSBroadcastCameraView, {
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
var _default = exports.default = IVSBroadcastCameraView;
//# sourceMappingURL=IVSBroadcastCameraView.js.map