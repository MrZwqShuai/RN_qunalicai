import * as React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default class extends React.PureComponent {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.topTitle}>基本信息</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>平台名称</Text>
          <Text style={styles.desc}>PP</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>平台名称</Text>
          <Text style={styles.desc}>PP</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>平台名称</Text>
          <Text style={styles.desc}>PP</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>平台名称</Text>
          <Text style={styles.desc}>PP</Text>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: pxToDp(18),
    paddingHorizontal: pxToDp(31),
    paddingTop: pxToDp(46),
    paddingBottom: pxToDp(13),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  },
  topTitle: {
    marginBottom: pxToDp(60),
    fontWeight: '500',
    fontSize: pxToDp(32)
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: pxToDp(49)
  },
  title: {
    fontSize: pxToDp(28),
    color: '#666',
    fontWeight: '500'
  },
  desc: {
    fontSize: pxToDp(28),
    color: '#333',
    fontWeight: '500'
  }
});
