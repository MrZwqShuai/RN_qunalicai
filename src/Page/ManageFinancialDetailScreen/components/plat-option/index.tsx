import * as React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import { riskBtnStyle } from '../../shared/risk-btn.style';
import { PlatformMes } from '../../shared/detail.model';
import { pxToDp } from '~utils';
import { PlatDetail } from '~pages/ManageFinancialDetailScreen-copy/shared/detail.model';

type Props = {
  getPlatFormMes: PlatformMes;
  getPlatDetail: PlatDetail
}

class PlatOptionComponent extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    // 这里接口字段差不多...
    const platFormMes = this.props.getPlatFormMes;
    const platDetail = this.props.getPlatDetail;
   
    return (
      <View style={styles.platProfitContainer}>
        <View style={styles.platComprehensiveProfit}>
          <Text style={styles.platComprehensiveProfitNum}>
          {platDetail.AnnualizedReturnsMin}<Text style={styles.percentSymbol}>%</Text>-{platDetail.AnnualizedReturnsMax}<Text style={styles.percentSymbol}>%</Text>
          </Text>
          <Text style={styles.platComprehensiveProfitTxt}>
            综合年化收益
          </Text>
        </View>
      <View style={styles.platOption}>
        <View style={styles.platOptionItem}>
          <Text style={styles.platOptionItemContent}>
            {platDetail.InvestmentSection}元
          </Text>
          <Text style={styles.platOptionItemTitle}>
          可投额度
          </Text>
        </View>
        <View style={styles.platOptionItemLine}>
        </View>
        <View style={styles.platOptionItem}>
          <Text style={styles.platOptionItemContent}>
            {platDetail.ObjectDeadline}
          </Text>
          <Text style={styles.platOptionItemTitle}>
          标期
          </Text>
        </View>
        <View style={styles.platOptionItemLine}>
        </View>
        <View style={styles.platOptionItem}>
          <Text style={styles.platOptionItemContent}>
          {platDetail.MaxReturnMoney}
          </Text>
          <Text style={styles.platOptionItemTitle}>
          最高返利
          </Text>
        </View>
      </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  platProfitContainer: {
    marginTop: 10,
    paddingTop: pxToDp(93),
    paddingBottom: pxToDp(37),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff',
  },
  platComprehensiveProfit: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: pxToDp(15),
    marginRight: pxToDp(15),
    marginBottom: pxToDp(40),
    paddingBottom: pxToDp(53),
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: pxToDp(1),
  },
  platComprehensiveProfitNum: {
    fontSize: pxToDp(74),
    fontWeight: 'bold',
    color: '#FF4B17',
  },
  percentSymbol: {
    fontSize: pxToDp(48),
    color: '#FF4B17',
  },
  platComprehensiveProfitTxt: {
    fontSize: pxToDp(24),
    color: '#A9A9A9'
  },
  // 平台风险
  platOption: {
    marginLeft: pxToDp(52),
    marginRight: pxToDp(52),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platOptionItem: {
    alignItems: 'center',
  },
  platOptionItemLine: {
    width: pxToDp(1.5),
    height: pxToDp(37),
    backgroundColor: '#EAEAEA'
  },
  dateIcon: {
    width: 35,
    height: 35
  },
  platOptionItemTitle: {
    marginTop: 7,
    fontSize: pxToDp(24),
    color: '#A9A9A9'
  },
  platOptionItemContent: {
    fontSize: pxToDp(28),
    color: '#333333'
  },
  platOptionRisk: riskBtnStyle
});

export default PlatOptionComponent;