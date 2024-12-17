"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStage = createStage;
exports.deleteStage = deleteStage;
exports.disconnectSync = disconnectSync;
exports.getAllStages = getAllStages;
exports.joinStage = joinStage;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-amazon-ivs-stages' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const Server = _reactNative.NativeModules.Server ? _reactNative.NativeModules.Server : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function getAllStages() {
  return Server.getAllStages();
}
function createStage(user) {
  return Server.createStage(user);
}
function deleteStage() {
  return Server.deleteStage();
}
function joinStage({
  user,
  groupId
}) {
  return Server.joinStage({
    user,
    groupId
  });
}
function disconnectSync(participantId, groupId, userId) {
  Server.disconnectSync(participantId, groupId, userId);
}
//# sourceMappingURL=Server.js.map