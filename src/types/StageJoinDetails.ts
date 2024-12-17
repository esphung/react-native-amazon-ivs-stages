export interface StageJoinDetails {
  stage: {
    id: string;
    token: string;
    participantId: string;
    expirationTime: string;
  };
  chat: {
    id: string;
    token: string;
    sessionExpirationTime: string;
    tokenExpirationTime: string;
  };
}
