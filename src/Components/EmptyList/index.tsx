import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { inject, observer } from 'mobx-react';
import ErrorComponent from './error.component';
import EmptyComponent from './empty.component';
import OfflineComponent from './offline.component';
type Props = {
  handleReload(): void;
  offline: boolean;
  errorInterface: boolean;
}

@inject('RootStore')
@observer
export default class ListEmptyComponent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    if (this.props.RootStore.loading) {
      return (
        <View>
          <ActivityIndicator
            style={[styles.centering, { height: 80 }]}
          />
        </View>
      )
    } else {
      if(this.props.offline) {
        return (
          <OfflineComponent />
        )
      } else if (this.props.errorInterface) {
        return (
          <ErrorComponent handleReload={() => { this.reload() }} />
        )
      } else {
        return (
          <EmptyComponent />
        )
      }
    }

  }

  reload() {
    this.setLoading(true);
    this.props.handleReload();
  }

  setLoading(showLoading: boolean) {
    this.props.RootStore.setLoading(showLoading);
  }


  componentWillUnmount() {
    this.setLoading(false);
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