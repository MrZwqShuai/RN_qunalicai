import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5'
  },
  accountContainer: {
    height: pxToDp(341),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: pxToDp(12),
    marginTop: pxToDp(10),
    backgroundColor: '$white'
  },
  accountText: {
    marginTop: pxToDp(46),
    fontSize: pxToDp(32),
    fontWeight: 'bold',
    color: 'rgb(51,51,51)'
  },
  accountImage: {
    width: pxToDp(150),
    height: pxToDp(150)
  }
});
