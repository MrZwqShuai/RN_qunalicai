import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import MyDebtPublishScreen from '../../Page/MyDebtPublishScreen/index';

export default createStackNavigator(
  {
    MyDebtPublish: {
      screen: MyDebtPublishScreen,
      navigationOptions: {
        title: "发布债转"
      }
    }
  }
)