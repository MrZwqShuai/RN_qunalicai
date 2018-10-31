import EStylesheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { pxToDp } from '~utils';
const imgWidth = Dimensions.get('window').width - pxToDp(90);
const imgHeight = Math.floor((Dimensions.get('window').width / 750) * 309);
const styles = EStylesheet.create({
  topWrapper: {
    backgroundColor: '#fff',
    paddingTop: pxToDp(44),
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30)
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: pxToDp(80)
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avator: {
    width: pxToDp(96),
    height: pxToDp(96),
    borderRadius: pxToDp(48),
    marginRight: pxToDp(20)
  },
  infoWrapper: {
    alignItems: 'stretch'
  },
  loginText: {
    color: '#333',
    fontSize: pxToDp(34),
    fontWeight: 'bold'
  },
  userName: {
    fontSize: pxToDp(34),
    fontWeight: 'bold',
    color: '#333333'
  },
  inviteCode: {
    fontSize: pxToDp(24),
    marginTop: pxToDp(5),
    color: '#999999'
  },
  arrowIcon: {
    width: pxToDp(17),
    height: pxToDp(27)
  },
  accountWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accoutText: {
    fontSize: pxToDp(30),
    color: '#333333'
  },
  accountNumer: {
    fontSize: pxToDp(76),
    marginTop: pxToDp(20),
    marginBottom: pxToDp(25),
    fontWeight: 'bold',
    color: '#333333'
  },
  accoutProfit: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profitDesc: {
    color: '#666666',
    fontSize: pxToDp(26)
  },
  profitNumber: {
    color: '#FF4B17',
    fontSize: pxToDp(30),
    marginLeft: pxToDp(16)
  },
  accountRight: {
    width: pxToDp(160),
    height: pxToDp(62),
    borderColor: '#333',
    backgroundColor: '#fff'
  }
});
export default styles;
