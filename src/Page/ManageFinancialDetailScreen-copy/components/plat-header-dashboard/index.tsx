import * as React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { LogoUrl } from '../../../../Config/config';
import { ManageFinancialImpl, PlatDetail } from '../../shared/detail.model';

type Props = {
  getPlatDetail: PlatDetail
}

class PlatHeadDashBoardComponent extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const platDetail = this.props.getPlatDetail;
    let tags = [];
    if (platDetail.Tag) {
      tags = platDetail.Tag.split('，');
    }
    console.log(platDetail, 'platDetail')
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: LogoUrl + platDetail.PlatformLogo }} style={styles.headerLogo} />
          <ImageBackground source={require('../../assets/images/bubble.png')} style={styles.headerBubbleIcon}>
            <Text style={styles.headerIconTxt}>{platDetail.Type === "1" ? "首投" : "复投"}</Text>
          </ImageBackground>
        </View>
        <View style={styles.tags}>
          <Text style={styles.tagBlueBorder}>
            {tags[0]}
          </Text>
          <View style={styles.tagBlueBorderView}>
            <Text style={styles.tagRedBorder}>
              {tags[1]}
            </Text>
          </View>
        </View>
        <View style={styles.platProfitContainer}>
          <View style={styles.platProfitBox}>
            <Text style={styles.platProfitTitle}>
              综合年化收益
              </Text>
            <Text style={styles.platProfitVal}>
              {platDetail.AnnualizedReturns}
              </Text>
          </View>
          <View style={styles.platProfitBox}>
            <Text style={styles.platProfitTitle}>
              最高返利
              </Text>
            <Text style={styles.platProfitVal}>
            {platDetail.zdfl}
              </Text>
          </View>
        </View>
        <View style={styles.platTermContainer}>
          <View style={styles.platTermBox}>
            <Text style={styles.platProfitTitle}>
              标期
              </Text>
            <Text style={styles.platTerm}>
              {platDetail.ObjectDeadline}
              </Text>
          </View>
          <View style={styles.platTermBox}>
            <Text style={styles.platProfitTitle}>
              投资额度范围
              </Text>
            <Text style={styles.platTerm}>
              {platDetail.InvestmentSection}
              </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 22,
    backgroundColor: '#fff'
  },
  headerLogo: {
    width: 77.5,
    height: 31.6,
  },
  headerBubbleIcon: {
    width: 40,
    height: 22
  },
  headerIconTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 16,
    fontSize: 11,
  },
  tags: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tagBlueBorderView: {
    marginLeft: 18,
  },
  tagBlueBorder: {
    paddingLeft: 15,
    fontSize: 13,
    color: '#9ca7e6'
  },
  tagRedBorder: {
    marginRight: 5,
    fontSize: 13,
    color: '#f1482a'
  },
  platProfitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  platTermContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  platProfitBox: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: 25,
    borderBottomColor: '#f2f2f2',
    borderLeftColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  platTermBox: {
    width: '50%',
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: 'center',
    borderLeftColor: '#f2f2f2',
    borderLeftWidth: 1,
  },
  platProfitTitle: {
    textAlign: 'center',
    fontSize: 11,
    color: '#999'
  },
  platProfitVal: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1482a'
  },
  platTerm: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
    color: '#666'
  },
});

export default PlatHeadDashBoardComponent;