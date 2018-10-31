import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { inject, observer } from 'mobx-react';
import ScrollComponent from '../../../ManageFinancialScreen/components/scroll/index';
import { getHotList } from '~apis/index';
import { HotListItem } from '../../share/search-model';
import MySkeleton from '../../../../Components/SkeletonScreen/index';
import QNRefreshModel from '~components/QNRefreshModel';
import { renderPlatListItem } from '../../../../Components/PlatFormInFormation/index';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import { toJS } from 'mobx';

type Props = {};

@inject('RootStore')
@inject('SearchBiaoListStore', 'HomeStore')
@observer
class SearchRecommendComponent extends React.Component<Props> {

  page: number = 1;

  constructor(props: Props) {
    super(props);
    this.state = {
      clear: false,
      hotList: undefined
    };
  }

  renderEmptyPage() {
    const emptyPage: JSX.Element = (
      <View style={styles.emptyContainer}>
        <Image
          source={require('../../../../Components/QNRefreshModel/assets/images/empty3.png')}
          style={styles.emptyImg}
        />
      </View>
    );
    return emptyPage;
  }

  renderPlatList() {
    return (
      <QNRefreshModel
        list
        defaultPageType={3}
        heightForIndexPath={pxToDp(390)}
        dataSource={this.props.SearchBiaoListStore.getterPlatList}
        renderRow={this._renderRow}
        loadMore={() => {
          this._loadMore();
        }}
        isLast={this.page >= this.props.SearchBiaoListStore.AllPage}
        onRefresh={() => {
          this.page = 1;
          this.setRefresh(true);
          return this.getBiaoList(this.props.SearchBiaoListStore.searchName)
        }}
        renderFooter={this._renderFooter}
      />
    );
  }

  renderHistoryList() {
    const historyList: JSX.Element = (
      <View
        style={{
          marginLeft: 10,
          marginRight: 10
        }}>
        {/* <TouchableWithoutFeedback
          onPress={() => {
            this.clearHistory();
          }}>
          <View style={styles.historyClose}>
            <Image
              source={require('../../assets/images/se_close.png')}
              style={styles.historyClose}
            />
          </View>
        </TouchableWithoutFeedback> */}
        <Text style={styles.recommendTitle}>推荐搜索</Text>
        <View style={styles.historyList}>{this.state.hotList}</View>
      </View>
    );
    return historyList;
  }

  render() {
    const getterClearHistory = this.props.SearchBiaoListStore
      .getterClearHistory;
    const getterEmpty = this.props.SearchBiaoListStore.getterEmpty;
    const historyList = getterClearHistory
      ? getterEmpty
        ? this.renderEmptyPage()
        : this.renderPlatList()
      : this.renderHistoryList();

    if (this.props.RootStore.loading) {
      return <MySkeleton.QNLayOut length={5} />;
    } else {
      return <View style={styles.historyContainer}>{historyList}</View>;
    }
  }

  componentWillMount() {
    this.getRecommendList();
    this.props.SearchBiaoListStore.clearHistoryList(false);
  }

  clearHistory() {
    this.props.SearchBiaoListStore.clearHistoryList(true);
  }

  getRecommendList() {
    const recommendList = toJS(this.props.HomeStore.recommendList)
    if (recommendList) {
      this.getHotList(recommendList);
    } else {
      this.props.HomeStore.loadRecommendList();
      this.getHotList(recommendList);
    }
  }

  getHotList(recommendList) {
      this.setState({
        hotList: this.renderHotList(recommendList)
      });
  }

  renderHotList(hotList: HotListItem[]) {
    const hotListView = hotList.map((hotListItem: HotListItem) => {
      return (
        <Text
          style={styles.historyItem}
          key={hotListItem.ID}
          onPress={() => {
            this.setRefresh(true);
            this.props.SearchBiaoListStore.setSearchName(hotListItem.Platform);
            this.getBiaoList(hotListItem.Platform);
          }}>
          {hotListItem.Platform}
        </Text>
      );
    });
    return hotListView;
  }

  getBiaoList(name: string, page: number = 1) {
    // this.props.RootStore.setLoading(true);
    this.props.SearchBiaoListStore.setSearchName(name);
    this.props.SearchBiaoListStore.getBiaoList({
      page: page,
      pageSize: 2,
      name: name,
      isLoading: 1
    });
  }

  setRefresh(isRefresh: boolean) {
    this.props.SearchBiaoListStore.setRefresh(isRefresh);
  }
  
  _renderRow = item => {
    return (
      <View>
        {renderPlatListItem(item, this.props.navigation)}
      </View>
    );
  }

  _loadMore() {
    this.page++;
    return this.getBiaoList(this.props.SearchBiaoListStore.searchName, this.page);
  }

  _renderFooter() {
    return (
      <View style={styles.moreWrapper}>
        <View style={styles.moreLine} />
        <Text style={styles.moreText}>天呐，你已经看到底部啦！</Text>
        <View style={styles.moreLine} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  historyContainer: {
    marginTop: 10
  },
  recommendTitle: {
    fontSize: 11,
    color: '#999'
  },
  historyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15
  },
  historyItem: {
    width: pxToDp(160),
    height: pxToDp(64),
    marginRight: 6,
    marginBottom: 10,
    lineHeight: 32,
    textAlign: 'center',
    fontSize: 13,
    borderRadius: 5,
    color: '#333',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  historyClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    zIndex: 9
  },
  emptyContainer: {
    height: Dimensions.get('window').height - 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  emptyImg: {
    width: pxToDp(500),
    height: pxToDp(300)
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
  }
});

export default SearchRecommendComponent;
