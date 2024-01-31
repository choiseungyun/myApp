/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {firebase} from '@react-native-firebase/messaging';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './src/utils/fcmUtil';

/* Push Message 설정 */
initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Register background handler
messaging.setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

//KillState
messaging.getInitialNotification(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// messaging.onMessage(async remoteMessage => {
//   console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
// });

/* Push Message 설정 */

AppRegistry.registerComponent(appName, () => App);
