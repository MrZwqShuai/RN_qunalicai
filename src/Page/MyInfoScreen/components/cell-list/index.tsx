import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import Tocuhable from '~components/Touchable';
import styles from './style';
import {aboutUrl, problemUrl, serviceUrl} from "~utils"
@inject('MyInfoStore', 'RootStore')
@observer
class CellList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellList: [
        {
          title: '资金记录',
          icon: require('../../assets/images/fundRecord.png'),
          link: 'CapitalRecord'
        },
        {
          title: '我的红包',
          icon: require('../../assets/images/redPackets.png'),
          link: 'MyRedBag'
        },
        {
          title: '投资概况',
          icon: require('../../assets/images/invest.png'),
          link: 'MyInvest'
        },
        {
          title: '在线客服',
          icon: require('../../assets/images/customer.png'),
          link: serviceUrl
        },
        {
          title: '常见问题',
          icon: require('../../assets/images/question.png'),
          link: problemUrl
        },
        {
          title: '关于我们',
          icon: require('../../assets/images/about.png'),
          link: aboutUrl
        }
      ]
    };
  }
  _handleCellClick = url => {
    if (url === 'CapitalRecord' || url === 'MyRedBag' || url === 'MyInvest') {
      this.props.navClick(url);
    } else {
      this.props.navigation.navigate('HomeWebview', {
        url
      });
    }
  };
  _renderCellExtraText = item => {
    if (item.link === 'MyRedBag') {
      if (!this.props.RootStore.isLogin) {
        return (
          <View style={styles.cellNote}>
            <Text style={styles.redFont}>注册即送28元现金</Text>
          </View>
        );
      } else if (this.props.MyInfoStore.redNum > 0) {
        return (
          <View style={styles.cellNote}>
            <Text style={styles.noteText}>您有</Text>
            <Text style={styles.redFont}>
              {this.props.MyInfoStore.redNum}个
            </Text>
            <Text style={styles.noteText}>个红包待使用</Text>
          </View>
        );
      }
    }
  };
  render() {
    return (
      <View style={styles.cellList}>
        {this.state.cellList.map((item, index) => {
          return (
            <Tocuhable
              style={styles.cellItem}
              key={index}
              onPress={() => this._handleCellClick(item.link)}>
              <View style={styles.cellLeft}>
                <Image style={styles.cellIcon} source={item.icon} />
                <Text style={styles.cellTitle}>{item.title}</Text>
              </View>
              <View style={styles.cellRight}>
                {this._renderCellExtraText(item)}
                <Image
                  style={styles.arrow}
                  source={require('../../assets/images/myinfo_arrow.png')}
                />
              </View>
            </Tocuhable>
          );
        })}
      </View>
    );
  }
}
export default withNavigation(CellList);
