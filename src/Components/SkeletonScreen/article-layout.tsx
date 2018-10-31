import * as React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Animated } from 'react-native';
export default function createArticleSkeletonScreen(SkeletonScreen) {
  return class extends React.PureComponent {

    fadeAnim = new Animated.Value(0);

    constructor(props) {
      super(props);
      this.state = {
        fadeAnim: new Animated.Value(0), //设置初始值
      };
    }

    render() {
      let props = {
        ...this.props,
        top: true,
        bottom: true,
        middle: false
      }
      return (
        <SkeletonScreen {...props}>
          <View style={styles.wrap}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <Animated.View style={[styles.rightItem, { width: this.fadeAnim }]}></Animated.View>
              <View style={styles.rightItemSec}></View>
            </View>
          </View>
        </SkeletonScreen>
      )
    }

    componentDidMount() {
      this.startAnimate();
    }

    startAnimate() {
      this.fadeAnim.setValue(0);
      Animated.timing(
        this.fadeAnim,
        {
          toValue: 200,
          duration: 1000
        }
      ).start(() => {
        this.startAnimate();
      });
    }
  }
}

const styles = EStyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  skeletonContianer: {
    marginLeft: 10,
    marginRight: 10,
  },
  left: {
    width: 80,
    height: 80,
    backgroundColor: '#eee'
  },
  right: {
    width: 220,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  rightItem: {
    width: '100%',
    height: 20,
    marginTop: 15,
    backgroundColor: '#eee'
  },
  rightItemSec: {
    width: '90%',
    height: 20,
    marginTop: 10,
    backgroundColor: '#eee'
  }
})