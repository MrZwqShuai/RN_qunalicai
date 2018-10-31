
import * as React from 'react';
import { View, Text,ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
class ListFooter extends React.Component {
  constructor(props){
    super(props)
  }
  static propTypes = {
    status: PropTypes.number
  }
  render () {
    const { status } = this.props;
    if(status == 1) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>数据正在加载中...</Text>
        </View>
      )
    } else if(status == 0) {
      return null;
    } else if(status == 2) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>没有更多数据了...</Text>
        </View>
      )
    }
    
  }
}

export default ListFooter