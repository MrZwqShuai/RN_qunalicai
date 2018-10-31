import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { AboutScreen }from '~pages/AboutScreen';
import HeaderLeft from '~components/HeaderLeft';
import { headerTitleStyle } from '~utils'

export default createStackNavigator ({
  About: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.name
    })
  },
},{
  initialRouteName: 'About',
  navigationOptions: {
    headerLeft: <HeaderLeft />,
    headerTitleStyle: headerTitleStyle({left: -56})
  },
  cardStyle: {
    backgroundColor: '#fff'
  }
})