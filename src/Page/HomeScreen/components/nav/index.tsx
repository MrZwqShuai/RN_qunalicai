import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from '../../assets/style';
import { newGuideUrl, platformURL } from '~utils';

@inject('RootStore')
@inject('HomeStore')
@observer
class NavComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    iconList: [
      {
        iconText: '每日签到',
        iconUrl: require('./img/nav_01.png'),
        type: 'native',
        url: 'DiscoverWelfareHouse',
        isNeedLogin: 1
      },
      {
        iconText: '邀请好友',
        iconUrl: require('./img/nav_02.png'),
        type: 'native',
        url: 'DiscoverInviting',
        isNeedLogin: 1
      },
      {
        iconText: '平台数据',
        iconUrl: require('./img/nav_03.png'),
        type: 'web',
        url: platformURL
      },
      {
        iconText: '新手指引',
        iconUrl: require('./img/nav_04.png'),
        type: 'web',
        url: newGuideUrl
      }
    ]
  };
  _loadFeData = async () => {
    await this.props.HomeStore.loadFeData();
    let iconList = this.state.iconList;
    iconList[2].url = this.props.HomeStore.platformURL;
    this.setState({
      iconList: [...iconList]
    });
  };
  componentWillMount() {
    this._loadFeData();
  }
  _handlePressOnNav = item => {
    if (item.type === 'native') {
      if (item.isNeedLogin) {
        if (!this.props.RootStore.isLogin) {
          this.props.navigation.navigate('Login');
        } else {
          this.props.navigation.navigate(item.url, {
            ...item.params
          });
        }
      } else {
        this.props.navigation.navigate(item.url, {
          ...item.params
        });
      }
    } else {
      this.props.naviToWebView(item.url);
    }
  };
  render() {
    const { iconList } = this.state;
    return (
      <View style={styles.nav}>
        {iconList.map((item, i) => {
          return (
            <TouchableOpacity
              style={styles.navItem}
              activeOpacity={1}
              key={i}
              onPress={() => {
                this._handlePressOnNav(item);
              }}>
              <Image style={styles.navIcon} source={item.iconUrl} />
              <Text style={styles.navText}>{item.iconText}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default withNavigation(NavComponent);
