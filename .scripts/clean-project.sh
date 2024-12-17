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

# clean example project
rm -rf ./node_modules/
rm -rf ./ios/build/
rm -rf ./ios/DerivedData/
rm -rf ./Gemfile.lock
rm -rf ./yarn.lock
(cd android && rm -rf ./app/.cxx/)
yarn install
(cd ios && rm -rf ./Pods/ ./Podfile.lock)
(cd ios && RCT_NEW_ARCH_ENABLED=1 pod install --repo-update)
(cd android && ORG_GRADLE_PROJECT_newArchEnabled=true ./gradlew clean)
(cd android && ORG_GRADLE_PROJECT_newArchEnabled=true ./gradlew wrapper)
