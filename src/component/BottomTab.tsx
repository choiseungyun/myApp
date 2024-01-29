import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {MD2Colors as Colors} from 'react-native-paper';
import HomeScreen from '../screen/HomeScreen';
import Calculator from '../screen/Calculator';
import Calendar from '../screen/Calendar';
import PushScreen from '../screen/PushScreen';

function BottomTab(props: any) {
  const [index, setIndex] = useState(0);
  const [goUrl, setGoUrl] = useState(props.reqUrl);
  const [messaging, setMessaging] = useState(props.messaging);
  const [routes] = useState([
    {key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home'},
    {key: 'calculator', title: 'Calculator', focusedIcon: 'calculator', unfocusedIcon: 'calculator'},
    {key: 'calendar', title: 'Calendar', focusedIcon: 'calendar', unfocusedIcon: 'calendar'},
    {key: 'push', title: 'Push', focusedIcon: 'laptop', unfocusedIcon: 'laptop'},
    {key: 'chat', title: 'Chat', focusedIcon: 'chat', unfocusedIcon: 'chat'},
  ]);

  const homeRoute = (props: any) => <HomeScreen {...props} url={goUrl} />;
  const pushRoute = (props: any) => <PushScreen {...props} messaging={messaging} />;
  const renderScene = BottomNavigation.SceneMap({
    home: homeRoute,
    calculator: Calculator,
    calendar: Calendar,
    push: pushRoute,
    chat: homeRoute,
  });

  function tabChange(index: number): void {
    setIndex(index);
    console.log(`index::: ${index}`);
    switch (index) {
      case 0:
        setGoUrl('https://blog.naver.com/symj2001');
        break;
      case 4:
        setGoUrl('https://www.naver.com');
        break;
      default:
        break;
    }
  }

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
