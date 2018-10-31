import * as React from 'react';
import { Container } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { inject, observer } from 'mobx-react';
import { ManageFinancialImpl } from './shared/detail.model';
import PlatOptionComponent from './components/plat-option/index';
import PlatStrategyScrollComponent from './components/plat-strategy-scroll/index';
import PlatBottomBarComponent from './components/plat-bottom-bar/index';
import { ScrollView, View } from 'react-native';
import PlatHeadDashBoardComponent from './components/plat-header-dashboard/index';
import HeaderLeft from '~components/HeaderLeft';
import RegisterPopComponent from '../../Components/RegisterPop/index';

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
      headerLeft: <HeaderLeft />,
      title: navigation.getParam('Platform'),
      tabBarVisible: false,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        fontWeight: 'normal'
      },
      headerRight: <View />
    };
  };

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <Container>
        <ScrollView>
          <RegisterPopComponent 
          navigation={this.props.navigation} 
          />
          <PlatHeadDashBoardComponent
            getPlatDetail={this.props.ManageFinancialStore.getPlatDetail}
          />
          <PlatOptionComponent
            getPlatFormMes={this.props.ManageFinancialStore.getPlatformMes}
          />
          <PlatStrategyScrollComponent
            getterSchemeInfo={this.props.ManageFinancialStore.getterSchemeInfo}
            getPlatFormMes={this.props.ManageFinancialStore.getPlatformMes}
          />
        </ScrollView>
        <PlatBottomBarComponent
          navigation={this.props.navigation}
          id={this.getPlatFormID()}
        />
      </Container>
    );
  }

  componentWillMount() {
    this.getPlatFormMesData();
    this.getPlatTopInfo();
    this.getSchemeInfo();
    console.log(
      this.getPlatFormID(),
      'getPlatFormIDgetPlatFormIDgetPlatFormIDgetPlatFormID'
    );
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

  getPlatFormID(): number {
    return this.props.navigation.getParam('id');
  }

  getSchemeInfo() {
    this.props.ManageFinancialStore.getSchemeInfo({
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
