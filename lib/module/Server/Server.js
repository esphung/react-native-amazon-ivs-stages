"use strict";

import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-amazon-ivs-stages' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const Server = NativeModules.Server ? NativeModules.Server : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export function getAllStages() {
  return Server.getAllStages();
}
export function createStage(user) {
  return Server.createStage(user);
}
export function deleteStage() {
  return Server.deleteStage();
}
export function joinStage({
  user,
  groupId
}) {
  return Server.joinStage({
    user,
    groupId
  });
}
export function disconnectSync(participantId, groupId, userId) {
  Server.disconnectSync(participantId, groupId, userId);
}
//# sourceMappingURL=Server.js.map