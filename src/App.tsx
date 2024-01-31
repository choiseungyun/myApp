/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// In App.js in a new project

import React, {createContext, useContext, useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/messaging';

import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import BottomTab from './component/BottomTab';
import {Alert} from 'react-native';
import {getMessaging} from 'firebase/messaging';

export const PushContext = createContext({
  displayUrl: 'https://www.naver.com',
  fcmMessage: 'No Message',
  changeUrl: (url: string) => {},
  changeMessage: (message: string) => {},
});

function App() {
  const [displayUrl, setDisplayUrl] = useState('');
  const [fcmMessage, setFcmMessage] = useState('No Message');

  const changeUrl = (url: string) => {
    console.log('Call changeUrl Function');
    setDisplayUrl(url);
    console.log(`url::: ${url}`);
  };

  const changeMessage = (message: string) => {
    console.log('Call changeMessage Function');
    setFcmMessage(message);
    console.log(`message::: ${message}`);
  };

  useEffect(() => {
    firebase.messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      //console.log(remoteMessage.token); // 앱의 기기 토큰
      console.log('remoteMessage.data ', remoteMessage.data); // 푸시 메시지의 데이터
      console.log('remoteMessage.notification ', remoteMessage.notification); // 푸시 알림의 정보
      console.log('remoteMessage.messageId ', remoteMessage.messageId); // 푸시 메시지의 고유 ID
      console.log('remoteMessage.from ', remoteMessage.from); // 푸시 메시지를 보낸 앱의 ID
      console.log('remoteMessage.collapseKey ', remoteMessage.collapseKey); // 푸시 메시지를 그룹핑하기 위한 키
      console.log('remoteMessage.sentTime ', remoteMessage.sentTime); // 푸시 메시지가 전송된 시간

      const title = remoteMessage.notification.title;
      const body = remoteMessage.notification.body;
      const sound = remoteMessage.notification.sound;
      const image = remoteMessage.notification.image;

      changeMessage(body);
      console.log('remoteMessage.notification.title', title); // "새로운 알림"
      console.log('remoteMessage.notification.body', body); // "오늘 날씨가 맑습니다."
      console.log('remoteMessage.notification.sound', sound); // "default"
      console.log('remoteMessage.notification.image', image); // "https://example.com/image.png"
    });
  }, []);

  return (
    <PushContext.Provider value={{displayUrl, fcmMessage, changeUrl, changeMessage}}>
      <PaperProvider>
        <BottomTab />
      </PaperProvider>
    </PushContext.Provider>
  );
}

export default App;
