export interface StageHostDetails {
    groupId: string;
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
    channel: {
        id: string;
        ingestEndpoint: string;
        playbackUrl: string;
        streamKey: string;
    };
}
//# sourceMappingURL=StageHostDetails.d.ts.map