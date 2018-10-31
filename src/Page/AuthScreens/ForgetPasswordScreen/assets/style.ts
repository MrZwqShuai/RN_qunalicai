import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  container: {
    marginTop: pxToDp(23),
    marginLeft: pxToDp(56),
    marginRight: pxToDp(46),
    alignItems: 'center'
  },
  logoBox: {
    width: pxToDp(119),
    height: pxToDp(119),
    marginBottom: pxToDp(56)
  },
  buttonBox: {
    // width: pxToDp(608),
    width: '100%',
    marginTop: pxToDp(100),
    marginBottom: pxToDp(54)
  },
  tipBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tipText: {
    color: 'rgb(105,114,126)',
    fontSize: pxToDp(26),
    fontWeight: '500'
  },
  textContainerStyle: {
    marginTop: pxToDp(60)
  }
});
