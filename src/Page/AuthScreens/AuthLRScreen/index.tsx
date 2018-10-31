import * as React from 'react';
import {
  View,
  Image,
  Keyboard,
  Animated,
  ScrollView,
  TextInput
} from 'react-native';
import QNHeader from '~components/QNHeader';
import { ScrollableTabView, DefaultTabBar } from '~components/ScrollTabView';
import style from './assets/style';
import Login from './components/login';
import Register from './components/register';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const POP_HEIGHT = 120;
export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  // </Animated.View>

  render() {
    return (
      <View style={style.container}>
        <QNHeader title="" backIcon />
        <KeyboardAwareScrollView
          // extraHeight={120}
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
          contentContainerStyle={style.wrap}>
          <View style={[style.container]}>
            <Image
              source={require('./assets/images/auth_logo.png')}
              style={style.logoBox}
            />
            <ScrollableTabView
              initialPage={0}
              renderTabBar={() => <DefaultTabBar />}>
              <View style={style.wrapScroll} tabLabel="登录">
                <Login />
              </View>
              <View style={style.wrapScroll} tabLabel="注册">
                <Register />
              </View>
            </ScrollableTabView>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
