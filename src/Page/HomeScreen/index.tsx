import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Button
} from 'react-native';
import Modal from 'react-native-simple-modal';
import styles from './assets/style';
import SwiperComponent from './components/swiper/swiper';
import NavComponent from './components/nav';
import RecommendPlatform from './components/recommend-platform';
import BottomService from './components/bottomService';
import QNHeader from '../../Components/QNHeader';
import QNRefreshModel from '~components/QNRefreshModel';
import ShadowImage from './components/swiperShadow';

@inject('RootStore', 'HomeStore', 'NoticeListStore')
@observer
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('userId:', props.RootStore.userId);
  }
  state = {
    appName: '去哪理财'
  };

  modalDidClose = () => {
    this.setState({ open: false });
    console.log('Modal did close.');
  };

  naviToWebView = appUrl => {
    const { navigation } = this.props;
    navigation.navigate('HomeWebview', {
      url: appUrl
    });
  };
  _toNoticeList = () => {
    this.props.navigation.navigate('NoticeList');
  };
  _renderBell = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.pr}
      onPress={this._toNoticeList}>
      <Image
        style={styles.headerBell}
        source={require('./assets/images/small-bell.png')}
      />
      {/*<View style={styles.msgPoint} />*/}
    </TouchableOpacity>
  );
  _refresh = () => {
    this.props.HomeStore.loadBannerList({ version: 2 });
    this.props.HomeStore.loadRecommendList();
  };
  _toAuth = () => {
    this.props.navigation.navigate('Auth', {
      from: 'Home'
    });
  };
  componentWillMount() {}
  componentDidMount() {}
  render() {
    const { isLogin } = this.props.RootStore;
    return (
      <View style={[styles.homeView]}>
        <QNHeader title={this.state.appName} HeaderRight={this._renderBell} />
        <QNRefreshModel view onRefresh={this._refresh} style={styles.wrapper}>
          <View style={[styles.mainTop, isLogin && styles.loginMainTop]}>
            <SwiperComponent naviToWebView={this.naviToWebView} />
            <ShadowImage />
            <NavComponent naviToWebView={this.naviToWebView} />
            {!isLogin ? (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.register}
                onPress={this._toAuth}>
                <Image
                  style={styles.regImage}
                  source={require('./assets/images/get-red.png')}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <RecommendPlatform />
          <BottomService />
          <View style={styles.bottomInfo}>
            <Text style={styles.bottomInfoText}>
              ——天呐，你已经看到了底部啦——
            </Text>
          </View>
        </QNRefreshModel>
      </View>
    );
  }
}
