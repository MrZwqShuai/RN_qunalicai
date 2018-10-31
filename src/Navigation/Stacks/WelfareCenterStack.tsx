import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import DiscoverWelfareHouseScreen from '~pages/DiscoverWelfareHouseScreen';
import TaskRecordScreen from '~pages/TaskRecordScreen';

export default createStackNavigator(
  {
    DiscoverWelfareHouse: {
      screen: DiscoverWelfareHouseScreen,
      navigationOptions: {
        title: '福利中心'
      }
    },
    TaskRecord: {
      screen: TaskRecordScreen,
      navigationOptions: {
        title: '任务记录'
      }
    }
  },
  {
    initialRouteName: 'DiscoverWelfareHouse',
    navigationOptions: {
      header: null
    }
  }
);
