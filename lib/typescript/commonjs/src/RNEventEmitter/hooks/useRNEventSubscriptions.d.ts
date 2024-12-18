export type SubscribedEventEmittedFunc = ({ name, ...rest }: {
    name: string;
    [key: string]: any;
}) => void;
type SubscriptionRemoveFunc = () => void;
declare const useRNEventSubscriptions: (onSubscribedEventCallback?: SubscribedEventEmittedFunc) => {
    startListening: () => SubscriptionRemoveFunc;
};
export default useRNEventSubscriptions;
//# sourceMappingURL=useRNEventSubscriptions.d.ts.map