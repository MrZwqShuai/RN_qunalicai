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
          <View style={style.imageBox} />
          <View style={style.middleBox}>
            <View style={[style.middleLine, style.a]} />
            <View style={[style.middleLine, style.b]} />
            <View style={[style.middleLine, style.c]} />
          </View>
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
    flex: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pxToDp(32),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(40),
    backgroundColor: '$white',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: 'rgb(234,234,234)'
  },
  leftBox: {
    flexDirection: 'row'
  },
  imageBox: {
    width: pxToDp(94),
    height: pxToDp(94),
    borderRadius: pxToDp(60),
    marginRight: pxToDp(32),
    backgroundColor: '$bg'
  },
  middleBox: {
    flexDirection: 'column'
  },
  middleLine: {
    // width:pxToDp(114),
    height: pxToDp(30),
    backgroundColor: '$bg',
    marginBottom: pxToDp(20)
  },
  a: {
    width: pxToDp(114)
  },
  b: {
    width: pxToDp(363)
  },
  c: {
    width: pxToDp(67)
  },
  rightBox: {
    width: pxToDp(130),
    height: pxToDp(130),
    borderRadius: pxToDp(10),
    backgroundColor: '$bg'
  }
});

export default Placeholder.connect(customPlaceholder);
