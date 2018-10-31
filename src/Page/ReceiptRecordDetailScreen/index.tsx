import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import QNHeader from '~components/QNHeader';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import styles from './assets/style';

@inject('ReceiptRecordStore')
@observer
class ReceiptRecordScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.ReceiptRecordStore.getReceiptDetail(id);
  }
  render() {
    const { receiptDetailData } = this.props.ReceiptRecordStore;
    return (
      <View style={styles.wrap}>
        <QNHeader title="回单详情" backIcon />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>平台信息</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>平台名称：</Text>
              <Text style={styles.infoRight}>{receiptDetailData.Platform}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>平台利息：</Text>
              <Text style={styles.infoRight}>
                {receiptDetailData.InterestRate}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>投资信息</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>投资金额：</Text>
              <Text style={styles.infoRight}>
                {receiptDetailData.InvestmentMoney}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>投资日期：</Text>
              <Text style={styles.infoRight}>
                {receiptDetailData.InvestmentDate}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>投资期限：</Text>
              <Text style={styles.infoRight}>
                {receiptDetailData.InvestmentLimit}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>回款日期：</Text>
              <Text style={styles.infoRight}>
                {receiptDetailData.huiKuanDate}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>其他信息</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>提交时间：</Text>
              <Text style={styles.infoRight}>
                {receiptDetailData.SubmissionTime}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>注册用户名：</Text>
              <Text style={styles.infoRight}>
                {receiptDetailData.PlatformUser}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLeft}>注册手机号：</Text>
              <Text style={styles.infoRight}>
                {receiptDetailData.PhoneNumber}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(ReceiptRecordScreen);
