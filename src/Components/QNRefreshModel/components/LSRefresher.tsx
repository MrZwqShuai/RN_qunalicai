import * as React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';
import MJRefresh from 'react-native-mjrefresh';
import {
  SmartRefreshControl,
  AnyHeader
} from 'react-native-smartrefreshlayout';
import { pxToDp, sleep } from '~utils';
import { BarIndicator } from 'react-native-indicators';

const REFRESH_HEIGHT = 60;

export default class LSRefresher extends React.Component {
  state = {
    refreshText: ''
  };

  static propTypes = {
    onRefresh: PropTypes.func
  };

  _refresh;

  _onReleased = () => {
    this.setState({
      refreshText: '刷新中'
    });
  };

  _onRefresh = async () => {
    if (Platform.OS === 'ios') {
      this._onReleased();
    }
    await sleep(1500);
    await this.props.onRefresh();
    this._refresh && this._refresh.finishRefresh();
  };

  _onReleaseToRefresh = () => {
    this.setState({
      refreshText: '释放刷新'
    });
  };

  _onPulling = e => {
    // console.log(object);
    if (
      (Platform.OS === 'ios' && e.nativeEvent.percent < 0.1) ||
      Platform.OS === 'android'
    ) {
      this.setState({
        refreshText: '下拉刷新'
      });
    }
  };

  // IOS
  _renderIosRefresher = () => {
    const {
      state: { refreshText },
      _onRefresh,
      _onReleaseToRefresh,
      _onPulling,
      _commonContent
    } = this;

    return (
      <MJRefresh
        ref={ref => (this._refresh = ref)}
        onRefresh={_onRefresh}
        onReleaseToRefresh={_onReleaseToRefresh}
        onPulling={e => _onPulling(e)}>
        <View style={style.container}>{_commonContent()}</View>
      </MJRefresh>
    );
  };

  _renderAndroidRefresher = () => {
    const {
      state: { refreshText },
      props: { children },
      _onRefresh,
      _onReleaseToRefresh,
      _onPulling,
      _onReleased,
      _commonContent
    } = this;

    return (
      <SmartRefreshControl
        style={{ flex: 1 }}
        children={children}
        ref={ref => (this._refresh = ref)}
        onRefresh={_onRefresh}
        onPullDownToRefresh={_onPulling}
        onHeaderReleased={_onReleased}
        onReleaseToRefresh={_onReleaseToRefresh}
        headerHeight={REFRESH_HEIGHT}
        HeaderComponent={
          <AnyHeader style={style.container}>{_commonContent()}</AnyHeader>
        }
      />
    );
  };

  _commonContent = () => {
    if (this.state.refreshText === '刷新中') {
      return <BarIndicator color="#fe4d1b" size={15} />;
    }

    return (
      <React.Fragment>
        <Image
          style={style.imageBox}
          source={require('../assets/images/loading.p.png')}
        />
        <Text style={style.refreshText}>{this.state.refreshText}</Text>
      </React.Fragment>
    );
  };

  render() {
    const { _renderIosRefresher, _renderAndroidRefresher } = this;

    return Platform.OS === 'ios'
      ? _renderIosRefresher()
      : _renderAndroidRefresher();
  }
}

const style = StyleSheet.create({
  container: {
    height: REFRESH_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageBox: {
    width: 20,
    height: 20
  },
  refreshText: {
    marginLeft: pxToDp(20),
    color: '#666'
  }
});
