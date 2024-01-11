import {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {MD2Colors as Colors} from 'react-native-paper';
import HomeScreen from '../screen/HomeScreen';
import DetailsScreen from '../screen/DetailScreen';
import Calculator from '../screen/Calculator';

const BottomTab = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home',
    },
    {
      key: 'calculator',
      title: 'Calculator',
      focusedIcon: 'calculator',
      unfocusedIcon: 'calculator',
    },
    {
      key: 'blog',
      title: 'Blog',
      focusedIcon: 'package',
      unfocusedIcon: 'package',
    },
    {
      key: 'api',
      title: 'API',
      focusedIcon: 'database',
      unfocusedIcon: 'database',
    },
    {
      key: 'chat',
      title: 'Chat',
      focusedIcon: 'chat',
      unfocusedIcon: 'chat',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    calculator: Calculator,
    blog: DetailsScreen,
    api: DetailsScreen,
    chat: DetailsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        height: 80,
        backgroundColor: Colors.blue200,
        justifyContent: 'center',
      }}
    />
  );
};

export default BottomTab;
