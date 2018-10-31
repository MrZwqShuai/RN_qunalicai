import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '~pages/HomeScreen';
import MyInfoScreen from '~pages/MyInfoScreen';
import { RootStore } from '~store';
import TabButton from '~components/TabButton';
import { pxToDp } from '~utils';
import { ManageFinancialStack } from './ManageStack';
import DiscoverStack from '~pages/DiscoverScreen';
import TransferClaimsScreen from '~pages/TransferClaimsSceens/TransferTab';
// import TestWebViewScreen from '~pages/DetailScreens/TestWebViewScreen';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: '首页',
        tabBarIcon({ focused }) {
          return <TabButton isFocused={focused} type="home" />;
        },
        tabBarOnPress({
          navigation: {
            state: { routeName }
          }
        }) {
          RootStore.setCurrentTab(routeName);
        }
      }
    },
    ManageFinancial: {
      screen: ManageFinancialStack,
      navigationOptions: {
        title: '理财',
        tabBarIcon({ focused }) {
          return <TabButton isFocused={focused} type="coin" />;
        },
        tabBarOnPress({
          navigation: {
            state: { routeName }
          }
        }) {
          RootStore.setCurrentTab(routeName);
        }
      }
    },
    TransferClaims: {
      screen: TransferClaimsScreen,
      navigationOptions: {
        title: '债转',
        tabBarIcon({ focused }) {
          return <TabButton isFocused={focused} type="transfer" />;
        },
        tabBarOnPress({
          navigation: {
            state: { routeName }
          }
        }) {
          RootStore.setCurrentTab(routeName);
        }
      }
    },
    Discover: {
      screen: DiscoverStack,
      navigationOptions: {
        title: '发现',
        tabBarIcon({ focused }) {
          return <TabButton isFocused={focused} type="discover" />;
        },
        tabBarOnPress({
          navigation: {
            state: { routeName }
          }
        }) {
          RootStore.setCurrentTab(routeName);
        }
      }
    },
    MyInfo: {
      screen: MyInfoScreen,
      initialRouteParams: 'myInfo',
      navigationOptions: {
        title: '我的',
        tabBarIcon({ focused }) {
          return <TabButton isFocused={focused} type="memb" />;
        },
        tabBarOnPress({
          navigation: {
            state: { routeName }
          }
        }) {
          RootStore.setCurrentTab(routeName);
        }
      }
    }
  },
  {
    initialRouteName: 'TransferClaims',
    backBehavior: false,
    tabBarOptions: {
      labelStyle: {
        fontSize: pxToDp(25)
      },
      activeTintColor: '#FFAD2C',
      style: {
        backgroundColor: '#fff'
      }
    }
  }
);
