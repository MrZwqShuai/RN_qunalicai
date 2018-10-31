import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  inputText: {
    backgroundColor: '$white',
    fontSize: pxToDp(30),
    marginTop: pxToDp(21),
    paddingTop: pxToDp(45),
    paddingBottom: pxToDp(20),
    paddingLeft: pxToDp(54),
    paddingRight: pxToDp(38)
  },
  saveButton: {
    fontSize: pxToDp(30),
    fontWeight: '500',
    color: 'rgb(102,102,102)'
  },
  relativeBox: {
    position: 'relative'
  },
  tipText: {
    position: 'absolute',
    right: pxToDp(28),
    bottom: pxToDp(20),
    color: '#666'
  }
});
