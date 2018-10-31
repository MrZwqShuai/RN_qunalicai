import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import ManageFinancialDetailScreen from '~pages/ManageFinancialDetailScreen/index';
import ManageFinancialScreen from '~pages/ManageFinancialScreen/index';
import SearchScreen from '~pages/SearchScreen/index';
import RegisterActivityScreen from '~pages/RegisterActicityScreen/index';
import PlatFormDetailScreen from '../../Page/PlatFormDetailScreen/index';
import CustomerServiceScreen from '../../Page/CustomerService/index';
export const ManageFinancialDetailStack = createStackNavigator({
  ManageFinancialDetail: {
    screen: ManageFinancialDetailScreen,
    navigationOptions: {
      header: null
    }
  },
  RegisterActivity: {
    screen: RegisterActivityScreen
  },
  PlatFormDetail: {
    screen: PlatFormDetailScreen
  },
  CustomerService: {
    screen: CustomerServiceScreen,
    navigationOptions: {
      header: null
    }
  }
});

export const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen
  }
});

export const ManageFinancialStack = createStackNavigator({
  ManageFinancial: ManageFinancialScreen
});
