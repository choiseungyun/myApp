/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// In App.js in a new project

import * as React from 'react';

import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import BottomTab from './component/BottomTab';
import {Calculate} from '@mui/icons-material';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  return (
    <PaperProvider>
      <BottomTab />
    </PaperProvider>
  );
}
