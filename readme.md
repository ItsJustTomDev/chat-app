# React Native Chat App


# Description
This is a mobile app chat app created with react native, its both opimized for IOS & Adroid, you can share images, and your location!

# How to run this project?
### Pre-requisites to clone the project
Install [Expo](https://expo.dev/): 
```
npm install expo-cli -g
```

For Windows and Linux: Install [Android Studio](https://developer.android.com/studio).
For more information how to set up an emulator, look [here](https://docs.expo.dev/workflow/android-studio-emulator/?redirected)

For Mac: Install [XCode](https://developer.apple.com/xcode/)

Install the Expo app on your mobile device (available in Google Play Store and Apple Store)

### Getting started

* install all the dependencies: ```npm i```

* start the app: ```expo start``` or ```npm start```

* Launch app on smartphone: scan QR code in Expo GUI

* Launch app on emulator: Press "Run on Android device/emulator" or "Run on iOS emulator" or "run in web browser" in Expo GUI

### Install and connect to own database
In order to use this chat app, you have to create your own Google Firebase/Firestore account for data storage.
In the following section, I describe the necessary steps to connect the chat to your database. If you get stuck, please refer to the [Firebase documentation](https://firebase.google.com/docs/web/setup)

1. Sign into https://firebase.google.com/ to get started

2. Click on "create a project" and follow the steps (does not matter if you agree to Google analytics or not). When you create the database, choose to start in test mode, because then you don't have to specify any security rules yet. Arrived at the last step ("Start a collection") click on "Auto-ID" to generate a random Document ID.
3. Install Firestore via Firebase in your project: ```npm install firebase```
4. Go into the directory firebase and edit the firebase-config.ts file.
5. Back in the Firebase project in the browser, open up "Settings", then "General" tab. Under the section "Your apps" you can link Firebase to your app by clicking the tag icon.
6. After connecting you can generate configurations for different platforms. Here, click "Firestore for Web" and then copy the contents of the config object info your config/firebaseConfig.dist.js file. Also make sure to initialize the App by adding ```import firebase from firebase``` at the top of the file firebase.js and initialize the app there like so: ```const firebaseApp = initializeApp(firebaseConfig)```

### Pay attention
I adjusted the firebase storage rules 
```
rules_version = '2';
service firebase.storage {
    match /b/{bucket}/o {
            match /{allPaths=**} {
            allow read, write: if true;
            }
        }
}
```

