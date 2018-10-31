import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  container: {
    backgroundColor: '#fff',
    paddingVertical: pxToDp(20)
  },
  cellItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToDp(94),
    paddingLeft: pxToDp(52),
    paddingRight: pxToDp(32)
  },
  cellLeft: {
    fontSize: pxToDp(30),
    color: '#333',
    fontWeight: 'bold'
  },
  userIcon: {
    width: pxToDp(70),
    height: pxToDp(70),
    borderRadius: pxToDp(35)
  },
  arrowIcon: {
    width: pxToDp(17),
    height: pxToDp(27),
    marginLeft: pxToDp(16)
  },
  cellRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeholer: {
    color: '#999999'
  },
  cellValue: {
    color: '#333333'
  },
  warn: {
    flexDirection: 'row',
    paddingHorizontal: pxToDp(40),
    marginTop: pxToDp(50)
  },
  warnIcon: {
    width: pxToDp(28),
    height: pxToDp(28),
    marginRight: pxToDp(15),
    marginTop: pxToDp(6)
  },
  warnText: {
    flex: 1,
    color: '#999999',
    fontSize: pxToDp(24),
    lineHeight: pxToDp(40)
  }
});
