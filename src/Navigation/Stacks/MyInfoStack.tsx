import { createSwitchNavigator } from 'react-navigation';
import MyInfoScreen from '~pages/MyInfoScreen';
import MySettingScreen from '../../Page/DetailScreens/MySettingScreen';

export default createSwitchNavigator(
  {
    // Bootstrap: {
    //   screen: MyBootstrapStack
    // },
    MyInfo: {
      screen: MyInfoScreen
    },
    MySetting: {
      screen: MySettingScreen
    }
    // Auth: {
    //   screen: AuthStack
    // }
  },
  {
    initialRouteName: 'MySetting'
  }
);
