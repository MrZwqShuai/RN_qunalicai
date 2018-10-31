import * as React from 'react';
import { View, ImageBackground, Text, Dimensions, TouchableHighlight } from 'react-native';
import FinanicalWrapper from '~components/FinancialWrapper';
import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp, starScore } from '~utils';
import { inject, observer } from 'mobx-react';
import { MapPlatFormName } from './shared/platform-map';
import QNStar from '../../Components/QNStar/index';

@inject('ManageFinancialStore')
@observer
export default class PlatFormDetailScreen extends React.Component {
  static navigationOptions = ({ navigate }) => {
    return {
      header: null
    }
  }
  mapPlatFormName = MapPlatFormName;
  render() {
    const { getPlatformMes } = this.props.ManageFinancialStore;
    return (
      <FinanicalWrapper backgroundColor="#fff" title="平台详情">
        <View>
          <View style={styles.sketch}>
            <View style={styles.sketchLogo}>
              <ImageBackground
                style={styles.riskScoreHeader}
                source={require('./assets/images/risk-score.png')}
              >
                <View style={styles.riskSoreHeaderBox}>
                  <Text style={styles.riskScore}>
                    {getPlatformMes.RiskAssessment}
                  </Text>
                  <Text style={styles.riskScoreTxt}>
                    风险评分
              </Text>
                  <Text style={styles.riskGrade}>
                    风险极低
              </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.sketchGrade}>
              <Text style={{ color: '#333333' }}>
                风险评级:
              </Text>
              <View style={{ marginLeft: pxToDp(22), }}>
                <QNStar stars={starScore(Number(getPlatformMes.RiskAssessment))} />
              </View>
            </View>
            <View style={styles.sketchReasonOfRecommend}>
              <Text style={styles.sketchReasonOfRecommendTxt}>
                风险小组推荐理由：{getPlatformMes.tjly}
              </Text>
            </View>
          </View>
          <View style={styles.shadowView}>
          </View>
          <View style={styles.baseInformation}>
            <Text style={styles.baseInformationTitle}>
              基本信息
            </Text>
            <View style={{ marginTop: pxToDp(50), }}>
              {this.renderBaseInfo()}
            </View>
          </View>
        </View>
      </FinanicalWrapper>
    )
  }
  componentDidMount() {
  }
  private renderBaseInfo() {
    return Object.keys(this.mapPlatFormName).map((k, v) => {
      return (
        <View style={styles.baseInfoItem} key={v}>
          <Text style={styles.baseInfoItemName}>{this.mapPlatFormName[k]}:</Text>
          <Text style={styles.baseInfoItemValue}>{this.props.ManageFinancialStore.getPlatformMes[k]}</Text>
        </View>
      );
    });
  }
  public createPlatFormInformation() {

  }
}

const styles = EStylesheet.create({
  sketch: {
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(57),
    borderRadius: pxToDp(10),
    borderWidth: pxToDp(1),
    borderColor: '#D3D3D3',
    backgroundColor: '#fff'
  },
  sketchLogo: {
  },
  riskScoreHeader: {
    width: pxToDp(337),
    height: pxToDp(257),
    alignSelf: 'center',
  },
  riskSoreHeaderBox: {
    position: 'relative',
    width: pxToDp(337),
    height: pxToDp(257),
    marginLeft: pxToDp(10),
  },
  riskScore: {
    marginTop: pxToDp(40),
    paddingLeft: pxToDp(15),
    fontSize: pxToDp(80),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  riskScoreTxt: {
    paddingLeft: pxToDp(15),
    textAlign: 'center',
    fontSize: pxToDp(26),
    color: '#333',
  },
  riskGrade: {
    position: 'absolute',
    bottom: pxToDp(8),
    left: pxToDp(107),
    fontSize: pxToDp(31),
    textAlign: 'center',
    color: '#fff'
  },
  sketchGrade: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(39),
  },
  sketchReasonOfRecommend: {
    marginTop: pxToDp(52),
    marginLeft: pxToDp(33),
    marginRight: pxToDp(28),
  },
  sketchReasonOfRecommendTxt: {
    fontSize: pxToDp(26),
    lineHeight: pxToDp(40),
    color: '#666',
  },
  baseInformation: {
    marginTop: pxToDp(66),
    paddingTop: pxToDp(57),
    paddingLeft: pxToDp(32),
    backgroundColor: '#fff',
  },
  baseInformationTitle: {
    fontSize: pxToDp(32),
    fontWeight: 'bold',
    color: '#333',
  },
  baseInfoItem: {
    flexDirection: 'row',
    marginBottom: pxToDp(40),
  },
  baseInfoItemName: {
    fontSize: pxToDp(28),
    color: '#666',
  },
  baseInfoItemValue: {
    marginLeft: pxToDp(24),
    fontSize: pxToDp(28),
    color: '#333',
  },
  shadowView: {
    height: pxToDp(10),
    opacity: .1,
    backgroundColor: '#D3D3D3',
  }
})