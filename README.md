# react-native-amazon-ivs-stages

## Setup

Create a new project using [react-native-cli](https://github.com/react-native-community/cli)

```bash
npx react-native init AwesomeProject

cd AwesomeProject

npm install react-native-amazon-ivs-stages

bundle install

(cd ios && pod install)
```

Replace your `App.tsx` file content with the [example](https://github.com/esphung/react-native-amazon-ivs-stages/blob/main/example/src/App.tsx) code

```ts
import React from "react";
import { StyleSheet, View } from "react-native";
import { MultihostAppViewProxy } from "react-native-amazon-ivs-stages";

export default function App() {
  return (
    <View style={styles.container}>
      <MultihostAppViewProxy style={styles.nativeView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nativeView: {
    flex: 1,
  },
});
```

## iOS Setup

Replace `ios/AwesomeProject/Images.xcassets` contents with the contents of the RN library's [`Images.xcassets`](https://github.com/esphung/react-native-amazon-ivs-stages/tree/main/example/ios/AmazonIvsStagesExample/Images.xcassets)

#### Create a `AmazonIvsStages.plist` file in the ios workspace and add the resource to the `Copy Bundle Resources` build phase

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>apiUrl</key>
  <string>https://some-url.com/stuff</string>
</dict>
</plist>
```

#### Update the Info.plist permissions for camera and microphone

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

## Start 🚀

```bash
yarn start

# for iOS
yarn ios
```

## More Usage

### Event Listening

Add this to RN code

```ts
import { useRNEventSubscriptions } from 'react-native-amazon-ivs-stages';

// ...

const { startListening } = useRNEventSubscriptions((eventData) => {
  // do something with the event that fired in the native view
  console.debug({ eventData });
});

React.useEffect(() => {
  const removeListeners = startListening();
  return () => {
    removeListeners();
  };
}, []);

// ...
```

Add this to iOS Swift code

```swift
// MARK: - React Native Event Emitter
RNEventEmitter.shared?.sendEvent(withName: "onPress", body: [
    // can be ANY data you want to recieve in React Native
    "data": ["screen": "WelcomeView", "action": "getStarted"]
])
```
