import * as React from 'react'
import {View, Text, ScrollView, Image, TouchableOpacity, StyleSheet} from "react-native"
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Container, Content, Card, CardItem } from 'native-base'
import QNHeader from '~components/QNHeader'
import {
  styles
} from '../assets/styles'

@inject('ReturnPlanStore')
class ReturnPlanDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  public render() {

    const returnDetail = toJS(this.props.ReturnPlanStore.returnDetail)
    return (
      <View style={styles.wrap}>
        <QNHeader title={'回款详情'} backIcon/>
        <Content style={styles.content}>
          <View
            style={styles.card}>
            <Text style={styles.title}>平台信息</Text>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color666, styles.mr16]}>平台名称：</Text>
              <Text style={[styles.lg28, styles.color333]}>{returnDetail.Platform}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color333, styles.mr16]}>平台利息：</Text>
              <Text style={[styles.lg28, styles.color666]}>{returnDetail.InterestRate}</Text>
            </View>
          </View>
          <View
            style={styles.card}>
            <Text style={styles.title}>投资信息</Text>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color666, styles.mr16]}>投资金额：</Text>
              <Text style={[styles.lg28, styles.color333]}>{returnDetail.InvestmentMoney}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color333, styles.mr16]}>返利金额：</Text>
              <Text style={[styles.lg28, styles.color666]}>{returnDetail.fanli}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color333, styles.mr16]}>投资日期：</Text>
              <Text style={[styles.lg28, styles.color666]}>{returnDetail.InvestmentDate}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color333, styles.mr16]}>投资期限：</Text>
              <Text style={[styles.lg28, styles.color666]}>{returnDetail.InvestmentLimit}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color333, styles.mr16]}>回款日期：</Text>
              <Text style={[styles.lg28, styles.color666]}>{returnDetail.huiKuanDate}</Text>
            </View>
          </View>
          <View
            style={styles.card}>
            <Text style={styles.title}>其它信息</Text>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color666, styles.mr16]}>提交时间：</Text>
              <Text style={[styles.lg28, styles.color333]}>{returnDetail.SubmissionTime}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color333, styles.mr16]}>注册用户名：</Text>
              <Text style={[styles.lg28, styles.color666]}>{returnDetail.UserName}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text style={[styles.lg28, styles.color333, styles.mr16]}>注册手机号：</Text>
              <Text style={[styles.lg28, styles.color666]}>{returnDetail.PhoneNumber}</Text>
            </View>
          </View>
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  content: {
    marginTop: 10,
    paddingLeft: 8,
    paddingRight: 8
  },
  card: {
    flexDirection: 'column',
    marginBottom: 20,
    paddingLeft: 16,
    paddingTop: 20,
    paddingBottom: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    color: '#333',
    lineHeight: 18,
    fontWeight: 'bold',
    marginBottom: 14
  },
  mr16: {
    width: 100,
    textAlign: 'left'
  },
  lg28: {
    fontSize: 14,
    lineHeight: 15
  },
  color333: {
    color: '#333'
  },
  color666: {
    color: '#666'
  },
  cardItem: {
    flexDirection: 'row',
    marginBottom: 10
  }
})

export default ReturnPlanDetail