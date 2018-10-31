import * as React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const style = EStyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: pxToDp(44),
    paddingLeft: pxToDp(52),
    paddingRight: pxToDp(31),
    // paddingBottom: pxToDp(50)
    paddingBottom: 0
  }
});

export default props => (
  <View style={style.container} {...props}>
    {props.children}
  </View>
);
