import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import { PlatScheme } from '~pages/ManageFinancialDetailScreen/shared/detail.model';
import { inject, observer } from 'mobx-react';
import { BoxShadow } from 'react-native-shadow';

type Props = {
  getPlatScheme: PlatScheme[];
}

@inject('ManageFinancialStore')
@observer
export default class PlatStandardKindComponent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dropDownSignList: [],
    }
  }
  private renderStandardDetail(platScheme: PlatScheme, index: number) {
    const getPlatScheme = this.props.getPlatScheme
    return (
      <View>
        <View style={[styles.standardDetail, { position: 'relative' }]}>
          <View style={styles.standardDetailItem}>
            <Text style={styles.standardDetailItemVal}>
              {platScheme.EffectiveProject}
            </Text>
            <Text style={styles.standardDetailItemName}>
              有效项目
          </Text>
          </View>
          <View style={styles.standardDetailItem}>
            <Text style={styles.standardDetailItemVal}>
              {platScheme.InvestmentLimit}
            </Text>
            <Text style={styles.standardDetailItemName}>
              投资金额
          </Text>
          </View>
          <View style={styles.standardDetailItem}>
            <Text style={styles.standardDetailItemVal}>
              {platScheme.RebateImmediately}
            </Text>
            <Text style={styles.standardDetailItemName}>
              返现金额
          </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => { this.dropDownProfit(index) }}>
            <View style={[styles.standardDetailItem]}>
              <Text style={styles.standardDetailItemVal}>
                {platScheme.TotalRevenue}
          </Text>
              <View style={styles.totalProfit}>
                <Text style={[styles.standardDetailItemName, { color: '#384269' }]}>
                  总收益
          </Text>
          <Image style={styles.arrow} source={ platScheme.isDropDown ? require('../../assets/images/arrowup.png') : require('../../assets/images/arrowdown.png')} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View>
          </View>
        </View>
        <View>
        </View>
      </View>
    )
  }

  public render() {
    console.log(this.props.getPlatScheme, '哈哈哈哈');
    const shadowOpt = {
      position: 'absolute',
      top: 0,
      width: pxToDp(719),
      height: pxToDp(180),
      color: "#000",
      border: 1,
      radius: 3,
      opacity: 0.1,
      x: 0,
      y: 3,
      style: { marginVertical: 5 }
    }
    const getPlatScheme = this.props.getPlatScheme;
    return getPlatScheme.map((platScheme, index) => {
      return (
        <View key={index}>
          <View style={styles.container} key={index}>
            <View style={styles.bookMark}>
              <View style={styles.mark}></View>
              <Text style={styles.standardKind}>{platScheme.LimitedDuration}</Text>
            </View>
            <View style={{ marginTop: pxToDp(57), }}>
              {this.renderStandardDetail(platScheme, index)}
            </View>
          </View>
          {platScheme.isDropDown ? (
            <BoxShadow setting={shadowOpt}>
              <View style={styles.totalProfitDropDown}>
                <View>
                  <Text style={{textAlign: 'center'}}>{platScheme.RebateImmediately}</Text>
                  <Text>返现金额</Text>
                </View>
                <View>
                  <Text style={{textAlign: 'center'}}>{platScheme.PlatformRate}</Text>
                  <Text>平台收益</Text>
                </View>
                <View>
                  <Text style={{textAlign: 'center'}}>{platScheme.RedPacket}</Text>
                  <Text>平台红包</Text>
                </View>
              </View>
            </BoxShadow>
          ) : null
          }
        </View>
      )
    })
  }

  public dropDownProfit(index: number) {
    this.props.getPlatScheme[index].isDropDown ? this.props.ManageFinancialStore.setDropDown(index, false) : this.props.ManageFinancialStore.setDropDown(index, true);
  }

}

const styles = EStyleSheet.create({
  container: {
    position: 'relative',
    marginTop: pxToDp(16),
    paddingTop: pxToDp(45),
    paddingBottom: pxToDp(63),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff',
  },
  bookMark: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mark: {
    width: pxToDp(6),
    height: pxToDp(26),
    borderRadius: pxToDp(3),
    backgroundColor: '#FFAD2C',
  },
  standardKind: {
    marginLeft: pxToDp(30),
    fontSize: pxToDp(30),
    color: '#333'
  },
  standardDetail: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginBottom: pxToDp(70),
  },
  standardDetailItem: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  standardDetailItemVal: {
    fontSize: pxToDp(28),
    color: '#333333',
  },
  standardDetailItemName: {
    marginTop: pxToDp(5),
    fontSize: pxToDp(24),
    color: '#999999',
  },
  totalProfit: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: pxToDp(36),
    height: pxToDp(36),
    marginTop: pxToDp(7),
  },

  totalProfitDropDown: {
    position: 'absolute',
    // bottom: pxToDp(-117),
    width: '100%',
    height: pxToDp(180),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 9,
  }
})