import * as React from 'react';
import QNQaqHeaderRight from '~components/QNQaqHeaderRight';
import { createStackNavigator } from 'react-navigation';
import MyInvestScreen from '~pages/MyInvestScreen/index';

export default createStackNavigator({
  MyInvest: {
    screen: MyInvestScreen,
    navigationOptions: {
      title: '投资概括',
      headerRight: <QNQaqHeaderRight />
    }
  }
});
