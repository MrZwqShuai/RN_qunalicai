import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils'
const styles = EStyleSheet.create({
  sectionHeader: {
    marginTop: pxToDp(32),
    marginLeft: pxToDp(40)
  },
  sectionHeaderYear: {
    fontSize: pxToDp(30),
    fontWeight: '700',
    marginBottom: pxToDp(34)
  },
  sectionHeaderMonth: {
    fontSize: pxToDp(30),
    fontWeight: '700'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemLeft: {
    marginLeft: pxToDp(160)
  },
  itemLeftDate: {
    fontWeight: '700'
  },
  itemLeftWeek: {
    marginTop: pxToDp(15),
    color: '#999999'
  },
  itemRight: {
    marginRight: pxToDp(48)
  },
  itemRightText: {
    color: '$colorTheme',
    fontSize: pxToDp(25),
    fontWeight: '700'
  },
  separator: {
    height: 1,
    backgroundColor: '$separatorColor',
    marginLeft: pxToDp(160),
    marginTop: pxToDp(26),
    marginBottom: pxToDp(26)
  }

});

export default styles;