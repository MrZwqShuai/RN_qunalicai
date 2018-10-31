import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import { Platform } from 'react-native';
export default EStyleSheet.create({
  // 局部变量
  $top: pxToDp(20),
  $right: pxToDp(30),
  //
  container: {
    // position: 'relative',
    // paddingTop: Platform.OS === 'android' ? pxToDp(5) : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 99,
    width: '100%',
    height: pxToDp(91),
    backgroundColor: '#fff',
    // paddingRight: '$right',
    paddingHorizontal: '$right',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: 'rgb(234,234,234)'
  },
  arrow: {
    flexDirection: 'column',
    width: 30,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center'
    // left: '$right'
    // height: pxToDp(34),
    // paddingLeft: '$right'
  },
  title: {
    fontSize: pxToDp(38),
    fontWeight: 'bold',
    color: 'rgb(51,51,51)'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
