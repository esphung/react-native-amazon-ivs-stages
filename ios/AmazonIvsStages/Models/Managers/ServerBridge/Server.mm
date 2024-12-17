#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Server, NSObject)

RCT_EXTERN_METHOD(test:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getAllStages:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createStage:(NSDictionary *)inputValues
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(deleteStage:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(joinStage:(NSDictionary *)inputValues
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(disconnectSync:(NSString)participantId
                    withB:(NSString)groupId
                    withC:(NSString)userId)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
