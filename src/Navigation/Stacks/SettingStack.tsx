// import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
// import MySettingScreen from '~pages/MySettingScreen';
// import ModifyPasswordScreen from '~pages/ModifyPasswordScreen';
// import MyCardScreen from '~pages/MyCardScreen';
// import MyRedBagScreen from '~pages/MyRedBagScreen';
// import { headerTitleStyle } from '~utils';
// import HeaderLeft from '~components/HeaderLeft';
// import QNQaqHeaderRight from '~components/QNQaqHeaderRight';
import MySettingScreen from '../../Page/DetailScreens/MySettingScreen';
import SuggestScreen from '../../Page/DetailScreens/SuggestScreen';

export default createStackNavigator(
  {
    MySetting: {
      screen: MySettingScreen,
      navigationOptions: {
        title: '设置'
      }
    },
    Suggest: {
      screen: SuggestScreen,
      navigationOptions: {
        title: '意见反馈'
      }
    }
    // ModifyPassword: {
    //   screen: ModifyPasswordScreen,
    //   navigationOptions: {
    //     title: '修改密码'
    //   }
    // },
    // MyCard: {
    //   screen: MyCardScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     title: navigation.getParam('type') ? '收款账号' : '绑定银行卡'
    //   })
    // }
    // MyRedBag: {
    //   screen: MyRedBagScreen,
    //   navigationOptions: {
    //     title: '我的红包',
    //     headerRight: <QNQaqHeaderRight />
    //   }
    // }
  },
  {
    initialRouteName: 'MySetting',
    navigationOptions: {
      header: null
      // headerLeft: <HeaderLeft />,
      // headerTitleStyle: headerTitleStyle({left: -56})
    },
    cardStyle: {
      backgroundColor: 'rgb(245,245,245)'
    }
  }
);
