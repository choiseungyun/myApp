import {firebase} from '@react-native-firebase/messaging';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {Alert, Platform} from 'react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyCsGWjGUiFN-6YxTJnD1Y5NLIZQfPwkEh8',
  authDomain: 'weare-1203.firebaseapp.com',
  databaseURL: 'https://weare-1203.firebaseio.com',
  projectId: 'weare-1203',
  storageBucket: 'weare-1203.appspot.com',
  messagingSenderId: '612195951781',
  appId: '1:612195951781:web:d8ac8690171fb8e917194c',
};

//const app = initializeApp(firebaseConfig);

export async function getFCMToken(messaging: any) {
  let returnToken = '';
  // 이름관련 Warning 처리
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const authStatus = await messaging.requestPermission();
  //console.log('Authorization status:', authStatus);

  if (authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED) {
    //console.log('Authorization status OK...:', authStatus);

    //토큰을 받는 함수를 추가!
    await messaging
      .registerDeviceForRemoteMessages()
      .then(async () => await messaging.getToken())
      .then(function (tcmToken: string) {
        //console.log(Platform.OS.toString(), tcmToken.toString()); //토큰을 출력!
        returnToken = tcmToken;
      })
      .catch(function (err: any) {
        console.log('fcm에러 getToken: ', Platform.OS.toString(), err);
      });
  } else {
    console.log('requestPermission.', authStatus);
  }
  return returnToken;
}
