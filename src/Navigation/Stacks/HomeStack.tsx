import { createStackNavigator } from 'react-navigation'
import HomeScreen from '~pages/HomeScreen'
import HomeWebViewScreen from '~pages/HomeScreen/WebView/index'

export default createStackNavigator({
  HomeWebView: {
    screen: HomeWebViewScreen,
    navigationOptions: {
      header: null
    }
  }
})