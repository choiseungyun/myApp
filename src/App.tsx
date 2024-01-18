/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// In App.js in a new project

import * as React from 'react';
import messaging from '@react-native-firebase/messaging';

import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import BottomTab from './component/BottomTab';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  // const firebaseMessaging = messaging();
  return (
    <PaperProvider>
      <BottomTab reqUrl="https://www.naver.com" style={{flex: 1}} />
    </PaperProvider>
  );
}
