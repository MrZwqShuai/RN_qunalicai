import * as React from 'react';
import { View, ScrollView } from 'react-native';
import QNHeader from '~components/QNHeader';
import QNMessageForm from '~components/QNMessageForm';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default class extends React.PureComponent {
  list1 = [
    {
      label: '债转编号',
      content: 1
    },
    {
      label: '创建日期',
      content: 1
    },
    {
      label: '承接日期',
      content: 1
    },
    {
      label: '订单状态',
      content: 1
    }
  ];

  list2 = [
    {
      label: '平台名称',
      content: 1
    },
    {
      label: '债转金额',
      content: 1
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
      content: 1
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

  list3 = [
    {
      label: '返现金额',
      content: 1
    },
    {
      label: '保障服务费',
      content: 1
    },
    {
      label: '加急提现手续费',
      content: 1
    },
    {
      label: '订单状态',
      content: 1
    }
  ];

  render() {
    const { list1, list2, list3 } = this;

    return (
      <View style={styles.wrapper}>
        <QNHeader title="承接详情" backIcon />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollWrapper}>
          <QNMessageForm title="基本信息" messageList={list1} />
          <QNMessageForm title="债权信息" messageList={list2} />
          <QNMessageForm title="其他信息" messageList={list3} />
        </ScrollView>
      </View>
    );
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
    // marginTop: -pxToDp(49)
  }
});
