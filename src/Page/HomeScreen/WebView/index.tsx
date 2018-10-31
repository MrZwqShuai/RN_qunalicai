import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import Webview from '~components/Webview'
import HeaderLeft from '~components/HeaderLeft'
import { headerTitleStyle } from '~utils'
import styles from '../assets/style'

@observer
class HomeWebView extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  render() {
    return (
      <Webview
        url={this.props.navigation.getParam('url')}
      />
    )
  }
}

export default HomeWebView