import type { IUser } from '../types/IUser';
import type { StageDetails } from '../types/StageDetails';
import type { StageHostDetails } from '../types/StageHostDetails';
import type { StageJoinDetails } from '../types/StageJoinDetails';
export declare function getAllStages(): Promise<{
    success: boolean;
    stages: StageDetails[];
}>;
export declare function createStage(user: IUser): Promise<{
    success: boolean;
    stageHostDetails: StageHostDetails;
}>;
export declare function deleteStage(): Promise<{
    success: boolean;
}>;
export declare function joinStage({ user, groupId, }: {
    user: IUser;
    groupId: string;
}): Promise<{
    success: boolean;
    stageJoinDetails: StageJoinDetails;
}>;
export declare function disconnectSync(participantId: string, groupId: string, userId: string): void;
//# sourceMappingURL=Server.d.ts.map