import * as React from 'react'
import { createStackNavigator } from 'react-navigation'
import NewsListScreen from '~pages/NewsListScreen'

export default createStackNavigator(
  {
    NewsList: {
      screen: NewsListScreen // CommentListScreen
    }
  },
  {
    initialRouteName: 'NewsList'
  }
)