"use strict";

export let Command = /*#__PURE__*/function (Command) {
  Command["Start"] = "START";
  Command["Stop"] = "STOP";
  Command["SwapCamera"] = "SWAP_CAMERA";
  return Command;
}({});
export let StateStatusEnum = /*#__PURE__*/function (StateStatusEnum) {
  StateStatusEnum[StateStatusEnum["INVALID"] = 0] = "INVALID";
  StateStatusEnum[StateStatusEnum["DISCONNECTED"] = 1] = "DISCONNECTED";
  StateStatusEnum[StateStatusEnum["CONNECTING"] = 2] = "CONNECTING";
  StateStatusEnum[StateStatusEnum["CONNECTED"] = 3] = "CONNECTED";
  StateStatusEnum[StateStatusEnum["ERROR"] = 4] = "ERROR";
  return StateStatusEnum;
}({});
export let NetworkHealthEnum = /*#__PURE__*/function (NetworkHealthEnum) {
  NetworkHealthEnum[NetworkHealthEnum["EXCELLENT"] = 0] = "EXCELLENT";
  NetworkHealthEnum[NetworkHealthEnum["HIGH"] = 1] = "HIGH";
  NetworkHealthEnum[NetworkHealthEnum["MEDIUM"] = 2] = "MEDIUM";
  NetworkHealthEnum[NetworkHealthEnum["LOW"] = 3] = "LOW";
  NetworkHealthEnum[NetworkHealthEnum["BAD"] = 4] = "BAD";
  return NetworkHealthEnum;
}({});
export let BroadcastQualityEnum = /*#__PURE__*/function (BroadcastQualityEnum) {
  BroadcastQualityEnum[BroadcastQualityEnum["NEAR_MAXIMUM"] = 0] = "NEAR_MAXIMUM";
  BroadcastQualityEnum[BroadcastQualityEnum["HIGH"] = 1] = "HIGH";
  BroadcastQualityEnum[BroadcastQualityEnum["MEDIUM"] = 2] = "MEDIUM";
  BroadcastQualityEnum[BroadcastQualityEnum["LOW"] = 3] = "LOW";
  BroadcastQualityEnum[BroadcastQualityEnum["NEAR_MINIMUM"] = 4] = "NEAR_MINIMUM";
  return BroadcastQualityEnum;
}({});
//# sourceMappingURL=IVSBroadcastCameraView.types.js.map