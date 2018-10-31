import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import MyDebtConfirmScreen from '../../Page/MyDebtConfirmScreen';

export default createStackNavigator({
  MyDebtConfirm: {
    screen: MyDebtConfirmScreen,
    navigationOptions: {
      title: '债转确认'
    }
  }
});
