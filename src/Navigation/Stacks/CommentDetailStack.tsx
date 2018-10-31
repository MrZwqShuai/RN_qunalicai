import * as React from 'react'
import { createStackNavigator } from 'react-navigation'
import CommentDetailScreen from '~pages/NewsListScreen/CommentDetailScreen'

export default createStackNavigator(
  {
    CommentDetail: {
      screen: CommentDetailScreen
    }
  }
)
