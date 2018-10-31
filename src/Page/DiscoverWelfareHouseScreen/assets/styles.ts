import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp, deviceWidth } from '~utils';
const styles = EStylesheet.create({
  wrap: {
    flex: 1
  },
  topContainer: {
    width: deviceWidth,
    height: pxToDp(442),
    backgroundColor: '#fff',
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(32),
    paddingTop: pxToDp(30)
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avator: {
    width: pxToDp(84),
    height: pxToDp(84),
    borderRadius: pxToDp(42),
    marginRight: pxToDp(27)
  },
  userInfoRight: {
    height: pxToDp(84),
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskText: {
    color: '#fff',
    fontSize: pxToDp(30),
    marginRight: pxToDp(16)
  },
  userName: {
    fontSize: pxToDp(34),
    color: '#fff'
  },
  progressContainer: {
    height: pxToDp(262),
    borderRadius: pxToDp(10),
    marginTop: pxToDp(35),
    paddingHorizontal: pxToDp(50),
    paddingVertical: pxToDp(30),
    marginBottom: pxToDp(30)
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  progressText: {
    color: '#666666',
    fontSize: pxToDp(24)
  },
  needBeans: {
    color: '#FFAD2C',
    fontSize: pxToDp(24),
    marginHorizontal: pxToDp(10)
  },
  progressBar: {
    paddingTop: pxToDp(10)
  },
  barTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  currentBeans: {
    fontSize: pxToDp(70),
    color: '#333'
  },
  fullBeanContainer: {
    marginRight: pxToDp(-18)
  },
  fullBean: {
    width: pxToDp(49),
    height: pxToDp(55)
  },
  barMiddle: {
    flexDirection: 'row',
    marginLeft: pxToDp(25),
    marginVertical: pxToDp(16)
  },
  lineContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: pxToDp(6),
    backgroundColor: '#ECECEC',
    height: pxToDp(12)
  },
  line: {
    borderRadius: pxToDp(6),
    height: pxToDp(12),
    backgroundColor: '#FFAD2C'
  },
  progressIcon: {
    position: 'absolute',
    top: pxToDp(-12),
    marginLeft: pxToDp(-34),
    width: pxToDp(48),
    height: pxToDp(48)
  },
  barBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: pxToDp(6),
    height: pxToDp(6),
    borderRadius: pxToDp(3),
    borderColor: '#FFAD2C',
    borderWidth: pxToDp(1),
    marginRight: pxToDp(6)
  },
  bottomText: {
    color: '#999999',
    fontSize: pxToDp(20)
  },
  welfareContainer: {
    marginBottom: pxToDp(15),
    paddingTop: pxToDp(30),
    backgroundColor: '#fff'
  },
  subTitle: {
    paddingHorizontal: pxToDp(32),
    fontSize: pxToDp(32),
    color: '#333',
    fontWeight: 'bold'
  }
});
export default styles;
