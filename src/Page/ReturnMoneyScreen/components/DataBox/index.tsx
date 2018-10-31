import * as React from 'react';
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withNavigation } from 'react-navigation'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import styles from '../../assets/style'

@inject('ReturnPlanStore')
@observer class DataBox extends React.Component {
  static defaultProps = {
    noData: false,
    event_item: []
  }
  static propTypes = {
    noData: PropTypes.bool,
    event_item: PropTypes.array
  }
  constructor(props) {
    super(props)
  }
  _handlePressByID(item) {
    this.props.ReturnPlanStore.setReturnDetail(item)
    this.props.navigation.navigate('ReturnDetail')
  }
  render() {
    return (
      <View style={styles.dataBox}>
        <View style={styles.eventBox}>
          {
            this.props.noData ? (
              <Image style={styles.noRecord} source={require('./img/noRecord.png')}/>
            ) : (
              <View style={styles.showEvent}>
                {this.props.event_item.map((item, i) => {
                  return (
                    <View key={i} style={styles.eventItem}>
                      <View style={styles.eventRow}>
                        <Image source={{uri: item.PlatformLogo}} style={styles.platformLogo}></Image>
                        <Text style={[styles.fs15, styles.color6, styles.fb]}>{item.Platform}</Text>
                      </View>
                      <View style={[styles.eventRow, styles.eventMiddle]}>
                        <Text style={[styles.textAlignRight, styles.fs25, styles.fb, styles.lh36, styles.colorFF4B17]}>{item.InvestmentMoney}</Text>
                        <Text style={[styles.fs12, styles.colorA9A9A9]}>投资金额</Text>
                      </View>
                      <View style={styles.eventRow}>
                        <TouchableOpacity
                          style={styles.touchable}
                          activeOpacity={0.8}
                          onPress={() => {this._handlePressByID(item)}}>
                          <Text style={[styles.textAlignRight, styles.fs12, ]}>{'查看详情>'}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                })}
                <View style={styles.footer}>
                  <Text>——天呐，你已经看到底部啦！——</Text>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

export default withNavigation(DataBox)