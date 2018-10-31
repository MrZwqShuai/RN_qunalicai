import * as React from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { observable, flow } from 'mobx';
import { observer, inject } from 'mobx-react';
import { fetchHotNews, fetchCheckNews } from '~apis';
import QNHeader from '~components/QNHeader';
import QNRefreshModel from '~components/QNRefreshModel';
import QNNewsItem from '~components/QNNewsItem';
import Touch from '~components/QNTouch';
import { mainContent, wrap } from './assets/styles';
import { top as topConfig } from './shared/index.config';
import { DEFAULT_IMAGE } from '../../Config/config';
import MyPlaceholder from './components/my-placeholder';

class UIState {
  @observable
  list = [];

  @observable
  isReady = false;

  @observable
  isHaveNews = false;

  @observable
  tipMessage = '';

  @observable
  ctURL = '';

  checkNews = flow(function*() {
    const data = yield fetchCheckNews();
    this.tipMessage = data == 1 ? '您有新的消息' : '暂无新的消息';
  });

  // FLOW
  updateList = flow(function*() {
    const data = yield fetchHotNews();
    if (data) {
      if (!this.isReady && data && data.length > 0) this.isReady = true;
      this.list = data;
    }
  });

  getCTURL = flow(function*() {
    const urlMsg = yield fetch(
      'http://fe.wsloan.com/data?query=CT_DOWNLOAD_URL'
    ).then(response => response.json());
    this.ctURL = urlMsg.download_url;
  });
}

let uiState;

@inject('NewsListStore', 'RootStore')
@observer
export default class DiscoverScreen extends React.Component {
  constructor(props) {
    super(props);
    uiState = new UIState();
  }

  shouldComponentUpdate({ RootStore: { currentTab } }) {
    return currentTab === 'Discover';
  }

  _handleGoToCT = () => {
    if (uiState.ctURL) {
      Linking.openURL(uiState.ctURL);
    }
  };

  _handleGoToNotifation = () => {
    this.props.navigation.navigate(
      this.props.RootStore.userId ? 'DiscoverMessageNotification' : 'Login'
    );
  };

  _handleGoToBigNews = () => {
    this.props.navigation.navigate(
      this.props.RootStore.userId ? 'NewsList' : 'Login'
    );
  };

  _handleGoToBigNewsItem = item => {
    if (this.props.RootStore.userId) {
      this.props.navigation.navigate('NewsDetail', {
        id: item.id
      });
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  _renderEntrys = () => {
    const { navigation } = this.props;
    return (
      <View style={mainContent.entrysWrap}>
        {topConfig.map((item, index) => {
          return (
            <Touch
              style={mainContent.entrysItemContainer}
              key={index}
              onPress={() => navigation.navigate(item.path)}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={mainContent.entrysImageWrapper}
              />
              <View style={mainContent.entrysItemContentWrapper}>
                <Text style={mainContent.entrysItemContentTitle}>
                  {item.title}
                </Text>
                <Text style={mainContent.entrysItemContentDesc}>
                  {item.desc}
                </Text>
              </View>
            </Touch>
          );
        })}
      </View>
    );
  };

  _renderBigNewsList = () => {
    const list = uiState.list;
    const { _handleGoToNotifation } = this;
    return (
      <View style={mainContent.listWrapper}>
        <View style={mainContent.listTitleWrapper}>
          <Text style={mainContent.listTitle}>每日头条</Text>
          <Touch
            style={mainContent.likeWrapper}
            onPress={_handleGoToNotifation}>
            <Text style={mainContent.likeDesc}>
              {!this.props.RootStore.userId
                ? '登录可查看您的通知哦'
                : uiState.tipMessage}
            </Text>
            <Image
              source={require('./assets/images/di_arrow_right.png')}
              style={mainContent.arrowRightImage}
            />
          </Touch>
        </View>
        <MyPlaceholder onReady={uiState.isReady} lineNumber={4}>
          <React.Fragment>
            {(list.length &&
              list.map((item, index) => {
                const imgUrl = JSON.parse(item.ImgUrl)[0]
                  ? JSON.parse(item.ImgUrl)[0].url
                  : DEFAULT_IMAGE.discover;
                return <QNNewsItem key={index} itemData={item} />;
              })) ||
              null}
          </React.Fragment>
        </MyPlaceholder>
      </View>
    );
  };

  _onRrefresh = () => {
    return uiState.updateList();
  };

  _updateNewsList = () => {
    if (this.props.RootStore.userId) {
      uiState.checkNews();
    }
  };

  _scrollView;
  _didFocus;
  componentDidMount() {
    this._updateNewsList();
    uiState.updateList();
    uiState.getCTURL();
    // addListener
    this._didFocus = this.props.navigation.addListener('didFocus', payload => {
      this._updateNewsList();
    });
  }

  componentWillUnmount() {
    this._didFocus && this._didFocus.remove();
  }

  render() {
    const {
      _renderEntrys,
      _renderBigNewsList,
      _handleGoToBigNews,
      _handleGoToCT,
      _onRrefresh
    } = this;

    return (
      <View style={wrap.container}>
        <QNHeader title="发现" />
        <QNRefreshModel view onRefresh={_onRrefresh} defaultPageType={1}>
          {_renderEntrys()}
          {_renderBigNewsList()}
          <Touch onPress={_handleGoToBigNews} style={mainContent.moreWrapper}>
            <View style={mainContent.moreLine} />
            <Text style={mainContent.moreText}>不过瘾？点击查看更多</Text>
            <View style={mainContent.moreLine} />
          </Touch>
          <View style={mainContent.bannerBox}>
            <Touch onPress={_handleGoToCT} style={mainContent.bannerImageBox}>
              <Image
                source={require('./assets/images/banner.jpg')}
                style={mainContent.bannerImage}
                resizeMode="contain"
              />
            </Touch>
          </View>
        </QNRefreshModel>
      </View>
    );
  }
}
