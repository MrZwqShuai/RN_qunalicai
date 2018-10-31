import { createStackNavigator } from 'react-navigation';
import UserCenter from '~pages/DetailScreens/UserCenterScreen';
import ModifyNickNameScreen from '~pages/DetailScreens/ModifyNickNameScreen';

export default createStackNavigator(
  {
    UserCenter: {
      screen: UserCenter,
      navigationOptions: {
        title: '个人中心'
      }
    },
    ModifyNickNameScreen: {
      screen: ModifyNickNameScreen,
      navigationOptions: {
        title: '修改昵称'
      }
    }
  },
  {
    initialRouteName: 'UserCenter',
    navigationOptions: {
      header: null
    }
  }
);
