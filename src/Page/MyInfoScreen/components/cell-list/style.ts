import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
const styles = EStylesheet.create({
  cellList: {
    backgroundColor: '#fff',
    marginBottom: pxToDp(15),
    paddingTop: pxToDp(16)
  },
  cellItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: pxToDp(31),
    paddingBottom: pxToDp(31),
    paddingLeft: pxToDp(33),
    paddingRight: pxToDp(30)
  },
  cellLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cellIcon: {
    width: pxToDp(32),
    height: pxToDp(32),
    marginRight: pxToDp(21)
  },
  cellTitle: {
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    color: '#333'
  },
  cellRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrow: {
    width: pxToDp(17),
    height: pxToDp(27),
    marginLeft: pxToDp(20)
  },
  cellNote: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noteText: {
    color: '#999999',
    fontSize: pxToDp(24)
  },
  redFont: {
    color: '#FF4B17',
    fontSize: pxToDp(24)
  }
});
export default styles;
