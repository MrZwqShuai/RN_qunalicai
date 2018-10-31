import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import ScrollVertical from './scroll-vertical'
import styles from '../../assets/style'
import { DOMAIN_URL } from '~utils'

@inject('HomeStore')
@observer class ScrollInfoComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  _goToAnnouncement = id => {
    this.props.naviToWebView(`${DOMAIN_URL}/#/announce/${id}`)
  }
  componentWillMount() {
    this.props.HomeStore.loadNotices({
      page: 1,
      pageSize: 10
    })
  }
  render() {
    let array = []
    this.props.HomeStore.notices.forEach((item, i) => {
      array[i] = item
    })
    return (
      <View style={styles.scrollInfo}>
        <View style={styles.bellIcon}>
          <Image style={styles.scrollInfoIcon} source={require('./img/bell.jpg')}/>
        </View>
        {
          array.length ? (
            <ScrollVertical
              onPress={this._goToAnnouncement}
              enableAnimation={true}
              data={array}
              delay={2500}
              duration={1000}
              scrollHeight={34}
              kbContainer={{flex: 1}}
              scrollStyle={{ alignItems: 'flex-start' }}
              textStyle={{ color: '#333', fontSize: 14 }} />
          ) : null
        }

        <View>
          <Image style={styles.goDetail} source={require('./img/go.jpg')}></Image>
        </View>
      </View>
    )
  }
}

export default ScrollInfoComponent
