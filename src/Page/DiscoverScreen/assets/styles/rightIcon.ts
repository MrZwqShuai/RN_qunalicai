import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  container: {
    position: 'relative'
  },
  icon: {
    width: pxToDp(38),
    height: pxToDp(40)
  },
  badge: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    width: pxToDp(12),
    height: pxToDp(12),
    backgroundColor: 'rgb(255,81,0)',
    borderRadius: pxToDp(12)
  }
});
