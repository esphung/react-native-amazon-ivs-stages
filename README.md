# react-native-amazon-ivs-stages

[![Version](https://img.shields.io/badge/version-0.0.4-blue.svg)](https://github.com/ThryvLabs/CommandCenterMobile/releases)

React Native bridge for multihost broadcasting on stages with Amazon IVS

## Usage

To bubble events taking place in the native views simply add an event listener after the action

```swift
// ... in some button action or completion block code

// MARK: - Send event to React Native from native iOS
RNEventEmitter.shared?.sendEvent(withName: "onBtnPress", body: [
    "data": [
        "screen": "HomeScreen",
        "action": "signUp"
        "value": ["username": "foo", "password": "bar"]
    ]
])
```

In RN use the `useRNEventSubscriptions` hook anywhere the events need to be subscribed

```ts
// define a handler to take action on event updates
const onSubscribedEventEmitted: SubscribedEventEmittedFunc = React.useCallback(
  (event) => {
    // do something with the event data here
  },
  []
);

// start listening after passing the handler into the hook on initialization
const { startListening } = useRNEventSubscriptions(onSubscribedEventEmitted);

// cleanup the listeners by invoking the returned function from `startListening`
React.useEffect(() => {
  const removeListeners = startListening();
  return () => {
    removeListeners();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

## Integration

How to add this library to your React Native app

#### Notes

- Permissions MUST be granted for camera AND microphone before broadcast view is shown

#### For iOS

Drag the `Assets.xcassets` contents from the iOS SDK demo (or the example app located in this repo) to your Xcode project. Without them there will be no colors or graphics

Create a `./ios/AmazonIvsStages.plist` file and add your api url

```plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>apiUrl</key>
  <string>https://some-url.com/stuff</string>
</dict>
</plist>
```

After you've created the file:

- Click your project
- Click your target
- Select Build Phases
- Expand Copy Bundle Resources
- Click '+' and select your file.

#### For Android

Create a file called `./android/app/src/main/res/values/strings.xml` and add the value for the api url to it

```xml
<resources>
    <string name="app_name">AmazonIvsStagesExample</string>
    <string name="apiUrl">https://some-url.com/stuff</string>
</resources>
```

##### Update your `./ios/<YOUR_APP_NAME_FOLDER>/Info.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<!-- Previous Info.plist values -->
	<key>NSCameraUsageDescription</key>
	<string>Camera is required for video streaming</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>Microphone is required for video streaming</string>
</dict>
</plist>
```

## Setup

How to setup the library for development

```sh
rvm install "ruby-3.3.4"
nvm install 20.18.0
rvm use
nvm use
yarn example:bundle:install
```

## Installation

```sh
yarn example:install
```

#### For iOS

```sh
yarn example:ios:pod
```

#### For Android

```sh
yarn example:android:wrapper
```

## Run

```sh
yarn example:start
```

#### For iOS

```sh
# open the example workspace in xcode and run the project
yarn example:ios:workspace
```

#### For Android

```sh

```

## Deploy

```sh
# package the library and validate types and lint
yarn precommit

# from clean branch
git checkout -b release/vX.X.X
git push
yarn release
```
