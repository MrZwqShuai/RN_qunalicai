import * as React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default class EmptyComponent extends React.PureComponent {
  render() {
    return (
      <View style={styles.emptyContainer}>
      <Text style={{textAlign: 'center'}}>暂无数据~</Text>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
  }
})