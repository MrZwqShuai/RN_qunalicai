import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
const styles = EStylesheet.create({
  wrap: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  setIcon: {
    width: pxToDp(40),
    height: pxToDp(40),
    marginVertical: pxToDp(25),
    marginLeft: pxToDp(25)
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: pxToDp(111)
  },
  footerText: {
    marginLeft: pxToDp(16),
    marginRight: pxToDp(16),
    fontSize: pxToDp(24),
    color: '#999999'
  },
  line: {
    height: pxToDp(1),
    width: pxToDp(40),
    backgroundColor: '#999999'
  }
});
export default styles;
