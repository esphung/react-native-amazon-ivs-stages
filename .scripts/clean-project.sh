cd example/
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-map-*
watchman watch-del-all
yarn cache clean
rm -rf ./dist/*
rm -rf ./node_modules/
rm -rf ./ios/build/
rm -rf ./ios/DerivedData/
rm -rf ./Gemfile.lock
rm -rf ./yarn.lock
yarn install
(cd ios && rm -rf ./Pods/ ./Podfile.lock && pod install --repo-update)
(cd android && ./gradlew clean)
