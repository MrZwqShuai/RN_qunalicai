import EStylesheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import { pxToDp } from '~utils';
const styles = EStylesheet.create({
  box: {
    flex: 1
  },
  container: {
    width: pxToDp(720),
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(80),
    backgroundColor: '#fff',
    borderTopLeftRadius: pxToDp(10),
    borderTopRightRadius: pxToDp(10)
  },
  formContainer: {
    backgroundColor: '#fff'
  },
  warnTitle: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: pxToDp(32),
    lineHeight: pxToDp(62),
    marginBottom: pxToDp(13)
  },
  warnText: {
    color: '#666666',
    fontSize: pxToDp(26),
    lineHeight: pxToDp(40)
  },
  lineImg: {
    width: pxToDp(720),
    height: pxToDp(58),
    marginLeft: pxToDp(-30),
    marginTop: pxToDp(8)
  },
  basicInfoTitle: {
    fontSize: pxToDp(32),
    color: '#333',
    fontWeight: 'bold',
    marginTop: pxToDp(36),
    marginBottom: pxToDp(10)
  },
  formItem: {
    marginLeft: 0,
    height: pxToDp(100),
    backgroundColor: '#fff',
    borderColor: '#EAEAEA'
  },
  inputContainer: {
    paddingBottom: 0,
    flex: 1,
    borderBottomWidth: 0
  },
  inputText: {
    fontSize: pxToDp(28),
    paddingLeft: pxToDp(8)
  },
  investInfoTitle: {
    fontSize: pxToDp(32),
    color: '#333',
    fontWeight: 'bold',
    marginTop: pxToDp(80),
    marginBottom: pxToDp(10)
  },
  cellContainer: {
    flex: 1,
    height: '100%',
    marginLeft: pxToDp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cellLeft: {
    fontSize: pxToDp(28),
    color: 'rgb(153,153,153)',
    fontWeight: '500'
  },
  cellRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cellValue: {
    marginRight: pxToDp(15)
  },
  cellIcon: {
    width: pxToDp(17),
    height: pxToDp(27)
  },
  btnContainer: {
    width: pxToDp(688),
    height: pxToDp(88),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: pxToDp(30),
    marginLeft: pxToDp(16),
    backgroundColor: '#FFAD2C',
    borderRadius: pxToDp(10)
  },
  btnText: {
    color: '#fff',
    fontSize: pxToDp(28)
  },
  endLine: {
    width: pxToDp(720),
    height: pxToDp(17),
    marginTop: pxToDp(-1)
  },
  noBorder: {
    borderBottomWidth: 0
  }
});
export default styles;
