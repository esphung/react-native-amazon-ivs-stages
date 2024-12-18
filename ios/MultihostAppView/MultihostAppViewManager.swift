import UIKit

@objc(MultihostAppViewManager)
class MultihostAppViewManager: RCTViewManager {
	override func view() -> MultihostAppViewProxy? {
		return MultihostAppViewProxy()
	}
	override class func requiresMainQueueSetup() -> Bool {
		return true
	}
}
