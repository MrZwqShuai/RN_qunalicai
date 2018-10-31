import * as React from 'react';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const customPlaceholder = props => {
  let PlaceholderContent = [];
  for (var i = 0; i < props.lineNumber; i++) {
    PlaceholderContent.push(
      <View style={style.container} key={i}>
        <View style={style.leftBox}>
          <View style={style.ltBox} />
          <View style={style.lbBox} />
        </View>
        <View style={style.middleBox}>
          <View style={style.mtBox} />
          <View style={style.mmBox} />
          <View style={style.mbBox} />
        </View>
        <View style={style.rightBox} />
      </View>
    );
  }

  return <View style={style.wrap}>{PlaceholderContent}</View>;
};

const style = EStyleSheet.create({
  $bg: '#eee',
  wrap: {
    flex: 1,
    marginHorizontal: pxToDp(6),
    marginTop: pxToDp(9)
  },
  container: {
    width: '100%',
    height: pxToDp(231),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pxToDp(8),
    backgroundColor: '#fff'
  },
  leftBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ltBox: {
    width: pxToDp(60),
    height: pxToDp(40),
    backgroundColor: '$bg',
    marginBottom: pxToDp(35)
  },
  lbBox: {
    width: pxToDp(102),
    height: pxToDp(25),
    backgroundColor: '$bg'
  },
  middleBox: {
    width: pxToDp(337),
    marginLeft: pxToDp(56),
    marginRight: pxToDp(36),
    justifyContent: 'center'
  },
  mtBox: {
    width: pxToDp(220),
    height: pxToDp(31),
    backgroundColor: '$bg'
  },
  mmBox: {
    width: pxToDp(337),
    height: pxToDp(57),
    marginVertical: pxToDp(23),
    backgroundColor: '$bg'
  },
  mbBox: {
    width: pxToDp(262),
    height: pxToDp(25),
    backgroundColor: '$bg'
  },
  rightBox: {
    width: pxToDp(126),
    height: pxToDp(65),
    borderRadius: pxToDp(33),
    backgroundColor: '$bg'
  }
});

export default Placeholder.connect(customPlaceholder);
