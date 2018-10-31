import * as React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default class extends React.PureComponent {
  private badges = [
    {
      uri: require('../../assets/images/icon_free.png'),
      title: '免费发布'
    },
    {
      uri: require('../../assets/images/icon_save.png'),
      title: '平台担保'
    },
    {
      uri: require('../../assets/images/icon_fast.png'),
      title: '快速到账'
    }
  ];

  render() {
    return (
      <View style={styles.wrapper}>
        {this.badges.map(({ uri, title }, index) => {
          return (
            <View style={styles.badgeItem} key={index}>
              <Image source={uri} style={styles.image} />
              <Text style={styles.title}>{title}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: pxToDp(18),
    marginBottom: pxToDp(31),
    paddingHorizontal: pxToDp(62),
    paddingTop: pxToDp(38),
    paddingBottom: pxToDp(35),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  },
  badgeItem: {
    alignItems: 'center'
  },
  image: {
    width: pxToDp(60),
    height: pxToDp(60),
    marginBottom: pxToDp(35)
  },
  title: {
    fontWeight: '500',
    fontSize: pxToDp(28)
  }
});
