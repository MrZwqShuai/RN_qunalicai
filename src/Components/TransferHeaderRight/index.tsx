import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, Animated, Easing } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Touch from '~components/QNTouch';
import { pxToDp } from '~utils';

type Props = {
  type: number;
  navigation: any;
};

export default class extends React.PureComponent<Props> {
  public state = {
    isShowPop: false,
    bounceValue: new Animated.Value(0),
    opacityValue: new Animated.Value(0)
  };

  public static propsType = {
    // type 0 承接 1 债转
    type: PropTypes.number,
    navigation: PropTypes.object
  };

  private toggleAnimation = () => {
    const { isShowPop, bounceValue } = this.state;
    if (isShowPop) {
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 150, //动画时长3000毫秒
        easing: Easing.linear
      }).start();
    } else {
      Animated.timing(bounceValue, {
        toValue: 0,
        duration: 150, //动画时长3000毫秒
        easing: Easing.linear
      }).start();
    }
  };

  public render() {
    const {
      props: { type, navigation },
      state: { bounceValue }
    } = this;

    return (
      <View>
        <Touch
          onPress={() => {
            this.state.isShowPop = !this.state.isShowPop;
            this.toggleAnimation();
          }}>
          <Text>点击</Text>
        </Touch>
        <Animated.View
          style={[
            styles.popContainer,
            {
              transform: [{ scale: bounceValue }]
            }
          ]}>
          <View style={styles.popOuterTriangle} />
          <View style={styles.popInnerTriangle} />
          <View style={styles.popBox}>
            <Touch
              style={styles.popBoxItem}
              onPress={() => {
                navigation.navigate(type === 0 ? 'MyUndertake' : 'MyDept');
              }}>
              <Text style={styles.popText}>切换身份</Text>
            </Touch>
            <View style={styles.popLine} />
            <Touch
              style={styles.popBoxItem}
              onPress={() => {
                navigation.navigate('ButtonDescription');
              }}>
              <Text style={styles.popText}>按钮说明</Text>
            </Touch>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  //
  popContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 20
  },
  popOuterTriangle: {
    position: 'absolute',
    top: -9,
    right: 10,
    zIndex: 9,
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: '#999',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popInnerTriangle: {
    position: 'absolute',
    top: -8,
    right: 11,
    zIndex: 10,
    width: 0,
    height: 0,
    borderRightWidth: 9,
    borderRightColor: 'transparent',
    borderLeftWidth: 9,
    borderLeftColor: 'transparent',
    borderBottomWidth: 9,
    borderBottomColor: '#fff'
  },
  popBox: {
    width: pxToDp(191),
    height: pxToDp(175),
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: pxToDp(10),
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  popBoxItem: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popText: {
    fontSize: pxToDp(26),
    color: '#333'
  },
  popLine: {
    width: pxToDp(128),
    height: 1,
    backgroundColor: '#999'
  }
});
