import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
const styles = EStyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: pxToDp(111),
    borderRadius: pxToDp(24),
    zIndex: 101
  },
  descContainer: {
    minHeight: pxToDp(207),
    padding: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: pxToDp(1)
  },
  descText: {
    fontSize: pxToDp(30),
    color: '#333',
    lineHeight: pxToDp(46)
  },
  btnWrapper: {
    height: pxToDp(80),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: pxToDp(80)
  },
  btnText: {
    fontSize: pxToDp(32)
  },
  confirmBtnContainer: {
    borderLeftColor: '#DDDDDD',
    borderLeftWidth: pxToDp(1)
  },
  confirmBtn: {
    color: '#FFAD2C'
  }
});

export default styles;
