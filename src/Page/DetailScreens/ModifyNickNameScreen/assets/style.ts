import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  headerRight: {
    color: '#666666',
    fontSize: pxToDp(30),
    fontWeight: '500'
  },
  wrap: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    paddingHorizontal: pxToDp(30)
  },
  inputContainer: {
    height: pxToDp(120),
    paddingBottom: 0
  },
  warn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(72)
  },
  warnIcon: {
    width: pxToDp(28),
    height: pxToDp(28),
    marginRight: pxToDp(15)
  },
  warnText: {
    color: '#999999',
    fontSize: pxToDp(24)
  },
  saveText: {
    color: '#666',
    fontSize: pxToDp(30)
  }
});
