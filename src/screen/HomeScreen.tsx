import * as React from 'react';
import {Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

function HomeScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <IconButton
        icon="camera"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export default HomeScreen;
