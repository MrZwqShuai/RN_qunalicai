import * as React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-looped-carousel';
import AsyncImageAnimated from '~components/AsyncImageAnimated';
import styles from '../../assets/style';
import RootStore from '~store/Models/RootStore';

@inject('RootStore')
@inject('HomeStore')
@observer
class SwiperComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    size: {
      width: 360,
      height: 337 / 2
    }
  };
  _handlePressOnBanner = (item, i) => {
    if (i === 1) {
      this.props.navigation.navigate('DiscoverInviting');
    } else if (i === 2) {
      this.props.navigation.navigate('DiscoverWelfareHouse');
    } else {
      if (item.appwangzhi.indexOf('isNeedLogin') > -1) {
        console.log('login');
        if (this.props.RootStore.isLogin) {
          this.props.naviToWebView(item.appwangzhi);
        } else {
          this.props.navigation.navigate('Auth');
        }
      } else {
        this.props.naviToWebView(item.appwangzhi);
      }
    }
    // if(item.type === 'webview') {
    //   this.props.naviToWebView(item.appwangzhi)
    // }else {
    //   if(item.isNeedLogin) {
    //     if(!this.props.RootStore.isLogin) {
    //       this.props.navigation.navigate('Login')
    //     }else {
    //       this.props.navigation.navigate(item.appwangzhi)
    //     }
    //   }else {
    //     this.props.navigation.navigate(item.appwangzhi)
    //   }
    // }
  };
  _onLayoutDidChange = e => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };
  componentWillMount() {
    this.props.HomeStore.loadBannerList({ version: 2 });
  }
  render() {
    const bannerList = toJS(this.props.HomeStore.bannerList);
    const swiperPlaceholder = require('../../assets/images/swiper-placeholder.png');
    return (
      <View style={styles.banner}>
        <Carousel
          delay={2000}
          style={styles.swiperWrapper}
          autoplay
          bullets={true}
          bulletStyle={{ width: 5, height: 5, backgroundColor: '#f5f5f5' }}
          bulletsContainerStyle={{ bottom: 6 }}
          chosenBulletStyle={{ backgroundColor: '#fff', width: 12, height: 5 }}>
          {bannerList.length ? (
            bannerList.map((item, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={i}
                  style={styles.slide}
                  onPress={() => this._handlePressOnBanner(item, i)}>
                  <AsyncImageAnimated
                    style={styles.swiperImg}
                    source={{ uri: `${item.appimage}` }}
                    placeholderSource={swiperPlaceholder}
                    animationStyle="explode"
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.slide}>
              <Image
                style={styles.swiperImg}
                resizeMode="stretch"
                source={swiperPlaceholder}
              />
            </View>
          )}
        </Carousel>
      </View>
    );
  }
}

export default withNavigation(SwiperComponent);
