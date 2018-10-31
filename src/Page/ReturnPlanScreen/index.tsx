import * as React from 'react'
import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native"
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import QNHeader from '../../Components/QNHeader'
import {
  styles
} from './assets/styles'

@inject('RootStore')
@inject('ReturnPlanStore')
@observer class ReturnPlanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  constructor(props) {
    super(props)
  }
  _navToCalendar = () => {
    const {
      navigation
    } = this.props
    navigation.navigate('ReturnMoney')
  }
  _headerRight = () => (
    <TouchableOpacity activeOpacity={0} style={styles.calendarTouch} onPress={this._navToCalendar}>
      <Image source={require('./assets/images/calendar.png')} style={styles.calendar}></Image>
    </TouchableOpacity>
  )
  _renderItem = (item, i) => (
    <View style={styles.returnPlanItem} key={i}>
      <View style={styles.returnPlanTitle}>
        <View style={styles.titleBorder}></View>
        <Text style={[styles.ft15, styles.colorNumber, styles.fb]}>回款日期:{item.huiKuanDate}</Text>
      </View>
      <TouchableOpacity style={styles.returnPlanBox} onPress={() => this._onPress(item)}>
        <View style={styles.returnHeader}>
          <View style={[styles.flexRow]}>
            <Image source={{uri: `${item.PlatformLogo}`}} style={[styles.platformIcon]}></Image>
            <Text style={[styles.ft15, styles.fb, styles.colorPlatFormName]}>{item.Platform}</Text>
          </View>
          <Text style={[styles.ft12, styles.colorDate]}>{'查看详情 >'}</Text>
        </View>
        <View style={[styles.returnMiddle, styles.flexRow, styles.flex1]}>
          <View style={styles.middleItem}>
            <Text style={[styles.ft25, styles.colorRed, styles.fb, styles.lh50]}>{item.InvestmentMoney}</Text>
            <Text style={[styles.ft12, styles.colorDesc]}>投资金额</Text>
          </View>
          <View style={styles.middleItem}>
            <Text style={[styles.ft18, styles.colorNumber, styles.fb, styles.lh50]}>{item.fanli}</Text>
            <Text style={[styles.ft12, styles.colorDesc]}>返利金额</Text>
          </View>
          <View style={styles.middleItem}>
            <Text style={[styles.ft18, styles.colorNumber, styles.fb, styles.lh50]}>{item.InterestRate}</Text>
            <Text style={[styles.ft12, styles.colorDesc]}>平台利息</Text>
          </View>
        </View>
        <View style={styles.returnFooter}>
          <Text style={[styles.colorDate]}>投资日期：{item.InvestmentDate}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
  _onPress = item => {
    this.props.ReturnPlanStore.setReturnDetail(item)
    this.props.navigation.navigate('ReturnDetail')
  }
  componentWillMount() {
    this.props.ReturnPlanStore.loadReturnList()
  }
  public render() {
    const {
      returnData
    } = this.props.ReturnPlanStore
    const daihuiList = toJS(this.props.ReturnPlanStore.getDaihuiList)
    return (
      <View style={styles.mainBg}>
        <QNHeader
          title={'回款计划'}
          backIcon
          HeaderRight={this._headerRight}
        />
        <ScrollView>
          <View style={styles.mainBox}>
            <View style={styles.mainTop}>
              <Text style={[styles.mainCount, styles.colorRed]}>{returnData.daishou}</Text>
              <Text style={[styles.ft12, styles.colorDesc]}>待收金额(元)</Text>
            </View>
            <View style={styles.mainBottom}>
              <View style={[styles.flex1, styles.flexCenter]}>
                <Text style={[styles.ft15, styles.colorNumber]}>{returnData.counts}</Text>
                <Text style={[styles.ft13, styles.colorDesc]}>待收笔数</Text>
              </View>
              <View style={styles.device}></View>
              <View style={[styles.flex1, styles.flexCenter]}>
                <Text style={[styles.ft15, styles.colorNumber]}>{returnData.countsMonth}</Text>
                <Text style={[styles.ft13, styles.colorDesc]}>本月待收笔数</Text>
              </View>
            </View>
          </View>
          <View style={styles.returnPlanList}>
            {
              daihuiList.map((item, i) => this._renderItem(item, i))
            }
          </View>
          <View style={[styles.footer, styles.flexCenter]}>
            <Text style={[styles.colorDate, styles.ft12]}>———— 天呐，你已经看到底部啦 ————</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default ReturnPlanScreen