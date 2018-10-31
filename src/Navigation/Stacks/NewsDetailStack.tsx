import * as React from 'react'
import { createStackNavigator } from 'react-navigation'
import NewsDetailScreen from '~pages/NewsListScreen/NewsDetailScreen'
import CommentListScreen from '~pages/NewsListScreen/CommentListScreen'

export default createStackNavigator(
  {
    NewsDetail: {
      screen: NewsDetailScreen
    },
    CommentList: {
      screen: CommentListScreen
    }
  }
)