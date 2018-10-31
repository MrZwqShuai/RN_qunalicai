/**
 * Copyright (c) 2018-present, Lishan, Inc.
 *
 * @JuCaiFE
 */
import * as React from 'react';
import {
  View,
  StatusBar,
  Platform,
  BackHandler,
  StyleSheet,
  Text
} from 'react-native';
import MyRedBagModal from '~components/MyRedBagModal';
import Share from '~components/Share';
import { DeviceStorage } from '~utils';
import NetWorkInfo from './Config/utils/ls-netInfo/index';
import NewGuidelineScreen from '~pages/NewGuidelineScreen';
import { Root } from 'native-base';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import AppNavigation from '~navigation';
import QNModal from '~components/QNModal';

/**
 * APP.
 */
// useStrict(true);
type Props = {
  RootStore: any;
};

@inject('RootStore')
@observer
export default class AppScreen extends React.Component<Props> {
  componentWillMount() {
    DeviceStorage.get('openNotify').then(val => {
      if (val === null) {
        DeviceStorage.setItem('openNotify', 1);
      }
    });
    if (Platform.OS === 'android') {
      // 安卓的硬件返回
      BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }
  }

  _lastBackPressed;
  _onBackAndroid = () => {
    if (this._navigateRef.state.nav.routes.length > 1) {
      // 因为其他页面获得不到this.props，所以只能每个页面都写这个方法。
      this.props.RootStore.rootRouter.dispatch(NavigationActions.back(null));
      return true;
    }
    if (this._lastBackPressed && this._lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      BackHandler.exitApp();
      return false;
    }
    this._lastBackPressed = Date.now();
    return true;
  };

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }
  }
  render() {
    const {
      RootStore: {
        isShowApp,
        isOpenRootModal,
        renderRoot,
        onCloseModal,
        rootContainerStyle
      }
    } = this.props;

    return (
      <Root>
        <View style={style.appBox}>
          <StatusBar
            hidden={Platform.OS === 'ios' && !isShowApp}
            animated={true}
            translucent={true}
          />
          {isShowApp ? (
            <AppNavigation
              ref={r => {
                this._navigateRef = r;
                this.props.RootStore.updateRootRouter(r);
              }}
            />
          ) : (
            <NewGuidelineScreen />
          )}
          <MyRedBagModal />
          <NetWorkInfo />
          <Share />
          <QNModal
            containerStyle={rootContainerStyle}
            visible={isOpenRootModal}
            closeable={true}
            closeIconType={2}
            onCloseModal={onCloseModal}>
            <View style={style.modalContainer}>
              {renderRoot && renderRoot()}
            </View>
          </QNModal>
        </View>
      </Root>
    );
  }
}

const style = StyleSheet.create({
  appBox: {
    width: '100%',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? 20 : 0
  },
  safeView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  modalContainer: {
    flex: 1,
    height: '100%'
  }
});
