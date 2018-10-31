import * as React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


type Props = {
  handleReload(): void;
}

export default class ErrorComponent extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.failLoadTitle}>数据加载失败~</Text>
        <TouchableOpacity onPress={() => { this.reload() }}>
          <View style={styles.reloadBtn}>
            <Text style={styles.reloadTitle}>
              重新加载
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  reload() {
    this.props.handleReload();
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