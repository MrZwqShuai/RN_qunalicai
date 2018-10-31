import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  StatusBar,
  AlertAlert
} from 'react-native';
import { inject, observer } from 'mobx-react';
import SearchComponent from './components/search/index';
import ScrollComponent from './components/scroll/index';
import { ManageFinancialImpl } from '../ManageFinancialDetailScreen/shared/detail.model';
import RankComponent from './components/rank/index';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Drawer, Tab, Tabs } from 'native-base';
import SliderCustomComponent from './components/slider-custom/index';
import { pxToDp } from '~utils';
import { headerNavTxt } from './shared/manage-fiancial.json';
import { PlatForm, PlatScrollData } from './shared/manage-financial.model';
import {
  textDefaultStyle,
  activeDefaultTextStyle
} from '../../Components/QNTab/shared/common.style';
import QNRefreshModel from '~components/QNRefreshModel';
import { renderPlatListItem } from '~components/PlatFormInFormation';
import { toJS } from 'mobx';
import MySkeleton from '../../Components/SkeletonScreen/index';
import {
  ScrollableTabView,
  DefaultTabBar
} from '../../Components/ScrollTabView';

type Props = {
  navigation: any;
  ManageFinancialStore: ManageFinancialImpl;
};
type State = {};

@inject('ManageFinancialStore')
@inject('RootStore')
@observer
class ManageFinancialScreen extends React.Component<Props, State> {
  _scrollView: any;
  _scrollableTabView: any = {
    goToPage: () => {}
  };
  page: number = 1;
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTab: 0,
      // 平台首投复投数组
      platFormInvestList: [],
      initialPage: 0
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  renderTabBarRight(openDrawer) {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerRightContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              openDrawer();
            }}>
            <Image
              source={require('./assets/images/slider-icon.png')}
              style={styles.headerRightIcon}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  render() {
    const closeDrawer = () => {
      this.drawer._root.close();
    };
    const openDrawer = () => {
      this.drawer._root.open();
    };
    const {
      AllPage,
      getterPlatFormList,
      platFormListAll,
      isReady
    } = this.props.ManageFinancialStore;
    return (
      <Drawer
        openDrawerOffset={0.13}
        ref={ref => {
          this.drawer = ref;
        }}
        content={
          <SliderCustomComponent
            closeDrawer={closeDrawer}
            navigator={this.props.navigation}
            goToPage={this._scrollableTabView.goToPage}
            resetPage={this.resetPage}
          />
        }
        onClose={() => closeDrawer()}
        side="right">
        <View style={styles.screenContiner}>
          <SearchComponent navigation={this.props.navigation} />
          <ScrollableTabView
            ref={r => (this._scrollableTabView = r)}
            initialPage={this.state.initialPage}
            onChangeTab={({ i }) => {
              this._onChangeTab(i);
            }}
            renderTabBar={() => (
              <DefaultTabBar
                layoutType={1}
                tabBarRight={() => this.renderTabBarRight(openDrawer)}
              />
            )}>
            {// 组件
            [
              { name: '全部', id: 0 },
              { name: '首投', id: 1 },
              { name: '复投', id: 2 }
            ].map((invest, index) => {
              return (
                <MySkeleton.QNLayOut
                  tabLabel={invest.name}
                  key={invest.id}
                  length={5}
                  isReady={isReady}>
                  <View style={styles.refreshModalWrap}>
                    <QNRefreshModel
                      list
                      scrollableTabView={this._scrollableTabView}
                      defaultPageType={1}
                      key={invest.id}
                      tabLabel={invest.name}
                      dataSource={platFormListAll[index]}
                      renderFooter={this._renderFooter}
                      loadMore={() => {
                        this._loadMore(index);
                      }}
                      heightForIndexPath={pxToDp(390)}
                      renderRow={this._renderRow}
                      isLast={this.page >= AllPage}
                      onRefresh={() => {
                        this.page = 1;
                        this.props.ManageFinancialStore.setRefresh(true);
                        return this.getPlatFormList(index);
                      }}
                    />
                  </View>
                </MySkeleton.QNLayOut>
              );
            })
            // 组件
            }
          </ScrollableTabView>
        </View>
      </Drawer>
    );
  }

  componentWillMount() {
    this.getPlatFormList(0);
  }

  componentDidMount() {}

  toggleRank(currentTab: number) {
    let screenWidth = Dimensions.get('window').width;
    if (this.state.currentTab === currentTab) {
      return;
    }
    this.setState({
      currentTab: currentTab
    });
    this.clearPlatFormList(currentTab);
    this._scrollView.scrollTo({ x: screenWidth * currentTab });
  }

  getPlatFormList(investType: number = null, page: number = 1) {
    let currentPage = investType;
    if (investType === 0) {
      investType = null;
    }
    return this.props.ManageFinancialStore.getPlatFormList(
      {
        page: page,
        pageSize: 8,
        investType: investType
      },
      currentPage
    );
  }

  handleScrollEnd(scroll) {
    let screenWidth = Dimensions.get('window').width;
    let currentTab = scroll.nativeEvent.contentOffset.x / screenWidth;
    let canClearPlatFormList = this.isCurrentTabChange(currentTab);
    this.setState({
      currentTab: currentTab
    });
    if (canClearPlatFormList) {
      this.clearPlatFormList(currentTab);
    }
  }

  isCurrentTabChange(currentTab: number) {
    return this.state.currentTab !== currentTab;
  }

  showRefresh() {
    this.props.RootStore.setLoading(true);
  }

  clearPlatFormList(currentTab: number) {
    this.showRefresh();
    this.props.ManageFinancialStore.setPlatFormList([]);
    this.getPlatFormList(currentTab);
  }

  _onChangeTab(page: number): void {
    if (this.isArrayEmpty(page)) {
      this.page = 1;
      this.getPlatFormList(page, this.page);
    } else {
      return null;
    }
  }

  isArrayEmpty(page: number) {
    const { platFormListAll } = this.props.ManageFinancialStore;
    let toJsPlatFormListAll = toJS(platFormListAll);
    if (toJsPlatFormListAll[page].length) {
      return false;
    }
    return true;
  }

  _loadMore = (page: number) => {
    this.page++;
    return this.getPlatFormList(page, this.page);
  };

  _renderRow = item => {
    return <View>{renderPlatListItem(item, this.props.navigation)}</View>;
  };

  _renderFooter = () => {
    return (
      <View style={styles.moreWrapper}>
        <View style={styles.moreLine} />
        <Text style={styles.moreText}>天呐，你已经看到底部啦！</Text>
        <View style={styles.moreLine} />
      </View>
    );
  };

  resetPage = () => {
    this.page = 1;
  }
}

const styles = EStyleSheet.create({
  screenContiner: {
    flex: 1,
    backgroundColor: '#f6f5f8'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    marginBottom: pxToDp(16),
    backgroundColor: '#fff'
  },
  headerTxtContainer: {
    width: pxToDp(334),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: pxToDp(45)
  },
  headerTitleTxt: {
    fontSize: pxToDp(36),
    lineHeight: 45,
    color: '#000'
  },
  acTiveTitleTxt: {
    fontSize: pxToDp(32),
    lineHeight: 45,
    color: '#666'
  },
  headerRightContainer: {
    marginRight: pxToDp(30)
  },
  headerRightIcon: {
    width: pxToDp(40),
    height: pxToDp(40)
  },
  sliderClose: {
    width: 20,
    height: 20
  },
  headerTxtItem: {
    // position: 'relative',
    alignItems: 'center',
    height: 45
  },
  headerUnderLine: {
    position: 'absolute',
    bottom: 0,
    width: pxToDp(44),
    height: pxToDp(6),
    backgroundColor: '#FFAD2C'
  },
  // more
  moreWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(42)
  },
  moreLine: {
    width: pxToDp(56),
    height: pxToDp(1),
    backgroundColor: 'rgb(191,187,187)'
  },
  moreText: {
    fontSize: pxToDp(24),
    color: 'rgb(191,187,187)',
    marginHorizontal: pxToDp(20)
  },
  refreshModalWrap: { flex: 1, marginTop: pxToDp(16) }
});

export default ManageFinancialScreen;
