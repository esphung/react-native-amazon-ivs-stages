import React from 'react';
import { type BroadcastQuality, type CameraPosition, type CameraPreviewAspectMode, type IAudioStats, type IBroadcastSessionError, type IIVSBroadcastCameraView, type ITransmissionStatistics, type NetworkHealth, type StateStatusUnion } from 'react-native-amazon-ivs-stages';
import { SessionReadyStatus } from '../enums/SessionReadyStatus';
import type { IVideoConfig } from '../IVSBroadcastCameraView/IVSBroadcastCameraView.types';
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
    onTransmissionStatisticsChangedHandler: (transmissionStatistics: ITransmissionStatistics) => void;
    videoConfig: IVideoConfig;
}
declare const BroadcastViewExample: React.ForwardRefExoticComponent<Props & React.RefAttributes<IIVSBroadcastCameraView>>;
export default BroadcastViewExample;
//# sourceMappingURL=BroadcastViewExample.d.ts.map