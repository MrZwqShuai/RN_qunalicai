import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import QNMessageForm from '~components/QNMessageForm';
import QNHeader from '~components/QNHeader';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
class MyDebtConfirmScreen extends React.PureComponent {
  list1 = [
    {
      label: '平台名称',
      content: 1
    },
    {
      label: '债转金额',
      content: 1,
      textColor: '#FF4B17'
    },
    {
      label: '标的年化',
      content: 1
    },
    {
      label: '剩余期限',
      content: 1
    },
    {
      label: '还款方式',
      content: 1
    },
    {
      label: '债权折扣',
      content: 1
    },
    {
      label: '折扣金额',
      content: 1,
      textColor: '#FF4B17'
    },
    {
      label: '债权有效期',
      content: 1
    },
    {
      label: '债权链接',
      content: 1
    }
  ];
  list2 = [
    {
      label: '折扣金额预付',
      content: 1,
      textColor: '#FF4B17'
    },
    {
      label: '担保服务费',
      content: 1,
      textColor: '#FF4B17',
      desc: "返利债转担保需要收取债权转让方债权本金的0.5%信息费用"
    }
  ];
  public render() {
    return (
      <View style={styles.wrapper}>
        <QNHeader title="债转确认" backIcon />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollWrapper}>
          <QNMessageForm title="债权信息" messageList={this.list1} />
          <QNMessageForm title="是否预付" messageList={this.list2} />
          <View style={styles.tipsContainer} >
            <Text style={styles.tipsIcon}>1</Text>
            <Text style={styles.tipsContent}>先预付折扣金额既可以让你的债转项目优先显示，也可以提高项目的可信度以及转手效率。</Text>
          </View>
          <View style={styles.submitBtnContainer}>
                <Text style={styles.submitBtn}>确认支付</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollWrapper: {
    marginLeft: pxToDp(16),
    marginRight: pxToDp(14)
  },
  tipsContainer: {
    flexDirection: 'row',
    marginTop: pxToDp(38),
  },
  tipsIcon: {
    width: pxToDp(30),
    height: pxToDp(30),
    borderRadius: pxToDp(15),
  },
  tipsContent: {
    fontSize: pxToDp(24),
    color: '#999'
  },
  submitBtnContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: pxToDp(82),
  },
  submitBtn: {
    width: pxToDp(688),
    height: pxToDp(88),
    marginBottom: pxToDp(40),
    lineHeight: pxToDp(88),
    textAlign: 'center',
    fontSize: pxToDp(28),
    borderRadius: pxToDp(10),
    color: '#fff',
    backgroundColor: '#FFAD2C'
  }
});


export default MyDebtConfirmScreen;