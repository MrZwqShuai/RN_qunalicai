import * as React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, Content, Toast } from "native-base";
import '../../Config/utils/ls-netInfo/index';
type Props = {
}

export default class OfflineComponent extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.failLoadTitle}>无可用网络~</Text>
        <View style={styles.reloadBtn}>
          <Text style={styles.reloadTitle}>
            请检查网络设置
          </Text>
        </View>
      </View>
    )
  }

  componentDidMount() {
  }
}

const styles = EStyleSheet.create({
  emptyContainer: {
    marginTop: 10,
    justifyContent: 'center',
  },
  failLoadTitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#999',
  },
  reloadBtn: {
    width: 140,
    height: 28,
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#dcdcdc',
    borderRadius: 3,
    borderWidth: .6,
  },
  reloadTitle: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
})