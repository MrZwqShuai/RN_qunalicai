import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
const styles = EStyleSheet.create({
  listItemContainer: {
    backgroundColor: '#fff',
    paddingLeft: pxToDp(38),
    paddingRight: pxToDp(38)
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#EAEAEA',
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(40)
  },
  noBorder: {
    borderBottomWidth: 0
  },
  listType: {
    fontSize: pxToDp(32),
    color: '#333'
  },
  listTime: {
    color: '#666',
    fontSize: pxToDp(28),
    marginTop: pxToDp(20)
  },
  amountText: {
    fontSize: pxToDp(28),
    color: '#333'
  }
});

export default styles;
