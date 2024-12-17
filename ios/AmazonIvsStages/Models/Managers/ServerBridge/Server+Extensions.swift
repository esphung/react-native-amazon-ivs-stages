//
//  Server+Extensions.swift
//  Pods
//
//  Created by Eric Phung on 12/17/24.
//

// MARK: - React Native methods
extension Server {
    @objc(test:withB:withResolver:withRejecter:)
    func test(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
      resolve(a*b)
    }

    private func mapUserAttributes(userAttributes: UserAttributes) -> [String: Any?] {
      return [
        "username": userAttributes.username,
        "avatarUrl": userAttributes.avatarUrl
      ]
    }
  
    private func mapStages(stages: [StageDetails]) -> [[String: Any?]] {
      return stages.map({ (stage) -> [String: Any?] in
        return [
          "roomId": stage.roomId,
          "channelId": stage.channelId,
          "groupId": stage.groupId,
          "stageId": stage.stageId,
          "userAttributes": self.mapUserAttributes(userAttributes: stage.userAttributes)
        ]
      })
    }

    @objc(getAllStages:withRejecter:)
    func getAllStages(
      resolve: @escaping RCTPromiseResolveBlock,
      reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        getAllStages { success, stages, errorMessage in
            if let errorMessage = errorMessage {
                reject("getAllStages", errorMessage, nil)
                return
            }

            if let stages = stages {
              print("ℹ got all stages: \(stages)")
              let mappedStages = self.mapStages(stages: stages)
              resolve(["success": true, "stages": mappedStages])
            } else {
              reject("getAllStages", "No stages found", nil)
            }
        }
    }

    @objc(createStage:withResolver:withRejecter:)
    func createStage(
        _ inputValues: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        print("createStage inputValues: \(String(describing: inputValues))")

        // TODO: Don't create new user here
        // convert inputValues to User
        let user = User(
          userId: inputValues["userId"] as? String ?? "",
          username: inputValues["username"] as? String ?? "",
          avatarUrl: inputValues["avatarUrl"] as? String ?? "",
          isHost: inputValues["isHost"] as? Bool ?? true
        )

        print("ℹ Creating new stage for user: \(dump(user))")

        createStage(user: user) { success, errorMessage in
            if let errorMessage = errorMessage {
                reject("createStage", errorMessage, nil)
                return
            }

            if success {
                print("ℹ got host stage details: \(String(describing: self.stageHostDetails))")

                if let stageHostDetails = self.stageHostDetails {
                    print("ℹ got host stage details: \(String(describing: stageHostDetails))")
                    let mappedStageHostDetails = [
                        "groupId": stageHostDetails.groupId,
                        "stage": [
                            "id": stageHostDetails.stage.id,
                            "token": stageHostDetails.stage.token.token,
                            "participantId": stageHostDetails.stage.token.participantId,
                            "expirationTime": stageHostDetails.stage.token.expirationTime
                        ],
                        "channel": [
                            "id": stageHostDetails.channel.id,
                            "ingestEndpoint": stageHostDetails.channel.ingestEndpoint,
                            "playbackUrl": stageHostDetails.channel.playbackUrl,
                            "streamKey": stageHostDetails.channel.streamKey
                        ],
                        "chat": [
                            "id": stageHostDetails.chat.id,
                            "token": stageHostDetails.chat.token.token,
                            "sessionExpirationTime": stageHostDetails.chat.token.sessionExpirationTime,
                            "tokenExpirationTime": stageHostDetails.chat.token.tokenExpirationTime
                        ]
                    ]

                    print("ℹ Stage host details mapped: \(mappedStageHostDetails)")

                    resolve([
                        "success": true,
                        "stageHostDetails": mappedStageHostDetails
                    ])
                    return;

                  } else {
                    reject("createStage", "No stage host details found", nil)
                    return
                }
                
                resolve(["success": true])
            } else {
                reject("createStage", "Failed to create stage", nil)
            }
        }
    }

    @objc(deleteStage:withRejecter:)
    func deleteStage(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        deleteStage {
            resolve(["success": true])
        }
    }

    private func mapStageJoinDetails(data: StageJoinDetails) -> [String: Any?] {
      return [
        "stage": [
          "id": data.stage.id,
          "token": data.stage.token.token,
          "participantId": data.stage.token.participantId,
          "expirationTime": data.stage.token.expirationTime,
        ],
        "chat": [
          "id": data.chat.id,
          "token": data.chat.token.token,
          "sessionExpirationTime": data.chat.token.sessionExpirationTime,
          "tokenExpirationTime": data.chat.token.tokenExpirationTime,
        ]
      ]
    }

    @objc(joinStage:withResolver:withRejecter:)
    func joinStage(
        _ inputValues: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let rawUserData = inputValues["user"] as? [String: Any] else {
            reject("joinStage", "No user provided", nil)
            return
        }

        guard let groupId = inputValues["groupId"] as? String else {
            reject("joinStage", "No groupId provided", nil)
            return
        }

        // TODO: Don't create new user here
        let user = User(
            userId: rawUserData["userId"] as? String ?? "",
            username: rawUserData["username"] as? String ?? "",
            avatarUrl: rawUserData["avatarUrl"] as? String ?? "",
            isHost: rawUserData["isHost"] as? Bool ?? false
        )

        print("ℹ Joining stage for user: \(dump(user))")

        joinStage(user: user, groupId: groupId) { stageJoinDetails, errorMessage in
            if let errorMessage = errorMessage {
                reject("joinStage", errorMessage, nil)
                return
            }

            if let stageJoinDetails = stageJoinDetails {
                print("ℹ Stage join details: \(stageJoinDetails)")
                
                let mappedStageJoinDetails = self.mapStageJoinDetails(data: stageJoinDetails)

                print("ℹ Stage join details mapped: \(mappedStageJoinDetails)")
                
                resolve([
                    "success": true,
                    "stageJoinDetails": mappedStageJoinDetails
                ])
            } else {
                reject("joinStage", "Failed to join stage", nil)
            }
        }
    }

    @objc(disconnectSync:withB:withC:)
    func disconnectSync(_ participantId: String,
                    from groupId: String,
                    userId: String) {
        disconnect(participantId, from: groupId, userId: userId)
    }

}
