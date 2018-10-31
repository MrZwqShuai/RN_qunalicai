import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import styles from '../../assets/style'
import { newGuideUrl, platformURL } from '~utils'
import {pxToDp} from "~utils"
import {toJS} from "mobx"

@inject('HomeStore')
@observer
export default class SwiperShadow extends React.Component {
  public render() {
    const bannerList = toJS(this.props.HomeStore.bannerList)
    return (
      <View style={styles.shadowView}>
        {
          bannerList.length ? (<Image style={styles.shadowImage} source={require('../../assets/images/bannerShadow.png')}></Image>) : null
        }
      </View>
    )
  }
}
