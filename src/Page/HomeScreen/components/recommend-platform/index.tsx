import * as React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Button } from 'native-base';
import styles from '../../assets/style';
import { renderPlatListItem } from '~components/PlatFormInFormation';
import { withNavigation } from 'react-navigation';
import {pxToDp} from "~utils"

const defaultIcon = 'https://wsimages.wsloan.com/images/app/2018/zongzi/favicon0MfA2zJ7w7yCfUHInzqT~.png'
@inject('HomeStore')
@observer
class RecommendPlatform extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    recommendName: '热门推荐'
  }
  _handlePressOnBtn = item => {
    if (!item.isEnd) {
      this.props.navigation.navigate('ManageFinancialDetail', {
        id: item.ID,
        platID: item.platID,
        Platform: item.Platform
      })
    }
  }
  _renderRow = item => renderPlatListItem(item, this.props.navigation)

  _renderFirst = item => (
    <TouchableWithoutFeedback
      onPress={() => {
        this.props.navigation.navigate('ManageFinancialDetail', {
          id: item.ID,
          platID: item.platID,
          Platform: item.Platform
        })
      }}>
      <View style={[styles.platListContainer]}>
        <View style={styles.headerContainer}>
          <View style={styles.platLogo}>
            <Image
              source={{ uri: item.PlatformLogo || defaultIcon }}
              style={styles.headerLOGO}
            />
            <Text style={styles.platName}>{item.Platform}</Text>
          </View>
          <View style={styles.platStateView}>
            <Text style={styles.platState}>
              可{Number(item.Type) === 1 ? '首投' : '复投'}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            borderBottomWidth: pxToDp(1),
            borderColor: '#E8E6E6'
          }}>
          <View>
            <Text style={styles.profit}>综合年化收益</Text>
          </View>
          <View style={[styles.platBodyItem]}>
            <View style={styles.platBodyItemAnnualized}>
              <Text
                style={[
                  styles.annualizedReturns,
                  { fontSize: pxToDp(82), fontWeight: 'bold' }
                ]}>
                {item.AnnualizedReturnsMin}
                <Text style={styles.percents}>%</Text>
              </Text>
              <Text
                style={[
                  styles.annualizedReturns,
                  { fontSize: pxToDp(82), fontWeight: 'bold' }
                ]}>
                -{item.AnnualizedReturnsMax}
                <Text style={styles.percents}>%</Text>
              </Text>
            </View>
          </View>
          <View
            style={[
              {
                flexDirection: 'row',
                height: pxToDp(80),
                alignItems: 'center',
                justifyContent: 'center'
              }
            ]}>
            <View>
              <Text style={[styles.profit, { marginTop: 0 }]}>
                最高返利 {item.MaxReturnMoney}
              </Text>
            </View>
            <View style={styles.verticalLine} />
            <View>
              <Text style={[styles.profit, { marginTop: 0 }]}>
                起投金额 {item.MinMoney}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.platTagView}>
          {item.Tag && item.Tag.split('，').map((tag, v) => {
            return (
              <Text style={styles.platTag} key={v}>{tag}</Text>
            )
          })}
        </View>

      </View>
    </TouchableWithoutFeedback>


  )

  componentWillMount() {
    this.props.HomeStore.loadRecommendList()
  }
  render() {
    let recommendList = this.props.HomeStore.getRecommendList.map(
      (item, i) => ({
        ...item
      })
    )
    const firstRecommend = toJS(this.props.HomeStore.getFirstRecommend)
    return (
      <View>
        {
          firstRecommend ? (
            <View>
              <View style={styles.remTitle}>
                <Text style={styles.remTitleText}>今日首推</Text>
              </View>
              {
                this._renderFirst(firstRecommend)
              }
            </View>
          ) : null
        }

        <View>
          <View style={styles.remTitle}>
            <Text style={styles.remTitleText}>{this.state.recommendName}</Text>
          </View>
          {recommendList.map((item, i) => (
            <View key={i}>{this._renderRow(item)}</View>
          ))}
        </View>
      </View>
    )
  }
}

export default withNavigation(RecommendPlatform)
