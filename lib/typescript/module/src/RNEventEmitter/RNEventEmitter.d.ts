declare function startListening(eventName: string, callback: (res: {
    data: {
        screen?: string;
        error?: string;
        state?: string;
    };
}) => void): () => void;
declare const _default: {
    startListening: typeof startListening;
};
export default _default;
//# sourceMappingURL=RNEventEmitter.d.ts.map