import * as React from 'react'
import { View } from 'react-native';
import styles from './styles'
export default class Pop extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <View style={styles.container}>
        {this.props.children}
        <View style={styles.mask}>
        </View>
      </View>
    )
  }
}