import { NetInfo, View } from 'react-native';
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Toast from '~components/NewToast';
type Props = {
  message?: string;
  position?: string;
  textColor?: string;
  backgroundColor?: string;
  duration?: number;
}

@inject('RootStore')
@observer
export default class NetWorkInfo extends React.Component<Props> {


  static defaultProps = {
    message: '无法连接网络,请检查网络情况!',
    position: 'top',
    duration: 3000,
    backgroundColor: '#c12828',
    textColor: '#fff'
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
        null
    )
  }

  componentDidMount() {
    this.getNetWorkConnect(this.handleConnect);
    this.getNetWorkState();
  }

  async getNetWorkState() {
    let connectionInfo = await NetInfo.getConnectionInfo();
    console.log('当前网络类型: ' + connectionInfo.type + ', effectiveType:' + connectionInfo.effectiveType);
    if(connectionInfo.type == 'none') {
      this.props.RootStore.setNetWork(false);
    }
    return connectionInfo;
  }

  async getNetWorkConnect(handleConnect) {
    await NetInfo.isConnected.addEventListener('connectionChange', handleConnect.bind(this));
  }

  handleConnect(isConnected) {
    this.props.RootStore.setNetWork(isConnected);
    if (!isConnected) {
      Toast.show(this.props.message, this.props.position, this.props.backgroundColor, this.props.textColor, this.props.duration,);
    }
  }

}
