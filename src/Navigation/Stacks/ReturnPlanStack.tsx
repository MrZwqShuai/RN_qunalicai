import { createStackNavigator } from 'react-navigation';
import ReturnMoneyScreen from '~pages/ReturnMoneyScreen';
import ReturnPlanScreen from '~pages/ReturnPlanScreen'
import ReturnDetail from '~pages/ReturnPlanScreen/ReturnDetailScreen'

export default createStackNavigator ({
  ReturnPlan: {
    screen: ReturnPlanScreen
  },
  ReturnMoney: {
    screen: ReturnMoneyScreen
  },
  ReturnDetail: {
    screen: ReturnDetail
  }
},{
  initialRouteName: 'ReturnPlan',
  cardStyle: {
    backgroundColor: '#fff'
  }
})