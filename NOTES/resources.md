# Resorces

- App is using `Expo` not `react native cli`
  - restricted packages

Install packages using `npx expo install [PACKAGE]`

## Links

- ~~https://blog.logrocket.com/how-to-access-file-systems-react-native/~~
- https://docs.expo.dev/versions/latest/sdk/imagepicker/
- https://docs.expo.dev/versions/latest/sdk/filesystem/
  - https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemuploadasyncurl-fileuri-options
  - https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemreadasstringasyncfileuri-options
- https://docs.expo.dev/versions/latest/sdk/media-library/
  - https://docs.expo.dev/versions/latest/sdk/media-library/#medialibrarygetassetsasyncassetsoptions

- https://birdie0.github.io/discord-webhooks-guide/index.html

## IOS Build
- https://stackoverflow.com/questions/42110496/how-to-build-ipa-application-for-react-native-ios
- **https://stackoverflow.com/questions/75735944/how-to-build-react-native-ios-app-for-internal-distribution-without-using-expo-d**
  - **https://docs.expo.dev/build-reference/local-builds/**
- https://www.reddit.com/r/expo/comments/zxij9t/can_i_install_expo_app_on_iphone_without/

IOS Upload
https://www.youtube.com/watch?v=79WtnkL_XsM
- make custom image server 
- no imgbb

## IOS FileSystem
- https://github.com/react-native-cameraroll/react-native-cameraroll/issues/218
- https://github.com/expo/expo/issues/4995
- https://github.com/expo/expo/pull/5195
- https://stackoverflow.com/questions/58366727/how-to-read-files-starting-with-ph-as-base64-string-with-react-native

1. Create new asset (???)
    - create new file in document dir `await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "file.jpg", ...)`
      - https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemmakedirectoryasyncfileuri-options
    - create asset `const asset = await MediaLibrary.createAssetAsync(FileSystem.documentDirectory + "file.jpg")`
2. copy to file using `copyAsync` (https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemcopyasyncoptions)

Use `getAssetInfoAsync` for `localUri`?? (https://stackoverflow.com/questions/71278186/react-native-expo-how-to-get-local-uri-to-users-media-library-from-image-pick)

## Control panel
- Use deno.land to host a websocket server
- use another deno project to host the control panel
- use websockets to send json data
  - phones send connection message to server tagged with "phone"
  - control panels send connection message to server tagged with "control"
  - phone connection and other data will be sent to the websocket server
    - the websocket server will then send that data to all control panels