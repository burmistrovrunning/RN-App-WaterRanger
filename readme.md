# WaterRanger

## Setup

### Pre-requisites
- React Native: `npm i -g react-native`

### Instructions
- Clone the repo
- Run `npm i`

### Running the APP

Develop on react-native requires to launch the "packager" whose basically a local server create a `bundle.js` send to the native app through HTTP.

You can the server on its own using the command `react-native start`. I found that useful to know when using Android Studio.

#### iOS
You can either directly execute `react-native run-ios`, or you can open Xcode with `open ios/WaterRangers.xcodeproj` and run the app the IDE.


#### Android
You can either use `react-native run-android`, or run the app through Android studio. If so, you'll need to run the "packager" yourself with the command `react-native start`.

Warning: since we use google maps (on android), you'll need to make sure your emulator (avd) or virtual machine (genymotion) needs to come with the Google App Services.

##### Android Debug

When experiencing issues on Android, I recommend using the command `adb logcat`. This will give insight on any JAVA errors.

We've noticed major problem with gradle having to bundle conflicting dependencies. It is particularly sensitive when using lots of React Native packages.

React-native-mapbox-gl library has critical issue on android.

You need to update below gradle file information.
  - node_modules/react-native-mapbox-gl/android/build.gradle

```
    compile('com.mapbox.mapboxsdk:mapbox-android-sdk:4.2.0-beta.3@aar') {
```
  - if you are using gradle build version 25.0, you need to update all react-native module's gradle version to 25.0.0

```
    node_modules/react-native-mapbox-gl/android/build.gradle
    node_modules/react-native-vector-icons/android/build.gradle
    node_modules/react-native-svg/android/build.gradle
    node_modules/react-native-image-picker/android/build.gradle
    node_modules/react-native-cookies/android/build.gradle
    ...
    {
        compileSdkVersion 23
        buildToolsVersion '25.0.0'
    }
    ...
```
### Style Guide

Current project support eslint and before every commit, eslint will check out source js files.
If there's errors on files in lint-rules, commit will be failed.

### Release Build

#### Release Building on iOS app
  - Select "Generic iOS Device" where you would select the simulator or your mobile.
  - In the menu, Produce / Archive. This should build the app, and if successful, open up an archive upload wizard.

#### Release Build on Android:
  - Compile JS: `./compile.sh;`
  - Build APK through Android Studio: Menu / Build / Generate Signed APK


### Usage

#### Navigator usage.
```
    All scenes have 2 props as below
    - navigator: navigator object.

      You should use push new scene into navigator using below function on any scene.
        this.props.navigator.push('SceneName');
        this.props.navigator.push({ name: 'SceneName', passProps: { props1, props2 }});

      You should pop up scene from navigator using below functions
        this.props.navigator.pop(),
        this.props.onBack()

    - resetScene(): this function will be use when you switch initialStacked Scenes.
        this.props.resetScene('LoginScene');
        this.props.resetScene('MapScene');
```