import React, {createContext, useContext, useEffect, useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {MD2Colors as Colors} from 'react-native-paper';
import HomeScreen from '../screen/HomeScreen';
import Calculator from '../screen/Calculator';
import Calendar from '../screen/Calendar';
import PushScreen from '../screen/PushScreen';
import {PushContext} from '../App';

function BottomTab(props: any) {
  const [index, setIndex] = useState(0);
  const {changeUrl} = useContext(PushContext);

  const [routes] = useState([
    {key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home'},
    {key: 'calculator', title: 'Calculator', focusedIcon: 'calculator', unfocusedIcon: 'calculator'},
    {key: 'calendar', title: 'Calendar', focusedIcon: 'calendar', unfocusedIcon: 'calendar'},
    {key: 'push', title: 'Push', focusedIcon: 'laptop', unfocusedIcon: 'laptop'},
    {key: 'chat', title: 'Chat', focusedIcon: 'chat', unfocusedIcon: 'chat'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    calculator: Calculator,
    calendar: Calendar,
    push: PushScreen,
    chat: HomeScreen,
  });

  function tabChange(index: number): void {
    setIndex(index);
    console.log(`index::: ${index}`);

    switch (index) {
      case 0:
        changeUrl('https://www.daum.net');
        break;
      case 3:
        break;
      case 4:
        changeUrl('https://www.google.com');
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    //
  }, []);

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={tabChange}
      renderScene={renderScene}
      inactiveColor="white"
      sceneAnimationEnabled={true}
      sceneAnimationType="shifting"
      safeAreaInsets={{bottom: 5}}
      barStyle={{
        //height: 80,
        backgroundColor: Colors.blue200,
        justifyContent: 'center',
        //flex: 0.1,
      }}
    />
  );
}

export default BottomTab;
