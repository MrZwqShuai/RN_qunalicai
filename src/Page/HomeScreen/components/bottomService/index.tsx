import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { rootStore } from '~store'
import styles from '../../assets/style'
import { serviceUrl, problemUrl } from '~utils'

@inject('HomeStore')
@observer class BottomService extends React.Component {
  constructor(props) {
    super(props)
  }
  _toWebView = (url) => {
    this.props.navigation.navigate('HomeWebview', {
      url
    })
  }
  componentDidMount() {
  }
  public render () {
    return (
      <View style={styles.bottomService}>
        <TouchableOpacity activeOpacity={0.8} style={styles.serviceItem} onPress={() => this._toWebView(serviceUrl)}>
          <Image source={require('./images/bottom-service.png')} style={styles.serviceImage}></Image>
          <View style={styles.serviceTextContent}>
            <Text style={styles.serviceTextTitle}>在线客服</Text>
            <Text style={styles.serviceTextDesc}>周一至周五9:30-19:30</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.serviceItem} onPress={() => this._toWebView(problemUrl)}>
          <Image source={require('./images/bottom-questions.png')} style={styles.serviceImage}></Image>
          <View style={styles.serviceTextContent}>
            <Text style={styles.serviceTextTitle}>常见问题</Text>
            <Text style={styles.serviceTextDesc}>更多问题可点击解答</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}


export default withNavigation(BottomService)