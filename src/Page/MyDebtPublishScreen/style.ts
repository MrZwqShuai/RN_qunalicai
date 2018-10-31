import EStylesheet from 'react-native-extended-stylesheet';
import { Platform, Dimensions } from 'react-native';
import { pxToDp } from '~utils';
const styles = EStylesheet.create({
  box: {
    width: Dimensions.get('window').width,
    backgroundColor: '#F5F5F5'
  },
  wrap: {
    marginLeft: pxToDp(16),
    marginRight: pxToDp(14),
  },
  container: {
    marginTop: pxToDp(15),
    borderTopLeftRadius: pxToDp(10),
    borderTopRightRadius: pxToDp(10)
  },
  formContainer: {
    backgroundColor: '#fff'
  },
  section_one: {
    marginTop: pxToDp(15),
    marginBottom: pxToDp(16),
    paddingLeft: pxToDp(29),
    paddingRight: pxToDp(32),
    paddingBottom: pxToDp(45),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  },
  warnTitle: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: pxToDp(32),
    lineHeight: pxToDp(62),
    marginTop: pxToDp(30),
    marginBottom: pxToDp(13)
  },
  warnText: {
    color: '#666666',
    fontSize: pxToDp(26),
    lineHeight: pxToDp(40)
  },
  warnText_2: {
    marginTop: pxToDp(20),
  },
  section_two: {
    marginTop: pxToDp(16),
    borderRadius: pxToDp(10),
    paddingLeft: pxToDp(29),
    paddingRight: pxToDp(32),
    paddingBottom: pxToDp(30)
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
    marginTop: pxToDp(30),
    marginBottom: pxToDp(10)
  },
  cellContainer: {
    flex: 1,
    height: '100%',
    marginLeft: pxToDp(49),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cellTitle: {
    fontSize: pxToDp(32),
    color: '#333333'
  },
  cellLeft: {
    fontSize: pxToDp(26),
    color: 'rgb(153,153,153)',
    fontWeight: '500'
  },
  cellRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cellValue: {
    marginRight: pxToDp(15),
    color: '#333'
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
  },
  section_three: {
    marginTop: pxToDp(37),
    marginBottom: pxToDp(82),
  },
  agreement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: pxToDp(26),
  },
  agreementCheckBox: {
  },
  agreementTxt: {
    marginLeft: pxToDp(19),
    fontSize: pxToDp(26),
    color: '#666666'
  },
  outerRing: {
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToDp(26),
    height: pxToDp(26),
    borderWidth: pxToDp(2),
    borderColor: '#666666',
    borderRadius: pxToDp(13),
  },
  innerRing: {
    width: pxToDp(10),
    height: pxToDp(10),
    borderRadius: pxToDp(5),
    backgroundColor: '#666666',
  },
  submitBtnContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: pxToDp(82),
  },
  submitBtn: {
    width: pxToDp(688),
    height: pxToDp(88),
    lineHeight: pxToDp(88),
    textAlign: 'center',
    fontSize: pxToDp(28),
    borderRadius: pxToDp(10),
    color: '#fff',
    backgroundColor: '#FFAD2C'
  }
});
export default styles;
