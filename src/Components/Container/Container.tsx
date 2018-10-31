
import * as React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

class Container extends React.Component {
  constructor(props){
    super(props)
  }
  static propTypes = {
    children: PropTypes.any
  }
  render () {
    const { children } = this.props;
    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }
}

export default Container