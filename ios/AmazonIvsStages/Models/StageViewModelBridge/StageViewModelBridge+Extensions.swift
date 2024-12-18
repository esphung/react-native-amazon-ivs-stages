//
//  Server+Extensions.swift
//  Pods
//
//  Created by Eric Phung on 12/17/24.
//

// MARK: - React Native methods
extension StageViewModel {
    @objc(dataForParticipant:)
    func dataForParticipant(_ participantId: String) -> [String: Any] {
      guard let data = dataForParticipant(participantId) else {
        return ["success": false]
      }
      return [
        "success": data.participantId?.isEmpty != false ? true : false,
        "data": [
          "participantId": data.participantId ?? "",
          "avatarUrl": data.avatarUrl,
          "username": data.username,
          "isHost": data.isHost,
          "wantsSubscribed": data.wantsSubscribed,
          "wantsBroadcast": data.wantsBroadcast,
          "broadcastSlotName": data.broadcastSlotName
        ]
      ]
    }

    @objc(toggleBroadcasting:)
    func toggleBroadcasting(forParticipant: String) -> [String: Any] {
      toggleBroadcasting(forParticipant: forParticipant)
    }

    @objc(kickParticipant:)
    func kickParticipant(_ participantId: String) -> [String: Any] {
      kickParticipant(participantId)
    }

}
