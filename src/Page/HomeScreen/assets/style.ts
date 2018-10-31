import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import { PixelRatio } from 'react-native';

const styles = EStyleSheet.create({
  column: {
    width: '80%', // 80% of screen width
    color: 'red'
  },
  container: {
    height: pxToDp(80),
    backgroundColor: 'yellow'
  },
  pr: {
    position: 'relative'
  },
  text: {
    fontSize: pxToDp(32),
    color: 'red'
  },
  rowFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexBox: {
    flex: 1
  },
  homeView: { flex: 1, backgroundColor: '#f8f8f8' },
  wrapper: {
    position: 'relative',
    flex: 1
  },
  scrollHeader: {
    position: 'absolute',
    display: 'flex',
    opacity: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: pxToDp(120),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eaeaea',
    left: 0,
    right: 0,
    zIndex: 0
  },
  headerIndex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: pxToDp(92),
    paddingLeft: pxToDp(16),
    paddingRight: pxToDp(30),
    backgroundColor: '#fff'
  },
  headerText: {
    color: '#333',
    fontSize: pxToDp(38),
    fontWeight: 'bold'
  },
  headerTextBottom: {
    bottom: -pxToDp(20)
  },
  headerBell: {
    width: pxToDp(40),
    height: pxToDp(40),
    resizeMode: 'center'
  },
  msgPoint: {
    position: 'absolute',
    top: pxToDp(4),
    right: pxToDp(2),
    width: pxToDp(12),
    height: pxToDp(12),
    borderRadius: pxToDp(8),
    backgroundColor: '#ff5100'
  },
  mainTop: {
    backgroundColor: '#fff'
  },
  loginMainTop: {
    paddingBottom: pxToDp(42)
  },
  banner: {
    position: 'relative',
    marginLeft: pxToDp(16),
    marginRight: pxToDp(16),
    height: pxToDp(375),
    borderRadius: pxToDp(16),
    overflow: 'hidden',
    zIndex: 10
  },
  bannerBottom: {
    position: 'absolute',
    height: pxToDp(43),
    width: '100%',
    bottom: -1,
    left: 0,
    resizeMode: 'stretch'
  },
  swiperWrapper: {
    width: '100%',
    height: pxToDp(375)
  },
  swiperImg: {
    width: '100%',
    height: pxToDp(375)
    // resizeMode: 'stretch'
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: pxToDp(26)
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navIcon: {
    width: pxToDp(117),
    height: pxToDp(117),
    resizeMode: 'contain'
  },
  navText: {
    textAlign: 'center',
    color: '#666',
    fontSize: pxToDp(30),
    marginTop: pxToDp(12)
  },
  scrollInfo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: pxToDp(75),
    marginTop: pxToDp(20),
    borderTopColor: '#ddd',
    borderTopWidth: 1 / PixelRatio.get()
  },
  bellIcon: {
    marginRight: pxToDp(21),
    marginLeft: pxToDp(21)
  },
  scrollInfoIcon: {
    width: pxToDp(40),
    height: pxToDp(40),
    resizeMode: 'contain'
  },
  scrollInfoSwiper: {
    flex: 1
  },
  goDetail: {
    marginRight: pxToDp(20),
    width: pxToDp(30),
    height: pxToDp(30)
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  regImage: {
    width: '100%',
    height: pxToDp(300),
    resizeMode: 'contain'
  },
  remTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: pxToDp(120)
  },
  remTitleText: {
    marginLeft: pxToDp(32),
    fontSize: pxToDp(32),
    color: '#666',
    fontWeight: 'bold'
  },
  platformItem: {
    height: pxToDp(368),
    marginBottom: pxToDp(20),
    backgroundColor: '#fff'
  },
  platformHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    width: pxToDp(260),
    height: pxToDp(70),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerLogo: {
    width: pxToDp(160),
    height: pxToDp(120),
    resizeMode: 'contain'
  },
  headerType: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: pxToDp(20)
  },
  typeBg: {
    position: 'absolute',
    resizeMode: 'contain',
    width: pxToDp(102),
    height: pxToDp(52)
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  platformBody: {
    borderBottomColor: '#ddd',
    borderTopColor: '#ddd',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    marginRight: pxToDp(20),
    marginLeft: pxToDp(20)
  },
  platformContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(188)
  },
  dataItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  valTop: {
    fontSize: pxToDp(48),
    color: '#f45324'
  },
  lab: {
    fontSize: pxToDp(24),
    color: '#afafaf',
    height: pxToDp(40)
  },
  device: {
    position: 'absolute',
    left: 0,
    top: pxToDp(12.5),
    height: pxToDp(80),
    width: 1,
    backgroundColor: '#eaeaea'
  },
  joinView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: pxToDp(20)
  },
  platformFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(80)
  },
  footerText: {
    color: '#999',
    fontSize: pxToDp(24),
    textAlign: 'center'
  },
  homeWebView: {
    width: '100%',
    height: pxToDp(1000)
  },
  bottomService: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: pxToDp(240),
    backgroundColor: '#fff'
  },
  serviceItem: {
    flex: 1,
    position: 'relative',
    marginTop: pxToDp(20),
    height: '90%'
  },
  serviceImage: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  },
  serviceTextContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    paddingLeft: pxToDp(44),
    paddingTop: pxToDp(48)
  },
  serviceTextTitle: {
    color: '#fff',
    fontSize: pxToDp(32),
    lineHeight: pxToDp(60),
    fontWeight: 'bold'
  },
  serviceTextDesc: {
    color: '#fff',
    fontSize: pxToDp(22)
  },
  bottomInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(126)
  },
  bottomInfoText: {
    color: '#999',
    fontSize: pxToDp(24)
  },
  platListContainer: {
    position: 'relative',
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: pxToDp(33)
  },
  platLogo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  platName: {
    marginLeft: pxToDp(25)
  },
  headerLOGO: {
    width: pxToDp(55),
    height: pxToDp(55),
    borderRadius: pxToDp(27.5)
  },
  platStateView: {
    position: 'absolute',
    right: -pxToDp(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToDp(99),
    height: pxToDp(48),
    borderLeftColor: '#FFAD2C',
    borderTopColor: '#FFAD2C',
    borderBottomColor: '#FFAD2C',
    borderLeftWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopLeftRadius: pxToDp(30),
    borderBottomLeftRadius: pxToDp(30)
  },
  platState: {
    fontSize: pxToDp(24),
    color: '#FFAD2C'
  },
  headerInvestIcon: {
    width: pxToDp(90),
    height: pxToDp(40),
    marginTop: pxToDp(4),
    marginLeft: pxToDp(10)
  },
  headerInvestTxt: {
    fontSize: pxToDp(22),
    textAlign: 'center',
    lineHeight: pxToDp(40),
    color: '#fff'
  },
  platBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(40),
    paddingBottom: pxToDp(40),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#E8E6E6'
  },
  platBodyItemAnnualized: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  annualizedReturns: {
    fontSize: pxToDp(48),
    fontWeight: '600',
    color: '#FF4521'
  },
  annualizedReturnsA: {
    fontSize: pxToDp(42),
    fontWeight: 'bold',
    color: '#4C4C4C'
  },
  percentTxt: {
    marginTop: 9,
    marginLeft: 3,
    fontSize: 12,
    color: '#f45324'
  },
  profit: {
    marginTop: pxToDp(20),
    fontSize: pxToDp(26),
    color: '#666666'
  },
  platTagView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: pxToDp(27),
    marginRight: pxToDp(20),
    marginLeft: pxToDp(20)
  },
  platTag: {
    color: '#999',
    fontSize: pxToDp(24)
  },
  percents: {
    fontSize: pxToDp(46),
    fontWeight: 'bold'
  },
  verticalLine: {
    width: 1,
    height: pxToDp(20),
    marginRight: pxToDp(36),
    marginLeft: pxToDp(36),
    backgroundColor: '#aeaeae'
  },
  shadowView: {
    position: 'relative',
    marginTop: -pxToDp(32),
    flexDirection: 'row',
    height: pxToDp(55),
    justifyContent: 'center'
  },
  shadowImage: {
    width: pxToDp(692),
    height: pxToDp(55),
    resizeMode: 'stretch'
  }
});

export default styles;
