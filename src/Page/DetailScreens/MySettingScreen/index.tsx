import * as React from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import { Button, Switch } from 'native-base';
import { observer, inject } from 'mobx-react';
import CacheManager from 'react-native-clear-cache';
import { DeviceStorage } from '~utils';
import QNHeader from '~components/QNHeader';
import Touch from '~components/QNTouch';
import Toast from '~components/NewToast';
import style from './assets/style';
import QNAlert from '~components/QNAlert';
@inject('RootStore')
@observer
export default class extends React.Component {
  state = {
    cacheSize: 0,
    openNotify: true // 是否已经开启或关闭消息通知
  };

  _handleGoSuggest = () => {
    this.props.navigation.navigate('Suggest');
  };

  _handleLogout = async () => {
    const that = this;
    this.QNAlert.init({
      content: '确定退出吗？',
      isConfirm: true,
      handleConfirm: async () => {
        that.props.RootStore.setIsLogin(false);
        that.props.RootStore.setUserId('');
        await AsyncStorage.removeItem('userId');
        that.props.navigation.navigate('MyInfo');
      }
    });
  };

  _getCacheSize = () => {
    CacheManager.getCacheSize((value, unit) => {
      this.setState({
        cacheSize: value
      });
    });
  };

  _handleClearSize = () => {
    if (this.state.cacheSize != 0) {
      CacheManager.runClearCache(() => {
        this.setState({
          cacheSize: 0
        });
        Toast.show('清除缓存成功');
      });
    } else {
      Toast.show('缓存已经很干净咯');
    }
  };
  componentWillMount() {
    DeviceStorage.get('openNotify').then(val => {
      this.setState({
        openNotify: val
      });
    });
  }

  componentDidMount = () => {
    this._getCacheSize();
  };

  render() {
    const {
      _handleLogout,
      _handleGoSuggest,
      _handleClearSize,
      state: { cacheSize, openNotify }
    } = this;

    return (
      <View>
        <QNAlert ref={r => (this.QNAlert = r)} />
        <QNHeader title="设置" backIcon />
        <View style={style.wrapper}>
          <View style={style.listItem}>
            <Text style={style.listItemTitle}>消息通知</Text>
            <Switch
              value={openNotify ? true : false}
              onValueChange={val => {
                if (val) {
                  this.props.RootStore.onResumePress();
                  this.setState({ openNotify: 1 });
                } else {
                  this.props.RootStore.onStopPress();
                  this.setState({ openNotify: 0 });
                }
              }}
            />
          </View>
          <View style={style.listItem}>
            <Text style={style.listItemTitle}>检查版本</Text>
            <Text style={style.rightText}>已是最新版本</Text>
          </View>
          <Touch style={style.listItem} onPress={_handleClearSize}>
            <Text style={style.listItemTitle}>清除缓存</Text>
            <Text style={style.rightText}>{cacheSize}M</Text>
          </Touch>
          <Touch style={style.listItem} onPress={_handleGoSuggest}>
            <Text style={style.listItemTitle}>意见反馈</Text>
            <View style={style.comFD}>
              <Text style={style.rightText}>欢迎您提出宝贵的意见</Text>
              <Image
                source={require('./assets/images/setting_arrow_right.png')}
                style={style.rightIcon}
              />
            </View>
          </Touch>
        </View>
        <Button block style={style.buttonContainer} onPress={_handleLogout}>
          <Text style={style.buttonText}>退出当前账户</Text>
        </Button>
      </View>
    );
  }
}
