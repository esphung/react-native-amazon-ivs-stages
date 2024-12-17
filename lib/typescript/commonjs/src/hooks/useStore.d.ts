import React from 'react';
import type { IUser } from '../types/IUser';
import type { StageDetails } from '../types/StageDetails';
import type { StageHostDetails } from '../types/StageHostDetails';
import type { StageJoinDetails } from '../types/StageJoinDetails';
export declare const transformRTMPSUrl: (ingestEndpoint: string, streamKey: string) => string;
declare const useStore: () => {
    onPressGetStarted: () => void;
    onPressSignIn: ({ username, avatarUrl }: Pick<IUser, 'username' | 'avatarUrl'>) => void;
    currentUser: IUser | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
    stageDetailsState: {
        success: boolean;
        stages: StageDetails[];
        loading: boolean;
        selected: StageDetails | null;
    };
    onPressCreateNewStage: () => void;
    onPressJoinStage: () => void;
    refreshCurrentStageDetailsList: () => void;
    onSelectStageDetails: (stageDetails: StageDetails | null) => void;
    stageHostDetails: StageHostDetails | undefined;
    setStageHostDetails: React.Dispatch<React.SetStateAction<StageHostDetails | undefined>>;
    stageJoinDetails: StageJoinDetails | undefined;
    setStageJoinDetails: React.Dispatch<React.SetStateAction<StageJoinDetails | undefined>>;
    onJoinStage: () => void;
    onDisconnectSync: () => void;
    onClearAllState: () => void;
    onDeleteStage: () => void;
    createNewUser: (inputValues: {
        username: string;
        avatarUrl: string;
    }) => void;
    showStageList: () => void;
    isWelcomePresent: boolean;
    isSetupPresent: boolean;
    isStageListPresent: boolean;
    isStagePresent: boolean;
    isLoading: boolean;
};
export default useStore;
//# sourceMappingURL=useStore.d.ts.map