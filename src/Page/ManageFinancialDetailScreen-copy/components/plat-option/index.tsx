import * as React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import { riskBtnStyle } from '../../shared/risk-btn.style';
import { PlatformMes } from '../../shared/detail.model';

type Props = {
  getPlatFormMes: PlatformMes
}

class PlatOptionComponent extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const platFormMes = this.props.getPlatFormMes;
    console.log(this.props.getPlatFormMes, 'getPlatFormMes')
    return (
      <View style={styles.platOption}>
        <View style={styles.platOptionItem}>
          <Image source={require('../../assets/images/date.png')} style={styles.dateIcon} />
          <Text style={styles.platOptionItemTitle}>
            上线时间
          </Text>
          <Text style={styles.platOptionItemContent}>
            {platFormMes.OnlineTime}
          </Text>
        </View>
        <View style={styles.platOptionItem}>
          <Image source={require('../../assets/images/compute.png')} style={styles.dateIcon} />
          <Text style={styles.platOptionItemTitle}>
            风险评分{platFormMes.RiskAssessment}
          </Text>
          <Text style={styles.platOptionRisk}>
          风险极低
          </Text>
        </View>
        <View style={styles.platOptionItem}>
          <Image source={require('../../assets/images/rank.png')} style={styles.dateIcon} />
          <Text style={styles.platOptionItemTitle}>
            上线时间
          </Text>
          <Text style={styles.platOptionItemContent}>
          {platFormMes.InterestRate}
          </Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  // 平台风险
  platOption: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  platOptionItem: {
    alignItems: 'center',
  },
  dateIcon: {
    width: 35,
    height: 35
  },
  platOptionItemTitle: {
    marginTop: 7,
    fontSize: 12,
    color: '#999'
  },
  platOptionItemContent: {
    fontSize: 14,
    color: '#666'
  },
  platOptionRisk: riskBtnStyle
});

export default PlatOptionComponent;