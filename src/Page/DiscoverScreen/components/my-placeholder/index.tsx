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
        <View style={style.leftBox} />
        <View style={style.middleBox}>
          <View style={style.mtBox} />
          <View style={style.mbBox} />
        </View>
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
    width: '100%',
    height: pxToDp(200),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e6e6',
    backgroundColor: '#fff'
  },
  leftBox: {
    width: pxToDp(165),
    height: pxToDp(120),
    backgroundColor: '$bg'
  },
  middleBox: {
    flex: 1,
    marginLeft: pxToDp(36)
  },
  mtBox: {
    width: '100%',
    height: pxToDp(30),
    marginBottom: pxToDp(16),
    backgroundColor: '$bg'
  },
  mbBox: {
    width: pxToDp(137),
    height: pxToDp(21),
    backgroundColor: '$bg'
  }
});

export default Placeholder.connect(customPlaceholder);
