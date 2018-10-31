import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import { Button, Divider } from 'react-native-elements'
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig
} from 'react-native-calendars'
import DataBox from './components/DataBox'
import Modal from './components/Modal'
import QNHeader from '~components/QNHeader'
import { headerTitleStyle, formatDate } from '~utils'
import { fetchReimbursementRecord } from '~apis'
import styles from './assets/style'

@inject('ReturnPlanStore')
@observer
class RetrunMoney extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  constructor(props) {
    super(props)
  }
  state = {
    markedDates: {},
    noData: false, // 是否当天有数据
    event_item: [], // 存放当天列表数据
    event_obj: {}, // 存放key为日期，value为Array，对象合集,
    curDay: '', // 存放选中的当前日期
    modalVisible: false,
    theme: {
      textSectionTitleColor: '#b6c1cd',
      selectedDayBackgroundColor: '#ffe2ce',
      selectedDayTextColor: '#fff',
      todayTextColor: '#000',
      dayTextColor: '#000',
      textDisabledColor: '#d9e1e8',
      arrowColor: 'orange',
      textMonthFontWeight: 'bold'
    },
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['天', '一', '二', '三', '四', '五', '六']
  }
  _setCalendarConfig() {
    let { monthNames, monthNamesShort, dayNames, dayNamesShort } = this.state;
    LocaleConfig.locales['fr'] = {
      monthNames: monthNames,
      monthNamesShort: monthNamesShort,
      dayNames: dayNames,
      dayNamesShort: dayNamesShort
    }
    LocaleConfig.defaultLocale = 'fr'
  }
  _setTodaySelected() {
    let today = formatDate(new Date(), 'yyyy-MM-dd')
    let markedDates = {}
    markedDates[today] = {
      selected: true,
      customStyles: {
        text: {
          color: '#333'
        }
      }
    }
    this.setState(prevState => ({
      markedDates: {
        ...this.state.markedDates,
        ...markedDates
      },
      curDay: '2018-09-06'
    }))
  }
  _handlePressOnDay = day => {
    let { curDay, event_obj, markedDates } = this.state
    let noData = event_obj[day.dateString] ? false : true // 控制显示或者隐藏
    let event_item = this.state.event_obj[day.dateString] // 保存需要渲染出来的数据

    markedDates[curDay] = event_obj[curDay]
      ? {
          customStyles: {
            text: {
              color: '#f45324'
            }
          }
        }
      : {}
    markedDates[day.dateString] = event_obj[day.dateString]
      ? {
          selected: true,
          customStyles: {
            text: {
              color: '#f45324'
            }
          }
        }
      : {
          selected: true,
          customStyles: {
            text: {
              color: '#333'
            }
          }
        }
    this.setState(prevState => ({
      noData,
      event_item,
      markedDates: {
        ...markedDates
      },
      curDay: day.dateString
    }))
  }
  _getInvestInfo = () => {
    let curDay = this._formatDate(new Date())
    let markedDates = {}
    let event_item = []
    let event_obj = {}
    markedDates[this._transDate(curDay)] = { // 设置今天为选中状态
      selected: true,
      customStyles: {
        text: {
          color: '#333'
        }
      }
    }
    this.props.ReturnPlanStore.getReturnList.forEach((item, i) => {
      if (item.huiKuanDate === curDay) {
        event_item.push(item)
        markedDates[this._transDate(curDay)] = {
          selected: true,
          customStyles: {
            text: {
              color: '#f45324'
            }
          }
        }
      }
      if (!markedDates[item.huiKuanDate]) {
        markedDates[this._transDate(item.huiKuanDate)] = {
          customStyles: {
            text: {
              color: '#f45324'
            }
          }
        }
      }
      if (!event_obj[this._transDate(item.huiKuanDate)]) {
        event_obj[this._transDate(item.huiKuanDate)] = [item]
      } else {
        event_obj[this._transDate(item.huiKuanDate)].push(item)
      }
    })
    this.setState(prevState => ({
      event_item,
      noData: !event_item.length ? true : false,
      markedDates: {
        ...this.state.markedDates,
        ...markedDates
      },
      event_obj
    }))

  }
  _getReceiptDetail = id => {
    this.setState(prevState => ({
      detailId: id
    }))
    this._setModalVisible(true)
  }
  _formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
  _transDate = dateString => {
    let arr = dateString.split('-')
    let a = arr[0]
    let b = Number(arr[1]) < 10 ? `0${arr[1]}` : arr[1]
    let c = Number(arr[2]) < 10 ? `0${arr[2]}` : arr[2]
    return `${a}-${b}-${c}`
  }
  _showModal = () => {
    this.setState(prevState => ({
      modalVisible: true
    }))
  }
  _setModalVisible = visible => {
    this.setState(prevState => ({
      modalVisible: visible
    }))
  }
  componentWillMount() {
    this._setCalendarConfig()
    this._setTodaySelected()
    this._getInvestInfo()
  }
  render() {
    let { noData, event_item, modalVisible, theme } = this.state
    return (
      <View style={styles.bgColor}>
        <QNHeader
          title={'回款日历'}
          backIcon/>
        <ScrollView style={{ display: 'flex', backgroundColor: '#fff' }}>
          <Calendar
            onDayPress={day => {
              this._handlePressOnDay(day)
            }}
            monthFormat={'yyyy MM'}
            onMonthChange={month => {}}
            firstDay={1}
            theme={theme}
            markingType={'custom'}
            markedDates={this.state.markedDates}
          />
          <Divider style={{ backgroundColor: '#dedede', height: 5 }} />
          <DataBox
            noData={noData}
            event_item={event_item}
            getReceiptDetail={this._getReceiptDetail}
          />
          {modalVisible ? (
            <Modal
              detailId={this.state.detailId}
              modalVisible={modalVisible}
              setModalVisible={this._setModalVisible}
            />
          ) : null}
        </ScrollView>
      </View>

    )
  }
}

export default RetrunMoney
