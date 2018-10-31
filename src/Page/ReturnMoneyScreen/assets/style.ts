import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  headerRight: {
    display: 'flex',
    width: 56,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgColor: {
    backgroundColor: '#f9f9f9'
  },
  dataBox: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  tip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    height: 50
  },
  tipLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e5e5'
  },
  tipText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginLeft: 8,
    marginRight: 8
  },
  eventBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20
  },
  noRecord: {
    width: '100%',
    height: 187.5,
    resizeMode: 'contain'
  },
  showEvent: {
    width: '100%'
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    height: 92,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 8,
    paddingRight: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea'
  },
  eventRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventMiddle: {
    flexDirection: 'column'
  },
  platformLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  fs12: {
    fontSize: 12
  },
  fs14: {
    fontSize: 14
  },
  fs15: {
    fontSize: 15
  },
  fs25: {
    fontSize: 25
  },
  colorA9A9A9: {
    color: '#a9a9a9'
  },
  lh36: {
    lineHeight: 36
  },
  color6: {
    color: '#666'
  },
  colorFF4B17: {
    color: '#ff4b17'
  },
  color999: {
    color: '#999'
  },
  fb: {
    fontWeight: 'bold'
  },
  rightIcon: {
    width: 12,
    height: 20,
    resizeMode: 'center'
  },
  touchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  footer: {
    flexDirection: 'row',
    height: 70,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles