import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { SignScreen }from '~pages/SignScreen';
import { SignTotalGainListScreen }from '~pages/SignTotalGainListScreen';
import HeaderLeft from '~components/HeaderLeft';
import { headerTitleStyle } from '~utils'

export default createStackNavigator ({
  Sign: {
    screen: SignScreen,
    navigationOptions: {
      title: '签到领红包',
      headerTitleStyle: headerTitleStyle({left: -56})
    }
  },
  SignTotalGainList: {
    screen: SignTotalGainListScreen,
    navigationOptions: {
      title: '累计奖励',
      headerTitleStyle: headerTitleStyle({left: -56})
    }
  },
 
},{
  initialRouteName: 'Sign',
  navigationOptions: {
    headerLeft: <HeaderLeft />
  },
  cardStyle: {
    backgroundColor: '#fff'
  }
})