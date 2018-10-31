import { createStackNavigator } from 'react-navigation';
import NewGuidelineScreen from '~pages/NewGuidelineScreen';

export default createStackNavigator ({
  NewGuideLines: {
    screen: NewGuidelineScreen,
    navigationOptions: {
      header: null
    }
  }
},{
  initialRouteName: 'NewGuideLines',
  cardStyle: {
    backgroundColor: '#fff'
  }
})

