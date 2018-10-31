import * as React from 'react';
import { View, Text, Image } from 'react-native';
import {
  LoadingFooter,
  FooterStatus
} from 'react-native-spring-scrollview/LoadingFooter';
import styles from '../assets/style';

export default class extends LoadingFooter {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageBox}
          source={
            this.state.status === 'loading'
              ? require('../assets/images/loading.g.gif')
              : require('../assets/images/loading.p.png')
          }
        />
        <Text style={styles.refreshText}>{this._getTitle()}</Text>
      </View>
    );
  }

  _getTitle() {
    const s = this.state.status;
    if (s === 'dragging' || s === 'waiting') {
      return '上拉加载';
    } else if (s === 'draggingEnough') {
      return '释放加载';
    } else if (s === 'loading') {
      return '加载中';
    } else if (s === 'draggingCancel' || s === 'cancelLoading') {
      return '取消加载';
    } else if (s === 'rebound') {
      return '加载成功';
    }
  }
}
