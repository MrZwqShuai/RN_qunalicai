import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils'
const styles = EStyleSheet.create({
  footerContainer: {
    height: pxToDp(100),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;