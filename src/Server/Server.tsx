import { NativeModules, Platform } from 'react-native';
import type { IUser } from '../types/IUser';
import type { StageDetails } from '../types/StageDetails';
import type { StageHostDetails } from '../types/StageHostDetails';
import type { StageJoinDetails } from '../types/StageJoinDetails';

const LINKING_ERROR =
  `The package 'react-native-amazon-ivs-stages' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Server = NativeModules.Server
  ? NativeModules.Server
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function getAllStages(): Promise<{
  success: boolean;
  stages: StageDetails[];
}> {
  return Server.getAllStages();
}

export function createStage(user: IUser): Promise<{
  success: boolean;
  stageHostDetails: StageHostDetails;
}> {
  return Server.createStage(user);
}

export function deleteStage(): Promise<{
  success: boolean;
}> {
  return Server.deleteStage();
}

export function joinStage({
  user,
  groupId,
}: {
  user: IUser;
  groupId: string;
}): Promise<{
  success: boolean;
  stageJoinDetails: StageJoinDetails;
}> {
  return Server.joinStage({ user, groupId });
}

export function disconnectSync(
  participantId: string,
  groupId: string,
  userId: string
) {
  Server.disconnectSync(participantId, groupId, userId);
}
