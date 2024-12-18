// RNEventEmitter.swift
import Foundation

@objc(RNEventEmitter)
class RNEventEmitter: RCTEventEmitter {
  public static var shared: RNEventEmitter?
  var hasListeners = false
  override init() {
    super.init()
    RNEventEmitter.shared = self
  }
  
  override func startObserving() {
    super.startObserving()
    hasListeners = true
  }

  override func stopObserving() {
    super.stopObserving()
    hasListeners = false
  }

  override func sendEvent(withName name: String!, body: Any!) {
    if (hasListeners){
      super.sendEvent(withName: name, body: body)
      print("SEND EVENT \(String(describing: name)) \(String(describing: body))")
    }
  }

  override func supportedEvents() -> [String]! {
    return [
     "onPress",
     "broadcastSession",
     "getAllStages"
    ]
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

}