import * as React from 'react';
import { StyleSheet, Platform, AsyncStorage, View } from 'react-native';
import { Provider } from 'mobx-react';
import SplashScreen from 'react-native-splash-screen';
import * as StoreContainer from '~store';
import '~style';
import JPushModule from 'jpush-react-native';
import { NavigationActions } from 'react-navigation';
import App from './App';
import { DeviceStorage } from '~utils';
import CodePush from 'react-native-code-push';

class AppManifest extends React.PureComponent {
  constructor(props) {
    super(props);
    // AsyncStorage.clear();
    this._configure();
  }

  state = {
    isLaunchApp: false
  };

  // _lastBackPressed;

  _configure = async () => {
    let isFirst = await AsyncStorage.getItem('isFirst');
    const userId = await AsyncStorage.getItem('userId');
    // 测试
    // isFirst = '1';
    //
    StoreContainer.RootStore.setShowApp(!!isFirst);
    StoreContainer.RootStore.setUserId(userId);

    if (Platform.OS === 'android') {
      //  启动屏
      const timer = setTimeout(() => {
        clearTimeout(timer);
        SplashScreen.hide();
      }, 500);

      // JPUSH
      JPushModule.initPush();
      JPushModule.getInfo(map => {
        // console.log('getInfo:', map);
      });
      JPushModule.notifyJSDidLoad(resultCode => {
        console.log('notifyJSDidLoad');
      });
      // 安卓的硬件返回
      // BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    } else {
      JPushModule.setupPush();
    }
    DeviceStorage.get('openNotify').then(val => {
      if (val === 0) {
        // 如果缓存中已经关闭了通知，则进行停止推送
        JPushModule.stopPush();
      }
    });

    JPushModule.addReceiveCustomMsgListener(map => {
      console.log('收到自定义消息:', map);
    });

    JPushModule.addReceiveNotificationListener(map => {
      console.log('收到通知消息alertContent:', map.alertContent);
      console.log('收到通知消息extras:', map.extras);
    });

    JPushModule.addReceiveOpenNotificationListener(map => {
      const extras = JSON.parse(map.extras); // 解析数据，进行跳转页面
      switch (extras.type) {
        case 'web':
          StoreContainer.RootStore.rootRouter.dispatch(
            NavigationActions.navigate({
              routeName: 'HomeWebview',
              params: extras
            })
          );
          break;
        case 'native':
          StoreContainer.RootStore.rootRouter.dispatch(
            NavigationActions.navigate({
              routeName: extras.url,
              params: extras
            })
          );
          break;
        default:
          StoreContainer.RootStore.rootRouter.dispatch(
            NavigationActions.navigate({
              routeName: 'Home'
            })
          );
      }
    });
    JPushModule.addGetRegistrationIdListener(registrationId => {
      console.log('Device register succeed, registrationId:', registrationId);
    });

    this.setState({
      isLaunchApp: true
    });
  };

  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener('receivePushMsg');
    JPushModule.removeReceiveNotificationListener('receiveNotification');
    JPushModule.removeReceiveOpenNotificationListener('openNotification');
    JPushModule.removeGetRegistrationIdListener('getRegistrationId');
    JPushModule.clearAllNotifications();
  }

  render() {
    return (
      <Provider {...StoreContainer}>
        {(this.state.isLaunchApp && <App />) || (
          <View style={style.whiteBackground} />
        )}
      </Provider>
    );
  }
}

const style = StyleSheet.create({
  appImage: {
    width: '100%',
    height: '100%'
  },
  whiteBackground: {
    backgroundColor: '#fff'
  }
});

export default AppManifest;
// export default CodePush(AppManifest);
