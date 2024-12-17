# react-native-amazon-ivs-stages

React Native bridge for multihost broadcasting on stages with Amazon IVS

## Usage

```ts
import {
  // Server methods
  getAllStages,
  createStage,
  deleteStage,
  joinStage,
  disconnectSync,
} from 'react-native-amazon-ivs-stages';

// ... Get all stages available
getAllStages().then((res) => {
  // some code here
});

// ... Create a new stage as host
createStage({
  userId: 'test-user-id',
  username: 'test-user',
  avatarUrl:
    'https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/bear.png',
}).then((res) => {
  // some code here
});

// ... Delete current hosted stage
deleteStage().then((res) => {
  // some code here
});

// ... Join a stage as participant
joinStage({
  user: {
    userId: 'test-user-id',
    username: 'test-user',
    avatarUrl:
      'https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/bear.png',
  },
  groupId: 'test-group-id',
}).then((res) => {
  // some code here
});

// ... Disconnect from participant from stage
disconnectSync('test-participant-id', 'test-group-id', 'test-user-id');
```

Show Native Amazon IVS Broadcast camera view

```ts
import { DemoApp } from 'react-native-amazon-ivs-stages';

// ... For testing POC

return <DemoApp />
```

## Integration

How to add this library to your React Native app

#### Notes

- Permissions MUST be granted for camera AND microphone before broadcast view is show

#### For iOS

##### Update your `Info.plist`

```plist
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
