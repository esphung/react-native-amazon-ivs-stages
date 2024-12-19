# react-native-amazon-ivs-stages

[![Version](https://img.shields.io/badge/version-0.0.4-blue.svg)](https://github.com/esphung/react-native-amazon-ivs-stages/releases)

React Native bridge for multihost broadcasting on stages with Amazon IVS

## Usage

Listening to events from native

#### For iOS

```swift
import SwiftUI

struct WelcomeView: View {
    @EnvironmentObject var services: ServicesManager
    @Binding var isPresent: Bool
    @Binding var isSetupPresent: Bool

    var body: some View {
        ZStack(alignment: .top) {
            Color("Background")
                .edgesIgnoringSafeArea(.all)
            VStack(alignment: .center) {

                Spacer()

                Image("welcomeImage")
                    .resizable()
                    .frame(width: 82, height: 152)

                Spacer()

                Text("Amazon IVS Stages Demo")
                    .modifier(Title())

                Text("This demo app demonstrates how to use Amazon IVS Stages to broadcast a video call.")
                    .modifier(Description())

                Spacer()

                Button(action: {
                    isPresent.toggle()
                    isSetupPresent.toggle()

                    // MARK: - React Native Event Emitter
                    RNEventEmitter.shared?.sendEvent(withName: "onPress", body: [
                      // can be ANY data you want to recieve in React Native
                      "data": ["screen": "WelcomeView", "action": "getStarted"]
                    ])
                }) {
                    Text("Get Started")
                        .modifier(PrimaryButton())
                }
                .padding(.horizontal, 8)

                Link("View Source Code", destination: URL(string: Constants.sourceCodeUrl)!)
                    .modifier(SecondaryButton())
            }
        }
    }
}
```

#### For React Native

```ts
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  MultihostAppViewProxy,
  useRNEventSubscriptions,
  type SubscribedEventEmittedFunc,
} from 'react-native-amazon-ivs-stages';

export default function App() {
  const onNativeEventHandler: SubscribedEventEmittedFunc =
    React.useCallback((eventData) => {
      // do something with the event that fired in the native view
      console.debug({ eventData });
    }, []);

  const { startListening } = useRNEventSubscriptions(onNativeEventHandler);

  React.useEffect(() => {
    const removeListeners = startListening();
    return () => {
      removeListeners();
    };
  }, []);

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
  }
});

```

## Integration

#### For iOS

Add Resources

> Drag the `Assets.xcassets` contents from the iOS SDK demo (or the example app located in this repo) to your Xcode project. Without them there will be no colors or graphics

Add Permissions

> Update your `./ios/<YOUR_APP_NAME_FOLDER>/Info.plist`

> Permissions MUST be requested and granted for camera AND microphone as soon as possible

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

Add API_URL (needed for https requests to Amazon IVS services)

> Create a `./ios/AmazonIvsStages.plist` file and add your api url

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

> After you've created the file open the ios project workspace:

- Click on your project
- Click on your target
- Select Build Phases tab
- Expand Copy Bundle Resources list item
- Click '+' and select your newly created file (`AmazonIvsStages.plist`)

#### For Android

Create the file `./android/app/src/main/res/values/strings.xml` if it DNE and add the value for your api url to it

```
<resources>
    <string name="app_name">AmazonIvsStagesExample</string>
    <string name="apiUrl">https://some-url.com/stuff</string>
</resources>
```

## Setup

Setup the library for development

```sh
rvm install "ruby-3.3.4"
nvm install 20.18.0
rvm use
nvm use
```

## Installation

```sh
yarn example:bundle:install
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

## Deploy

```sh
# package the library and validate types and lint
yarn precommit

# from clean branch
git checkout -b release/vX.X.X
git push
yarn release
```
