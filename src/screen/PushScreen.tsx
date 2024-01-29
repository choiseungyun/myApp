import {useEffect, useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import {IconButton, MD3Colors} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import messaging, {FirebaseMessagingTypes, firebase} from '@react-native-firebase/messaging';
import {initializeApp} from 'firebase/app';
import {firebaseConfig, getFCMToken} from '../utils/fcmUtil';
import {getMessaging, getToken} from 'firebase/messaging';

function PushScreen(props: any) {
  const [fcmMessage, setFcmMessage] = useState(props.messaging);

  useEffect(() => {
    // Send a message to the device corresponding to the provided
  }, [fcmMessage]);

  const onPressButton = () => {
    Alert.alert('press');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconButton icon="camera" iconColor={MD3Colors.error50} size={20} onPress={() => onPressButton()} />

        <Text>{fcmMessage.remoteMessage}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default PushScreen;
