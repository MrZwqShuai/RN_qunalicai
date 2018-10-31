import * as React from 'react';
import { inject, observer } from 'mobx-react';
import QNRefreshModel from '../../Components/QNRefreshModel';
import QNHeader from '../../Components/QNHeader';
import {DOMAIN_URL, pxToDp} from '~utils'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from 'react-native';
import { styles } from './assets/style';
import {mainContent} from "~pages/DiscoverScreen/assets/styles"

@inject('NoticeListStore')
@inject('HomeStore')
@observer
class NoticeListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
  }
  state = {
    pageSize: 10,
    page: 1
  };
  _renderRow = item => {
    return (
      <View style={styles.noticeItem}>
        <View style={styles.titleDate}>
          <Text style={styles.titleDateText}>{item.NoticeTime}</Text>
        </View>
        <TouchableOpacity
          style={styles.noticeBox}
          onPress={() => this._navToDetail(item)}>
          <View style={styles.noticeItemMain}>
            <View style={styles.noticeItemTitle}>
              <Text style={styles.noticeItemTitleText} numberOfLines={1}>
                {item.NoticeTitle}
              </Text>
            </View>
            <View style={styles.noticeItemContent}>
              <Text style={styles.noticeItemContentText} numberOfLines={2}>
                {item.MiaoShu}
              </Text>
            </View>
          </View>
          <View style={styles.noticeItemSee}>
            <Text style={styles.noticeSeeText}>点击查看</Text>
            <Image
              source={require('./assets/images/notice_arrow.png')}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  _renderFooter = () => {
    return (
      <View style={mainContent.moreWrapper}>
        <View style={mainContent.moreLine} />
        <Text style={mainContent.moreText}>没有更多记录了哦！</Text>
        <View style={mainContent.moreLine} />
      </View>
    );
  };
  _navToDetail = item => {
    const { navigation } = this.props;
    navigation.navigate('NoticeDetail', {
      id: item.id
    });
  };
  _loadMore = () => {
    let { isLoading, isLast } = this.props.NoticeListStore;
    if (!isLast && !isLoading) {
      this.props.NoticeListStore.setPage(this.props.NoticeListStore.page + 1);
      this.props.NoticeListStore.loadNoticeList();
    }
  };
  _initNotices = () => {
    this.props.NoticeListStore.setPage(1);
    this.props.NoticeListStore.loadNoticeList();
  };
  _updataList = resolve => {
    this.props.NoticeListStore.setPage(1);
    this.props.NoticeListStore.loadNoticeList(resolve);
  };
  componentDidMount() {
    this._initNotices();
  }

  public render() {
    let { isLast, noticeList } = this.props.NoticeListStore
    return (
      <View style={styles.wrap}>
        <QNHeader title="公告列表" backIcon />
        <QNRefreshModel
          list
          dataSource={noticeList}
          defaultPageType={1}
          renderFooter={this._renderFooter}
          renderRow={item => this._renderRow(item)}
          loadMore={this._loadMore}
          heightForIndexPath={pxToDp(352)}
          isLast={isLast}
          onRefresh={resolve => this._updataList(resolve)}
        />
      </View>
    );
  }
}

export default NoticeListScreen;
