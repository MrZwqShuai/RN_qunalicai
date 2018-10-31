import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import DiscoverInvitingScreen from '~pages/DiscoverInvitingScreen';
import DiscoverInvitingMoreScreen from '~pages/DiscoverInvitingMoreScreen';

export default createStackNavigator(
  {
    DiscoverInviting: {
      screen: DiscoverInvitingScreen,
      navigationOptions: {
        title: '邀请奖励'
      }
    },
    DiscoverInvitingMore: {
      screen: DiscoverInvitingMoreScreen,
      navigationOptions: {
        title: '更多邀请奖励'
      }
    }
  },
  {
    initialRouteName: 'DiscoverInviting',
    navigationOptions: {
      header: null
    }
  }
);
