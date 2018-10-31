import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { RefreshHeader } from 'react-native-spring-scrollview/RefreshHeader';
import styles from '../assets/style';

export default class extends RefreshHeader {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageBox}
          source={
            this.state.status === 'refreshing'
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
    if (s === 'pulling' || s === 'waiting') {
      return '下拉刷新';
    } else if (s === 'pullingEnough') {
      return '释放更新';
    } else if (s === 'refreshing') {
      return '刷新中';
    } else if (s === 'pullingCancel' || s === 'cancelRefresh') {
      return '取消刷新';
    } else if (s === 'rebound') {
      return '刷新成功';
    }
  }
}
