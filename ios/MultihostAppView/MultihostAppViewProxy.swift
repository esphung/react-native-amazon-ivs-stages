import SwiftUI

class MultihostAppViewProxy: UIView {
	var returningView: UIView?

	override init(frame: CGRect) {
		super.init(frame: frame)
		// let vc = UIHostingController(
		// 	rootView: WelcomeView(
        //   		isPresent: $isWelcomePresent,
        //   		isSetupPresent: $isSetupPresent
      	// ))
        let vc = UIHostingController(
			rootView: MultihostAppView())
		vc.view.frame = bounds
		self.addSubview(vc.view)
		self.returningView = vc.view
	}
	
	required init?(coder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	override func layoutSubviews() {
		super.layoutSubviews()
		self.returningView?.frame = bounds
	}

}
