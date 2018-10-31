import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp, deviceHeight } from '~utils';
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  listContainer: {
    flex: 1,
    marginVertical: pxToDp(15)
  },
  submitBtnContainer: {
    marginBottom: pxToDp(20),
    marginHorizontal: pxToDp(31),
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFAD2C',
    borderRadius: pxToDp(10)
  },
  submitBtnText: {
    color: '#fff',
    fontSize: pxToDp(30),
    fontWeight: 'bold'
  },
  noMore: {
    fontSize: pxToDp(24),
    height: pxToDp(60),
    textAlign: 'center'
  }
});

export default styles;
