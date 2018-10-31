import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import MyDebtScreen from '../../Page/MyDebt/index';

export default createStackNavigator({
  MyDebt: {
    screen: MyDebtScreen,
    navigationOptions: {
      title: '我的债转'
    }
  }
});
