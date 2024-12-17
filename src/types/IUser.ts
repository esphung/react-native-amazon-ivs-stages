export interface IUser {
  userId: string;
  username: string;
  avatarUrl: string;
  isHost: boolean;
  participantId?: string;
  videoOn?: boolean;
  audioOn?: boolean;
}
