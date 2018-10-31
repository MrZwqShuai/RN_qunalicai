import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { inject, observer } from 'mobx-react';
import { ManageFinancialImpl } from './shared/detail.model';
import PlatOptionComponent from './components/plat-option/index';
import PlatStrategyScrollComponent from './components/plat-strategy-scroll/index';
import PlatBottomBarComponent from './components/plat-bottom-bar/index';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import PlatHeadDashBoardComponent from './components/plat-header-dashboard/index';
import HeaderLeft from '~components/HeaderLeft';
import RegisterPopComponent from '../../Components/RegisterPop/index';
import { pxToDp, alert } from '~utils';
import FinancialHeaderComponent from '../../Components/FinancialHeader/index';
import FinanicalWrapper from '../../Components/FinancialWrapper/index';
import PlatStandardKindComponent from './components/plat-standard-kind/index';
import PlatHelperComponent from './components/plat-helper/index';
import PlatHelperSwiperComponent from './components/plat-helper-swiper/index';

type Props = {
  navigation: any;
  ManageFinancialStore: ManageFinancialImpl;
};
type State = {};

@inject('ManageFinancialStore')
@observer
class ManageFinancialDetailScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>
        <PlatHelperSwiperComponent
          ref={c => {
            this.swiperChildrenRoot = c;
          }}
        />
        <FinanicalWrapper
          headerStyle={{ justifyContent: 'space-between' }}
          handleTitleClick={() => {
            this.goPlatFormDetail();
          }}
          title="平台详情">
          <RegisterPopComponent navigation={this.props.navigation} />
          <PlatHeadDashBoardComponent
            getPlatDetail={this.props.ManageFinancialStore.getPlatDetail}
            getPlatFormMes={this.props.ManageFinancialStore.getPlatformMes}
          />
          <PlatOptionComponent
            getPlatFormMes={this.props.ManageFinancialStore.getPlatformMes}
            getPlatDetail={this.props.ManageFinancialStore.getPlatDetail}
          />
          <PlatStandardKindComponent
            getPlatScheme={this.props.ManageFinancialStore.getterSchemeInfo}
          />
          <PlatHelperComponent
            getPlatFormMes={this.props.ManageFinancialStore.getPlatformMes}
            swiperChildrenRoot={this.swiperChildrenRoot}
          />
        </FinanicalWrapper>
        <PlatBottomBarComponent
          navigation={this.props.navigation}
          id={this.getPlatID()}
        />
      </View>
    );
  }
  componentWillMount() {
    try {
      this.getPlatFormMesData();
      this.getPlatTopInfo();
      this.getSchemeInfo();
    } catch (e) {
      console.log('错误信息:' + e.message);
    }
  }

  componentWillUnmount() {
    this.props.ManageFinancialStore.setHelperSwiperPicture(false);
  }

  getPlatTopInfo() {
    this.props.ManageFinancialStore.getPlatTopInfo({
      id: this.getPlatFormID()
    });
  }

  getPlatFormMesData() {
    this.props.ManageFinancialStore.getPlatFormMesData({
      id: this.getPlatFormID()
    });
  }

  // 用来获取平台detail的id
  getPlatFormID(): number {
    return this.props.navigation.getParam('id') || 152;
  }

  // 获取平台的id
  getPlatID(): number {
    return this.props.navigation.getParam('platID') || 25;
  }

  getSchemeInfo() {
    this.props.ManageFinancialStore.getSchemeInfo({
      id: this.getPlatFormID()
    });
  }

  goPlatFormDetail() {
    this.props.navigation.navigate('PlatFormDetail', {
      id: this.getPlatFormID()
    });
  }
}

const styles = EStyleSheet.create({
  backArrow: {
    width: 7.5,
    height: 14,
    marginLeft: 18
  }
});

export default ManageFinancialDetailScreen;
