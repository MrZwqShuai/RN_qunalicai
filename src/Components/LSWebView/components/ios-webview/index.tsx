/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import WKWebView from 'react-native-wkwebview-reborn';
import * as Progress from 'react-native-progress';
import { isIphoneX, pxToDp } from '~utils';
import Header from '~components/QNHeader';
/**
 * 功能点：
 * 1. 控制导航
 * 2. 有进度条
 * 3. 完成协议网页交互
 */
const windowWidth = Dimensions.get('window').width;

type Props = {
  uri: string;
  isTopNav: boolean;
};

class IOSWebView extends React.Component<Props> {
  private _wkWebview;

  state = {
    canGoBack: false,
    progress: 0,
    isLoading: true
  };

  // propType
  static propTypes = {
    uri: PropTypes.string,
    isTopNav: PropTypes.bool
  };

  static defaultProps = {
    uri: '',
    isTopNav: true
  };

  private _handleLeftNav = async () => {
    const ret = await this._wkWebview.canGoBack();
    if (ret) {
      this._wkWebview.goBack();
    } else {
      // TODO 关闭webview
      // console.log('关闭');
      this.props.navigation.goBack(null);
    }
  };

  private _onShouldStartLoadWithRequest = e => {
    const schema = e.url.match(/^([\s\S]*):\/\//);
    this.setState({
      isLoading: true
    });
    // 接口的处理
    return schema == null || (schema[1] !== 'ios' && schema[1] !== 'app');
  };

  private _onLoadEnd = () => {
    // 执行JS
    // return;
  };

  private _onProgress = progress => {
    this.setState({
      progress
    });
    if (progress >= 1) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.setState({
          isLoading: false,
          progress: 0
        });
      }, 500);
    }
  };

  public render() {
    const {
      props: { uri, isTopNav },
      state: { progress, isLoading },
      _handleLeftNav,
      _onProgress,
      _onShouldStartLoadWithRequest,
      _onLoadEnd
    } = this;

    return (
      <View style={styles.container}>
        {isTopNav ? (
          <Header onGoBack={_handleLeftNav} backIcon={true} title={'test'} />
        ) : null}
        {isLoading ? (
          <Progress.Bar
            progress={progress}
            width={windowWidth}
            height={2}
            borderRadius={0}
            color={'#FFAD2C'}
            borderWidth={0}
            style={styles.progressContainer}
          />
        ) : null}
        <WKWebView
          ref={r => (this._wkWebview = r)}
          source={{ uri, headers: { 'Cache-Control': 'no-cache' } }}
          onProgress={p => _onProgress(p)}
          onShouldStartLoadWithRequest={e => _onShouldStartLoadWithRequest(e)}
          allowsBackForwardNavigationGestures={true}
          onLoadEnd={_onLoadEnd}
          renderError={() => {
            return (
              <View style={{ flex: 1 }}>
                <Text>renderError</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  progressContainer: {
    position: 'absolute',
    left: 0,
    top: pxToDp(91),
    width: '100%',
    height: 2,
    zIndex: 9
  }
});

export default withNavigation(IOSWebView);
