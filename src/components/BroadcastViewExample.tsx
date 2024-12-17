import React, { type FC } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';

import {
  type BroadcastQuality,
  type CameraPosition,
  type CameraPreviewAspectMode,
  type IAudioStats,
  type IBroadcastSessionError,
  type IIVSBroadcastCameraView,
  type ITransmissionStatistics,
  IVSBroadcastCameraView,
  type NetworkHealth,
  type StateStatusUnion,
} from 'react-native-amazon-ivs-stages';
import { SessionReadyStatus } from '../enums/SessionReadyStatus';
import type { IVideoConfig } from '../IVSBroadcastCameraView/IVSBroadcastCameraView.types';

const AUDIO_CONFIG = {
  bitrate: 128000,
} as const;

const Spinner = () => <ActivityIndicator style={styles.spinner} />;

const Button: FC<{
  title: string;
  onPress: NonNullable<TouchableOpacityProps['onPress']>;
}> = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// For testing purposes
interface Props {
  onPressDismiss?: () => void;
  rtmpsUrl: string;
  streamKey: string;
  isMirrored: boolean;
  isMuted: boolean;
  aspectMode: CameraPreviewAspectMode;
  cameraPosition: CameraPosition;
  stateStatus: {
    stateStatus: StateStatusUnion;
    readyStatus: SessionReadyStatus;
  };
  metadata: {
    readonly broadcastQuality: BroadcastQuality | string;
    readonly networkHealth: NetworkHealth | string;
    readonly audioStats: {
      readonly rms: number;
      readonly peak: number;
    };
  };
  onPressPlayButtonHandler: () => void;
  onPressStopButtonHandler: () => void;
  onBroadcastErrorHandler: (error: IBroadcastSessionError) => void;
  onErrorHandler: (errorMessage: string) => void;
  onMediaServicesWereLostHandler: () => void;
  onMediaServicesWereResetHandler: () => void;
  onAudioSessionInterruptedHandler: () => void;
  onAudioSessionResumedHandler: () => void;
  onPressSwapCameraButtonHandler: () => void;
  onPressMuteButtonHandler: () => void;
  onPressMirrorButtonHandler: () => void;
  onPressAspectModeButtonHandler: (mode: CameraPreviewAspectMode) => void;
  onBroadcastAudioStatsHandler: (stats: IAudioStats) => void;
  onBroadcastStateChangedHandler: (status: StateStatusUnion) => void;
  onIsBroadcastReadyHandler: (isReady: boolean) => void;
  onTransmissionStatisticsChangedHandler: (
    transmissionStatistics: ITransmissionStatistics
  ) => void;
  videoConfig: IVideoConfig;
}

const BroadcastViewExample = React.forwardRef<IIVSBroadcastCameraView, Props>(
  (props, ref) => {
    const {
      onPressDismiss,
      rtmpsUrl,
      streamKey,
      isMirrored,
      isMuted,
      aspectMode,
      cameraPosition,
      stateStatus: { stateStatus, readyStatus },
      metadata: { audioStats, networkHealth, broadcastQuality },
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
      videoConfig,
    } = props;

    const isConnecting = stateStatus === 'CONNECTING';
    const isConnected = stateStatus === 'CONNECTED';
    const isDisconnected = stateStatus === 'DISCONNECTED';

    const isStartButtonVisible = React.useMemo(
      () => isDisconnected || stateStatus === 'INVALID',
      [isDisconnected, stateStatus]
    );

    return (
      <>
        <IVSBroadcastCameraView
          ref={ref}
          style={styles.cameraView}
          rtmpsUrl={rtmpsUrl}
          streamKey={streamKey}
          videoConfig={videoConfig}
          audioConfig={AUDIO_CONFIG}
          isMuted={isMuted}
          isCameraPreviewMirrored={isMirrored}
          cameraPosition={cameraPosition}
          cameraPreviewAspectMode={aspectMode}
          onError={onErrorHandler}
          onBroadcastError={onBroadcastErrorHandler}
          onIsBroadcastReady={onIsBroadcastReadyHandler}
          onBroadcastAudioStats={onBroadcastAudioStatsHandler}
          onBroadcastStateChanged={onBroadcastStateChangedHandler}
          onTransmissionStatisticsChanged={
            onTransmissionStatisticsChangedHandler
          }
          onMediaServicesWereLost={onMediaServicesWereLostHandler}
          onMediaServicesWereReset={onMediaServicesWereResetHandler}
          onAudioSessionInterrupted={onAudioSessionInterruptedHandler}
          onAudioSessionResumed={onAudioSessionResumedHandler}
          {...(__DEV__ && {
            logLevel: 'debug',
            sessionLogLevel: 'debug',
          })}
        />
        <Modal
          visible
          transparent
          animationType="fade"
          supportedOrientations={['landscape', 'portrait']}
        >
          <View style={styles.modalView}>
            {readyStatus === SessionReadyStatus.None ? (
              <Spinner />
            ) : (
              readyStatus === SessionReadyStatus.Ready && (
                <View
                  testID="primary-container"
                  style={styles.primaryContainer}
                >
                  <View style={styles.topContainer}>
                    <ScrollView
                      contentContainerStyle={styles.btnScrollViewContainer}
                      horizontal
                    >
                      <Button
                        title="Dismiss"
                        onPress={() => onPressDismiss?.()}
                      />
                      {isConnected && (
                        <Button
                          title="Stop"
                          onPress={onPressStopButtonHandler}
                        />
                      )}
                      {(['none', 'fill', 'fit'] as const).map((mode) => (
                        <Button
                          key={mode}
                          title={mode}
                          onPress={() => onPressAspectModeButtonHandler(mode)}
                        />
                      ))}
                      <Button
                        title="Swap"
                        onPress={onPressSwapCameraButtonHandler}
                      />
                      <Button
                        title={isMuted ? 'Unmute' : 'Mute'}
                        onPress={onPressMuteButtonHandler}
                      />
                      <Button
                        title="Toggle mirroring"
                        onPress={onPressMirrorButtonHandler}
                      />
                    </ScrollView>
                  </View>
                  <View style={styles.bottomContainer}>
                    <View style={styles.metaDataContainer}>
                      <Text
                        style={styles.metaDataText}
                      >{`Peak ${audioStats.peak?.toFixed(
                        2
                      )}, Rms: ${audioStats.rms?.toFixed(2)}`}</Text>
                      <Text
                        style={styles.metaDataText}
                      >{`Stream quality: ${broadcastQuality}`}</Text>
                      <Text
                        style={styles.metaDataText}
                      >{`Network health: ${networkHealth}`}</Text>
                    </View>
                    {(isStartButtonVisible || isConnecting) && (
                      <View style={styles.startBtnAndSpinnerContainer}>
                        {isStartButtonVisible && (
                          <Button
                            title="Start"
                            onPress={onPressPlayButtonHandler}
                          />
                        )}
                        {isConnecting && <Spinner />}
                      </View>
                    )}
                    {isConnected && <Text style={styles.liveText}>LIVE</Text>}
                  </View>
                </View>
              )
            )}
          </View>
        </Modal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  topContainer: {
    marginTop: 50,
  },
  btnScrollViewContainer: {
    // borderWidth: 1,
    // borderColor: 'white',
  },
  startBtnAndSpinnerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  button: {
    marginHorizontal: 8,
  },
  buttonText: {
    padding: 8,
    borderRadius: 8,
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    textTransform: 'capitalize',
  },
  metaDataContainer: {
    flex: 1,
  },
  metaDataText: {
    color: '#ffffff',
  },
  liveText: {
    color: '#ffffff',
    padding: 8,
    backgroundColor: '#FF5C5C',
    borderRadius: 8,
  },
  cameraView: {
    flex: 1,
    backgroundColor: '#000000',

    // borderWidth: 1,
    // borderColor: '#ffffff',
  },
  primaryContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  modalView: {
    flex: 1,
  },
});

export default BroadcastViewExample;
