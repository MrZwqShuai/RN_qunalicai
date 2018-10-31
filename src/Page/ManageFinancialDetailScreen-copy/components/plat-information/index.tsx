import * as React from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';
import { PlatformMes } from '../../shared/detail.model';
import { riskBtnStyle } from '../../shared/risk-btn.style';

interface PlatTableItem {
  title: string;
  content: string;
}

type Props = {
  getPlatFormMes: PlatformMes;
}

type State = {
}

class PlatInformationComponent extends React.PureComponent<Props, State> {


  public render() {
    const platFormMes = this.props.getPlatFormMes;
    return (
      <View style={styles.platInformation}>
        <View style={styles.platRisk}>
          <Text style={styles.platRiskTitle}>
            风险评估:
          </Text>
          <View style={styles.platGroup}>
            <Text style={styles.platGroupTxt}>
              风险小组评分:
            </Text>
            <Text style={styles.platRiskVal}>
              {platFormMes.RiskAssessment}
            </Text>
            <Text style={[styles.platRiskLabel, { marginLeft: 18 }]}>
              风险极低
              </Text>
          </View>
          <View>
            <Text style={styles.platGroupTxt}>
              风险小组推荐理由：
            </Text>
            <Text style={[styles.platGroupTxt, { lineHeight: 18 }]}>
              {platFormMes.tjly}
            </Text>
          </View>
        </View>
        <View style={styles.platFormTable}>
          {this.renderPlatTableItem([{ title: '平台名称：', content: platFormMes.Platform }, { title: '资金存款：', content: platFormMes.DepositFund }])}
          {this.renderPlatTableItem([{ title: '运营公司：', content: platFormMes.Operator }], true)}
          {this.renderPlatTableItem([{ title: '上线时间：', content: platFormMes.OnlineTime }, { title: '利息水平：', content: platFormMes.InterestRate }])}
          {this.renderPlatTableItem([{ title: '投资期限：', content: platFormMes.InvestmentHorizon }, { title: '注册资金：', content: platFormMes.RegisteredFund }], true)}
          {this.renderPlatTableItem([{ title: '担保公司：', content: platFormMes.GuaranteeCompany }])}
          {this.renderPlatTableItem([{ title: '提现到账：', content: platFormMes.Withdraw }, { title: '客服电话：', content: platFormMes.PhoneNumber }], true)}
          {this.renderPlatTableItem([{ title: '平台背景：', content: platFormMes.BackgroundPedestal }, { title: '融资背景：', content: platFormMes.BackgroundFinancing }])}
          {this.renderPlatTableItem([{ title: '公司地址：', content: platFormMes.Address }], true)}
        </View>
      </View>
    )
  }

  /**
   * 
   * @param platInfoTtem 
   * @param pianoKey  判断黑白相间
   */
  public renderPlatTableItem(platInfoTtem: PlatTableItem[], pianoKey?: boolean) {
    const platTable = platInfoTtem.map((item: PlatTableItem, index: number) => {
      return (
        <View key={index} style={styles.platInfoTableItem}>
          <Text style={styles.platGroupTxt}>
            {item.title}
          </Text>
          <Text style={styles.platRiskVal}>
            {item.content}
          </Text>
        </View>
      )
    });
    return (
      <View style={pianoKey ? styles.platInfoTablePiano : styles.platInfoTable}>
        {platTable}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  platInformation: {
    marginTop: 15,
  },
  platRisk: {
    width: '90%',
    alignSelf: 'center',
  },
  platRiskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  platGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },
  platRiskVal: {
    fontSize: 12,
    marginLeft: 8,
  },
  platGroupTxt: {
    fontSize: 12,
    color: '#999'
  },
  platRiskLabel: riskBtnStyle,
  platInfoTable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 9,
    backgroundColor: '#fbfbfb'
  },
  platInfoTablePiano: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 9,
    backgroundColor: '#fff'
  },
  platInfoTableItem: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 13.5,
  },
  platFormTable: {
    marginTop: 12,
  }
})

export default PlatInformationComponent;