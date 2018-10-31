// import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import AuthLRScreen from '~pages/AuthScreens/AuthLRScreen';
import ForgetPasswordScreen from '~pages/AuthScreens/ForgetPasswordScreen';
// import LoginScreen from '~pages/LoginScreen';
// import RegisterScreen from '~pages/RegisterScreen';
// import { headerTitleStyle } from '~utils';
// import HeaderLeft from '~components/HeaderLeft';

export default createStackNavigator(
  {
    Login: {
      screen: AuthLRScreen
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen
    }
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      header: null
    },
    cardStyle: {
      backgroundColor: '#fff'
    }
  }
);
