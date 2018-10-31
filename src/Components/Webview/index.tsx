import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  WebView,
  StyleSheet,
  Dimensions,
  BackHandler,
  Platform
} from 'react-native';
import WKWebView from 'react-native-wkwebview-reborn';
import { Indicator,
  BarIndicator,
  BallIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator, } from 'react-native-indicators'
import QNHeader from '~components/QNHeader'
import { headerTitleStyle } from '~utils';
import { RootStore } from '~store';

@inject('ShareStore')
@inject('HomeStore')
class CommonWebview extends React.Component {
  static propTypes = {
    sendData: PropTypes.object,
    styles: PropTypes.object,
    url: PropTypes.string,
    showHeader: PropTypes.bool
  };
  static defaultProps = {
    sendData: {},
    styles: {},
    url: 'https://m.qunalc.com',
    showHeader: true
  };
  constructor(props) {
    super(props);
  }
  state = {
    webTitle: '',
    canGoBack: false,
    loading: true
  };
  sendMessage = () => {
    let lsRN = {
      isApp: 1,
      isRN: 1,
      isLogin: RootStore.isLogin ? 1 : 0,
      userid: RootStore.userId, //
      yqrid: this.props.HomeStore.userinfo ? this.props.HomeStore.userinfo.user.referrerCode : 0,
      // yqid: ,
      ...this.props.sendData
    };
    // 向web端发送数据
    console.log(JSON.stringify(lsRN))
    this.webview.postMessage(JSON.stringify(lsRN));
  };

  /**
   * param {String}  type message类型   Router/Share
   * param {Object}  payload  对应参数  Params
   * - param {String}  routeName 路由名
   * param {} 分享
   * */
  handleMessage = e => {
    let data = e.nativeEvent.data;
    data = data ? JSON.parse(data) : {};
    if (data.type === 'Router') {
      this.props.navigation.navigate(data.payload.routeName);
    } else if (data.type === 'Share') {
      this.props.ShareStore.setShare(data.payload);
      this.props.ShareStore.toggleShareModel();
    } else if(data.type === 'Auth') {
      this.props.navigation.navigate('Auth')
    } else if(data.type === 'ChangeTitle') {
      this.setState({
        webTitle: data.title
      });
    }
  };
  onShouldStartLoadWithRequest = () => {
    return true;
  };
  onNavigationStateChange = navState => {
    this.setState({
      webTitle: navState.title,
      canGoBack: navState.canGoBack
    });
  };
  handlePressOnHeaderLeft = () => {
    if (this.state.canGoBack) {
      this.webview.goBack();
    } else {
      this.props.navigation.goBack(null);
    }
  };
  hideLoading = () => {
    let loading = this.state.loading;
    this.setState({
      loading: false
    });
  };
  _renderLoading = () => {
    return (
      <View style={styles.spinnerContent}>
        <DotIndicator color={'#fd4d1d'} size={12}/>
      </View>
    )
  }
  async componentWillMount() {
    await this.props.HomeStore.loadUserInfo()
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handlePressOnHeaderLeft
      );
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.showHeader ? (
          <View style={styles.header}>
            <QNHeader title={this.state.webTitle} onPress={this.handlePressOnHeaderLeft} backIcon/>
          </View>
        ) : null}
        <WebView
          ref={webview => (this.webview = webview)}
          onMessage={this.handleMessage}
          openNewWindowInWebView={true}
          userAgent={'qnlc'}
          onNavigationResponse={res => {
            console.log(res)
          }}
          onProgress={(progress) => {
            console.log(progress)
          }}
          style={[
            styles.webView,
            {
              ...this.props.styles
            }
          ]}
          onLoadEnd={() => {
            this.sendMessage()
          }}
          source={{ uri: this.props.url, method: 'get' }}
          domStorageEnabled={true}
          decelerationRate={'normal'}
          onNavigationStateChange={this.onNavigationStateChange}
          bounces={false}
          renderLoading={this._renderLoading}
          startInLoadingState={true}
          scalesPageToFit={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  headerTitle: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#000'
  },
  spinnerContent: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10
  },
  webView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, .8)'
  }
});

export default withNavigation(CommonWebview);
