import React from 'react';
import RNEventEmitter from '../RNEventEmitter';

export type SubscribedEventEmittedFunc = ({
  name,
  ...rest
}: {
  name: string;
  [key: string]: any;
}) => void;

type SubscriptionRemoveFunc = () => void;

enum EventTag {
  onPress = 'onPress',
  broadcastSession = 'broadcastSession',
  getAllStages = 'getAllStages',
}

const subscriptionFactory: (
  name: EventTag,
  callback?: SubscribedEventEmittedFunc
) => SubscriptionRemoveFunc = (name, callback) => {
  return RNEventEmitter.startListening(name, (res) => {
    callback?.({ ...res.data, name });
  });
};

const useRNEventSubscriptions = (
  onSubscribedEventCallback?: SubscribedEventEmittedFunc
) => {
  const startListening: () => SubscriptionRemoveFunc = React.useCallback(() => {
    const subs: SubscriptionRemoveFunc[] = [];
    subs.push(subscriptionFactory(EventTag.onPress, onSubscribedEventCallback));
    subs.push(
      subscriptionFactory(EventTag.broadcastSession, onSubscribedEventCallback)
    );
    subs.push(
      subscriptionFactory(EventTag.getAllStages, onSubscribedEventCallback)
    );
    return () => {
      if (!subs.length) {
        return;
      }
      subs.forEach((unsub) => {
        unsub();
      });
      subs.length = 0;
    };
  }, [onSubscribedEventCallback]);

  return {
    startListening,
  };
};

export default useRNEventSubscriptions;
