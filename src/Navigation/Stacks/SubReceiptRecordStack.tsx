import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import ReceiptRecordScreen from '~pages/ReceiptRecordScreen';
import ReceiptRecordDetailScreen from '~pages/ReceiptRecordDetailScreen';

export default createStackNavigator(
  {
    ReceiptRecord: {
      screen: ReceiptRecordScreen,
      navigationOptions: {
        title: '回单记录'
      }
    },
    ReceiptRecordDetail: {
      screen: ReceiptRecordDetailScreen,
      navigationOptions: {
        title: '回单详情'
      }
    }
  },
  {
    initialRouteName: 'ReceiptRecord',
    navigationOptions: {
      header: null
    },
    cardStyle: {
      backgroundColor: '#fff'
    }
  }
);
