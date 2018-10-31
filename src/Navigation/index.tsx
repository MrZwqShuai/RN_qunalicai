import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import AppHeader from '~components/AppHeader';
import MyRedScreen from '~pages/DetailScreens/MyRedScreen';
import {
  TabStack,
  AuthStack,
  HomeStack,
  SubCapticalRecordStack,
  SubReceiptRecordStack,
  SubInvestStack,
  SettingStack,
  ManageFinancialDetailStack,
  ReturnPlanStack,
  NewGuideLineStack,
  AboutStack,
  FillReceiptStack,
  SearchStack,
  NoticeListStack,
  PersonalCenterStack,
  WelfareCenterStack,
  NewsDetailStack,
  CommentDetailStack,
  MyDebtStack
} from './Stacks';
import MyInvestScreen from '~pages/MyInvestScreen/index';
import NewsListStack from '~navigation/Stacks/NewsListStack';
// 发现模块
import DiscoverInvitingScreen from '../Page/DiscoverInvitingScreen/index';
import DiscoverMessageNotificationScreen from '~pages/DiscoverMessageNotificationScreen';
import AccountScreen from '~pages/DetailScreens/AccountScreen';
import DiscoverInvitingMoreScreen from '~pages/DiscoverInvitingMoreScreen';
import MyDebtPublishStack from '~navigation/Stacks/MyDebtPublishStack';
// 债转模块
import MyUnderTakeScreen from '~pages/TransferClaimsSceens/MyUnderTake';
import TransferClaimsDetailScreen from '~pages/TransferClaimsSceens/TransferClaimsDetail';
import UnderTakeDetailScreen from '~pages/TransferClaimsSceens/UnderTakeDetail';
// import TestWebViewScreen from '~pages/DetailScreens/TestWebViewScreen';
import MyDebtConfirmStack from '~navigation/Stacks/MyDebtConfirmStack';

export default createStackNavigator(
  {
    App: TabStack,
    Auth: AuthStack,
    Setting: SettingStack,
    SubCapticalRecord: SubCapticalRecordStack,
    SubReceiptRecord: SubReceiptRecordStack,
    SubInvest: SubInvestStack,
    WelfareCenter: WelfareCenterStack,
    ManageFinancialDetail: ManageFinancialDetailStack,
    HomeWebview: HomeStack,
    Search: SearchStack,
    ReturnPlan: ReturnPlanStack,
    NewGuideLines: NewGuideLineStack,
    About: AboutStack,
    FillReceiptForm: FillReceiptStack,
    PersonalCenterNav: PersonalCenterStack,
    NoticeList: NoticeListStack,
    NewsList: NewsListStack,
    NewsDetail: NewsDetailStack,
    CommentDetail: CommentDetailStack,
    MyRedBag: MyRedScreen,
    MyInvest: MyInvestScreen,
    DiscoverMessageNotification: DiscoverMessageNotificationScreen,
    DiscoverInviting: DiscoverInvitingScreen,
    DiscoverInvitingMore: DiscoverInvitingMoreScreen,
    Account: AccountScreen,
    MyDebt: MyDebtStack,
    MyDebtPublish: MyDebtPublishStack,
    MyDebtConfirm: MyDebtConfirmStack,
    MyUnderTake: MyUnderTakeScreen,
    TransferClaimsDetail: TransferClaimsDetailScreen,
    UnderTakeDetail: UnderTakeDetailScreen
  },
  {
    initialRouteName: 'MyDebt',
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader navigation={navigation} />
    }),
    cardStyle: {
      backgroundColor: '#fff'
    }
  }
);
