import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  PixelRatio
} from 'react-native';
import { PlatScrollData } from '../../Page/ManageFinancialScreen/shared/manage-financial.model';
import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LogoUrl } from '../../Config/config';
export const renderPlatListItem = (
  platScrollData: PlatScrollData,
  navigation: object
) => {
  let toInvestDetail = (platScrollData, navigation) => {
    navigation.navigate('ManageFinancialDetail', {
      id: platScrollData.ID,
      platID: platScrollData.platID,
      Platform: platScrollData.Platform
    });
  };
  const defaultIcon =
    'https://wsimages.wsloan.com/images/app/2018/zongzi/favicon0MfA2zJ7w7yCfUHInzqT~.png';
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        toInvestDetail(platScrollData, navigation);
      }}>
      <View key={platScrollData.ID} style={[styles.platListContainer]}>
        <View style={styles.headerContainer}>
          <View style={styles.platLogo}>
            <Image
              source={{ uri: platScrollData.PlatformLogo || defaultIcon }}
              style={styles.headerLogo}
            />
            <Text style={styles.platName}>{platScrollData.Platform}</Text>
          </View>
          <View style={styles.platStateView}>
            <Text style={styles.platState}>
              可{Number(platScrollData.Type) === 1 ? '首投' : '复投'}
            </Text>
          </View>
        </View>
        <View style={[styles.platBody]}>
          <View style={[styles.platBodyItem]}>
            <View style={styles.platBodyItemAnnualized}>
              <Text style={styles.annualizedReturns}>
                {platScrollData.AnnualizedReturnsMin}
                <Text style={styles.percents}>%</Text>
              </Text>
              <Text style={styles.annualizedReturns}>
                -{platScrollData.AnnualizedReturnsMax}
                <Text style={styles.percents}>%</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.profit}>综合年化收益</Text>
            </View>
          </View>
          <View style={[styles.platBodyItem]}>
            <View style={styles.platBodyItemAnnualized}>
              <Text style={styles.annualizedReturnsA}>
                {platScrollData.MaxReturnMoney}
              </Text>
            </View>
            <View>
              <Text style={styles.profit}>最高返利</Text>
            </View>
          </View>
        </View>
        <View style={styles.platTagView}>
          {platScrollData.Tag &&
            platScrollData.Tag.split('，').map((tag, v) => {
              return (
                <Text style={styles.platTag} key={v}>
                  {tag}
                </Text>
              );
            })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = EStyleSheet.create({
  platListContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: pxToDp(368),
    marginBottom: pxToDp(16),
    paddingLeft: pxToDp(30),
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: pxToDp(36)
  },
  platLogo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  platName: {
    marginLeft: pxToDp(25)
  },
  headerLogo: {
    width: pxToDp(55),
    height: pxToDp(55),
    borderRadius: pxToDp(27.5)
  },
  platStateView: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToDp(99),
    height: pxToDp(48),
    borderLeftColor: '#FFAD2C',
    borderTopColor: '#FFAD2C',
    borderBottomColor: '#FFAD2C',
    borderLeftWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopLeftRadius: pxToDp(30),
    borderBottomLeftRadius: pxToDp(30)
  },
  platState: {
    fontSize: pxToDp(22),
    color: '#FFAD2C'
  },
  headerInvestIcon: {
    width: 45,
    height: 20,
    marginTop: 2,
    marginLeft: 5
  },
  headerInvestTxt: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 20,
    color: '#fff'
  },
  platBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    // marginTop: pxToDp(40),
    // marginBottom: pxToDp(50)
  },
  platBodyItem: {
    width: '33.3%'
  },
  // threeEightLine: {
  //   width: pxToDp(2),
  //   height: pxToDp(56),
  //   marginLeft: pxToDp(60),
  //   marginRight: pxToDp(97),
  //   backgroundColor: "#D6D4D4",
  // },
  platBodyItemAnnualized: {
    '@media android': {
      height: pxToDp(40)
    },
    '@media ios': {
      height: pxToDp(60)
    },
    flexDirection: 'row',
    alignItems: 'center'
  },
  annualizedReturns: {
    fontSize: pxToDp(48),
    fontWeight: '600',
    color: '#FF4521'
  },
  annualizedReturnsA: {
    fontSize: pxToDp(36),
    color: '#333'
  },
  percentTxt: {
    marginTop: 9,
    marginLeft: 3,
    fontSize: 12,
    color: '#f45324'
  },
  profit: {
    marginTop: pxToDp(20),
    fontSize: pxToDp(26),
    color: '#666666'
  },
  platTagView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: pxToDp(80),
    alignItems: 'center',
    marginRight: pxToDp(30),
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#EAEAEA'
  },
  platTag: {
    color: '#999',
    fontSize: pxToDp(24)
  },
  percents: {
    fontSize: pxToDp(36)
  }
});
