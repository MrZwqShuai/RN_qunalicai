import * as React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default class extends React.PureComponent {
  private tips = ['定额五千新手21天标返现+京东卡50+利益35;', '京东卡投资'];

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.topTitle}>重要提示</Text>
        {this.tips.map((item, index) => {
          return (
            <View style={styles.itemContainer} key={index}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{index + 1}</Text>
              </View>
              <Text style={styles.desc}>{item}</Text>
            </View>
          );
        })}
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
    paddingBottom: pxToDp(36),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  },
  topTitle: {
    marginBottom: pxToDp(49),
    fontWeight: '500',
    fontSize: pxToDp(32)
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: pxToDp(23)
  },
  titleWrapper: {
    width: pxToDp(30),
    height: pxToDp(30),
    marginRight: pxToDp(21),
    overflow: 'hidden',
    borderRadius: pxToDp(30)
  },
  title: {
    width: '100%',
    height: '100%',
    fontSize: pxToDp(26),
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: pxToDp(30),
    backgroundColor: '#bbb'
  },
  desc: {
    fontSize: pxToDp(28),
    color: '#333',
    fontWeight: '500'
  }
});
