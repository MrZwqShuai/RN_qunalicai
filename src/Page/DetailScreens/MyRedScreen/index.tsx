import * as React from 'react';
import { View, Text } from 'react-native';
import { observable, action, flow } from 'mobx';
import { observer, inject } from 'mobx-react';
import QNHeader from '~components/QNHeader';
import QNRefreshModel from '~components/QNRefreshModel';
import { ScrollableTabView, DefaultTabBar } from '~components/ScrollTabView';
import Touch from '~components/QNTouch';
import { fetchRedBag } from '~apis';
import style from './assets/style';
import titleConfig from './shared/title.config';
import { redStateByIndex } from './shared/index.utils';
import MyPlaceholder from './components/my-placeholder';

class UIState {
  @observable
  curTabIndex = 0;

  @observable
  list0 = {
    data: [],
    isLast: false,
    pageIndex: 1,
    total: 0,
    type: 0, // 0 update 1 load
    isReady: false
  };

  @observable
  list1 = {
    data: [],
    isLast: false,
    pageIndex: 1,
    total: 0,
    type: 0, // 0 update 1 load
    isReady: false
  };

  @observable
  list2 = {
    data: [],
    isLast: false,
    pageIndex: 1,
    total: 0,
    type: 0, // 0 update 1 load
    isReady: false
  };

  @action
  setPageIndex(pageIndex) {
    this[`list${this.curTabIndex}`].pageIndex = pageIndex;
  }

  @action
  setType(type) {
    this[`list${this.curTabIndex}`].type = type;
  }

  // FLOW
  updateList = flow(function*() {
    const curTabIndex = this.curTabIndex;
    const curList = this[`list${curTabIndex}`];
    const data = yield fetchRedBag({
      redState: redStateByIndex(curTabIndex),
      pageIndex: curList.pageIndex
    });

    if (data) {
      const { redlist, Allpage, redType } = data;
      let list = curList.data;
      let pageIndex = curList.pageIndex;

      if (!curList.isReady) this[`list${curTabIndex}`].isReady = true;

      if (curList.type === 0) {
        list = [...redlist, ...list.slice(4)];
      } else {
        list = [...list, ...redlist];
      }

      // total
      this.list0.total = redType.keyong;
      this.list1.total = redType.yishiyong;
      this.list2.total = redType.yishixiao;

      this[`list${curTabIndex}`].data = list;
      this[`list${curTabIndex}`].pageIndex = pageIndex;
      this[`list${curTabIndex}`].isLast =
        list.length >= this[`list${curTabIndex}`].total;
    }
  });
}

let uiState;

@inject('RedBagStore')
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    uiState = new UIState();
  }

  _handleGoUse = (id, jine, State) => {
    const navigation = this.props.navigation;
    const type = navigation.getParam('type');
    if (State === '待使用') {
      if (type === 'from') {
        this.props.RedBagStore.setRegBagParams({
          State,
          id,
          jine
        });
        navigation.goBack(null);
      } else {
        navigation.navigate('ManageFinancial');
      }
    }
  };

  _renderRow = ({ jine, redType, deadlineTime, State, id }) => {
    return (
      <View style={style.listItemBox}>
        <View style={style.listItemLeftBox}>
          <View style={style.listItemLT}>
            <Text style={style.listItemLTU}>￥</Text>
            <Text style={style.listItemLTT}>{jine}</Text>
          </View>
          <Text style={style.listItemBT}>{redType}</Text>
        </View>
        <View style={style.listItemMiddleBox}>
          <Text style={style.listItemMiddleTT}>任意平台可使用</Text>
          <Text style={style.listItemMiddleMT}>
            回执单审核通过后与返利金额一并返现到账户余额
          </Text>
          <Text style={style.listItemMiddleBT}>
            有效期至：
            {deadlineTime}
          </Text>
        </View>
        <Touch
          style={style.listItemRightBox}
          onPress={() => this._handleGoUse(id, jine, State)}>
          <Text style={style.listItemRightText}>
            {State === '待使用'
              ? '去使用'
              : State === '已审核'
                ? '已使用'
                : State}
          </Text>
        </Touch>
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View style={style.moreWrapper}>
        <View style={style.moreLine} />
        <Text style={style.moreText}>没有更多了哦！</Text>
        <View style={style.moreLine} />
      </View>
    );
  };

  _loadMore = item => {
    const curTabIndex = uiState.curTabIndex;
    uiState.setType(1);
    uiState.setPageIndex(uiState[`list${curTabIndex}`].pageIndex + 1);
    return uiState.updateList();
  };

  _refreshList = () => {
    uiState.setType(0);
    uiState.setPageIndex(1);
    return uiState.updateList();
  };

  // 生命周期
  componentDidMount() {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      uiState.updateList();
    }, 500);
  }

  _onChangeTab = tabIndex => {
    uiState.curTabIndex = tabIndex;
    const curList = uiState[`list${tabIndex}`];
    /**
     * 只有当切换的tab没有数据的时候请求数据
     */
    if (!curList.isReady) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        uiState.updateList();
      }, 500);
    }
  };

  render() {
    const { _renderFooter, _renderRow, _loadMore, _refreshList } = this;

    return (
      <View style={style.container}>
        <QNHeader title="我的红包" backIcon />
        <ScrollableTabView
          ref={r => (this._scrollableTabView = r)}
          initialPage={0}
          onChangeTab={({ i }) => {
            this._onChangeTab(i);
          }}
          renderTabBar={() => <DefaultTabBar />}>
          {titleConfig.map((item, index) => {
            const curList = uiState[`list${index}`];
            return (
              <View
                tabLabel={`${item}(${curList.total})`}
                key={index}
                style={style.listWrapper}>
                <MyPlaceholder onReady={curList.isReady} lineNumber={4}>
                  <QNRefreshModel
                    list
                    scrollableTabView={this._scrollableTabView}
                    defaultPageType={2}
                    dataSource={curList.data}
                    renderFooter={_renderFooter}
                    renderRow={_renderRow}
                    loadMore={_loadMore}
                    isLast={curList.isLast}
                    onRefresh={_refreshList}
                  />
                </MyPlaceholder>
              </View>
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}
