import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp, deviceHeight } from '~utils';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listContainer: {
    flex: 1,
    paddingVertical: pxToDp(15)
  },
  noMore: {
    fontSize: pxToDp(24),
    height: pxToDp(60),
    lineHeight: pxToDp(60),
    textAlign: 'center'
  }
});

export default styles;
