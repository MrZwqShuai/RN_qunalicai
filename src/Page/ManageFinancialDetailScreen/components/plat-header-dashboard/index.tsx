import * as React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { LogoUrl } from '../../../../Config/config';
import { ManageFinancialImpl, PlatDetail } from '../../shared/detail.model';
import { pxToDp, starScore } from '~utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import QNStar from '../../../../Components/QNStar/index';
import { PlatformMes } from '~pages/ManageFinancialDetailScreen-copy/shared/detail.model';

type Props = {
  getPlatDetail: PlatDetail;
  getPlatFormMes: PlatformMes;
};

class PlatHeadDashBoardComponent extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const platDetail = this.props.getPlatDetail;
    const platFormMes = this.props.getPlatFormMes;
    let tags = [];
    if (platDetail.Tag) {
      tags = platDetail.Tag.split('，');
    }
    console.log(platDetail, 'platDetail');
    return (
      <View style={{ backgroundColor: '#fff', borderRadius: pxToDp(10) }}>
        <View style={[styles.headerContainer, { borderRadius: pxToDp(10) }]}>
          <Image
            source={{ uri: platDetail.PlatformLogo }}
            style={styles.headerLogo}
          />
          {/* <Image source={{ uri: "http://47.98.137.213/blog/assets/images/qt.jpg"}} style={styles.headerLogo} /> */}
          <Text style={styles.headerTitle}>{platDetail.ObjectName}</Text>
          <View style={styles.headerIconTxtView}>
            <Text style={styles.headerIconTxt}>
              {platDetail.Type === '1' ? '仅首投' : '仅复投'}
            </Text>
          </View>
        </View>
        <View style={styles.platProfitContainer}>
          <View style={styles.platProfitBox}>
            <Text style={styles.platProfitVal}>
              {platDetail.InterestRate}
            </Text>
            <Text style={[styles.platProfitTitle, { marginTop: pxToDp(20) }]}>
              年化收益
            </Text>
          </View>
          <View style={styles.platProfitLine} />
          <View style={styles.platProfitBox}>
            <Text style={[styles.platProfitTitle, { color: '#333' }]}>
              上市时间: {platDetail.OnlineTime}
            </Text>
            <View style={styles.platRiskAssessment}>
              <Text style={[styles.platProfitTitle, { color: '#333' }]}>
                风险评级:
              </Text>
              <View style={{ marginLeft: pxToDp(22) }}>
                <QNStar stars={starScore(Number(platFormMes.RiskAssessment))} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.tags}>
          {tags.map((tag, index) => {
            return (
              <Text style={styles.tagBlueBorder} key={index}>
                {tag}
              </Text>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    backgroundColor: '#fff'
  },
  headerLogo: {
    width: pxToDp(72),
    height: pxToDp(72),
    borderRadius: pxToDp(36)
  },
  headerBubbleIcon: {
    width: 40,
    height: 22
  },
  headerTitle: {
    marginLeft: pxToDp(16),
    marginRight: pxToDp(16),
    fontSize: pxToDp(40),
    fontWeight: 'bold',
    color: '#333333'
  },
  headerIconTxtView: {
    width: pxToDp(101),
    height: pxToDp(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(20),
    borderWidth: pxToDp(1),
    borderColor: '#FFAD2C'
  },
  headerIconTxt: {
    textAlign: 'center',
    color: '#FFAD2C',
    fontSize: pxToDp(22)
  },
  tags: {
    // marginTop: pxToDp(76),
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tagBlueBorderView: {
    marginLeft: pxToDp(10)
  },
  tagBlueBorder: {
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26),
    marginLeft: pxToDp(10),
    textAlign: 'center',
    fontSize: 13,
    borderColor: '#EAEAEA',
    borderWidth: pxToDp(1.5),
    borderRadius: pxToDp(23),
    color: '#999999'
  },
  platProfitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(72)
  },
  platTermContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  platProfitBox: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: 25
  },
  platProfitLine: {
    width: pxToDp(2),
    height: pxToDp(50),
    backgroundColor: '#EAEAEA'
  },
  platTermBox: {
    width: '50%',
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: 'center'
  },
  platRiskAssessment: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(20)
  },
  platProfitTitle: {
    textAlign: 'center',
    fontSize: pxToDp(26),
    color: '#999'
  },
  platProfitVal: {
    marginTop: 6,
    fontSize: pxToDp(45),
    fontWeight: 'bold',
    color: '#333333'
  },
  platTerm: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
    color: '#666'
  }
});

export default PlatHeadDashBoardComponent;
