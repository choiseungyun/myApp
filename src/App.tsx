/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// In App.js in a new project

import React, {useEffect, useState} from 'react';
import messaging, {FirebaseMessagingTypes, firebase} from '@react-native-firebase/messaging';

import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import BottomTab from './component/BottomTab';
import {firebaseConfig, getFCMToken} from './utils/fcmUtil';
import {Alert} from 'react-native';
import {initializeApp} from 'firebase/app';

export default function App(props: any) {
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const [fcmToken, setFcmToken] = useState('');
  const messaging = firebase.messaging();

  const fcsInfo = {
    firebaseApp: firebaseApp,
    remoteMessage: 'okokgo',
    fcmToken: fcmToken,
  };

  const [fcmMessage, setFcmMessage] = useState(fcsInfo);

  getFCMToken(messaging).then((token: string) => {
    setFcmToken(token);

    //토큰이 발행된 경우에만 처리...
    //Background Message 처리
    // Background, Quit 상태일 경우
    messaging.setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      fcsInfo.remoteMessage = JSON.stringify(remoteMessage);
      setFcmMessage(fcsInfo);
    });
  });

  // Foreground 상태인 경우
  useEffect(() => {
    const unsubscribe = messaging.onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    console.log('FCM Token ::: ', fcmToken);

    return unsubscribe;
  }, [fcmToken]);

  return (
    <PaperProvider>
      <BottomTab {...props} reqUrl="https://blog.naver.com/rfs2006" messaging={fcmMessage} style={{flex: 1}} />
    </PaperProvider>
  );
}
