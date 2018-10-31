import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import FillReceiptFormScreen from '~pages/FillReceiptFormScreen';
import HeaderLeft from '~components/HeaderLeft';
import { headerTitleStyle } from '~utils';
export default createStackNavigator(
  {
    FillReceiptForm: {
      screen: FillReceiptFormScreen,
      navigationOptions: {
        title: '填写回单',
        headerTitleStyle: headerTitleStyle({ left: -56 })
      }
    }
  },
  {
    initialRouteName: 'FillReceiptForm',
    navigationOptions: {
      header: null
    }
  }
);
