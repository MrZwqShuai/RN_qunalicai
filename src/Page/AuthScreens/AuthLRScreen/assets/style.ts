import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  wrap: {
    flex: 1
  },
  wrapScroll: {
    marginHorizontal: pxToDp(30),
    marginTop: pxToDp(30)
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logoBox: {
    width: pxToDp(119),
    height: pxToDp(119),
    marginTop: pxToDp(23),
    marginBottom: pxToDp(56)
  },
  tipBox: {
    width: '100%',
    marginTop: pxToDp(40),
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tipText: {
    color: 'rgb(105,114,126)',
    fontSize: pxToDp(26),
    fontWeight: '500'
  },
  textContainerStyle: {
    marginBottom: pxToDp(30)
  },
  loginBBox: {
    marginTop: pxToDp(100)
  },
  registerBBox: {
    '@media ios': {
      marginTop: pxToDp(120)
    },
    '@media android': {
      marginTop: pxToDp(100)
    }
  }
});
