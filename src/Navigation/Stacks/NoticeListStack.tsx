import * as React from 'react'
import { createStackNavigator } from 'react-navigation'
import NoticeListScreen from '~pages/NoticeListScreen'
import NoticeDetailScreen from '~pages/NoticeListScreen/NoticeDetailScreen'

export default createStackNavigator(
  {
    NoticeList: {
      screen: NoticeListScreen
    },
    NoticeDetail: {
      screen: NoticeDetailScreen
    }
  },
  {
    initialRouteName: 'NoticeList'
  }
)