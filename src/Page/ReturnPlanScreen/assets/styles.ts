import EStyleSheet from 'react-native-extended-stylesheet'

export const styles = EStyleSheet.create({
  mainBg: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  flex1: {
    flex: 1
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fb: {
    fontWeight: 'bold'
  },
  ft12: {
    fontSize: 12
  },
  ft13: {
    fontSize: 13
  },
  ft15: {
    fontSize: 15
  },
  ft25: {
    fontSize: 25
  },
  ft18: {
    fontSize: 18
  },
  lh50: {
    lineHeight: 40
  },
  colorRed: {
    color: '#ff4b17',
  },
  colorDesc: {
    color: '#a9a9a9'
  },
  colorNumber: {
    color: '#333'
  },
  colorDate: {
    color: '#999'
  },
  colorPlatFormName: {
    color: '#666'
  },
  mainBox: {
    flexDirection: 'column',
    height: 200,
    backgroundColor: '#fff'
  },
  mainTop: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 128,
    marginLeft: 16,
    marginRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea'
  },
  mainCount: {
    fontSize: 37,
    fontWeight: 'bold'
  },
  mainBottom: {
    alignItems: 'center',
    height: 71,
    flexDirection: 'row',
  },
  device: {
    height: 37 / 2,
    width: 1,
    backgroundColor: '#eaeaea'
  },
  returnPlanTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 8,
    height: 50
  },
  titleBorder: {
    marginRight: 14,
    width: 3,
    height: 13,
    backgroundColor: '#ffad2c'
  },
  returnPlanBox: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
    height: 184,
    backgroundColor: '#fff'
  },
  returnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  returnMiddle: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between'
  },
  returnFooter: {
    paddingLeft: 12,
    height: 50,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea'
  },
  middleItem: {
    height: '100%',
    justifyContent: 'flex-start'
  },
  platformIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  calendarTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  calendar: {
    width: 20,
    height: 18,
    resizeMode: 'contain'
  },
  footer: {
    flexDirection: 'row',
    height: 70
  }
})
