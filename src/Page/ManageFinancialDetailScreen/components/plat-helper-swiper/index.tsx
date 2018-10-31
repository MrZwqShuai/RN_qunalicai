import { View, Text, Animated, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import Swiper from 'react-native-swiper'
import * as React from 'react';
import EStylesheet from 'react-native-extended-stylesheet';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

type Props = {
  hideHelperSwiperPicture(): void;
}

@inject('ManageFinancialStore')
@observer
export default class PlatHelperSwiperComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      initialSlide: 0,
      scaleAnim: new Animated.Value(0),
    }
  }
  render() {
    // console.log(this.getLargerHumbnailArr(), '蛤科的还是离开东京理科');
    let { scaleAnim } = this.state;
    if (this.props.ManageFinancialStore.showHelperSwiper) {
      return (
        <Animated.View style={[styles.swiperContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Swiper style={styles.wrapper}
            showsButtons={false}
            dotColor="#f5f5f5"
            activeDotColor="#FFAD2C"
            loop={false}
            index={this.state.initialSlide}
          >
            {this.renderSwiperItem()}
          </Swiper>
        </Animated.View>
      )
    } else {
      return null;
    }
  }
  private renderSwiperItem() {
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    const swiperItem = this.props.ManageFinancialStore.godaddy.map((photo, v) => {
      let imageHeight = 0;
      return (
        <TouchableWithoutFeedback key={v} onPress={() => { this.closeHelperSwiper() }}>
        <View style={styles.slide1}>
            <View>
              <Image source={{uri: photo.allurl}} resizeMode="contain" style={{width: screenWidth, height: screenHeight}}/>
            </View>
        </View>
        </TouchableWithoutFeedback>
      )
    })
    return swiperItem;
  }

  closeHelperSwiper() {
    Animated.timing(
      this.state.scaleAnim,
      {
        toValue: 0,
        duration: 200
      }
    ).start();
    let timer = setTimeout(() => {
      this.props.ManageFinancialStore.setHelperSwiperPicture(false);
      clearTimeout(timer);
    }, 100);
  }

  openHelperSwiper(initialSlide: number) {
    this.setState({
      initialSlide: initialSlide
    })
    this.state.scaleAnim.setValue(1.2);
    this.props.ManageFinancialStore.setHelperSwiperPicture(true);
    Animated.spring(
      this.state.scaleAnim,
      {
        toValue: 1,
        friction: 4.5,
      }
    ).start();
  }

  getLargerHumbnailArr(): object[] {
    let humbnailArr = [];
    try {
      const { twjcPic } = this.props.ManageFinancialStore.getPlatformMes;
      if(this.props.ManageFinancialStore.getPlatformMes.twjcPic) {
        humbnailArr = JSON.parse(twjcPic);
      } else {
        humbnailArr = [];
      }
    } catch(e) {
      console.log('错误信息: ' + e.message);
    }
    return humbnailArr;
  }
}

const styles = EStylesheet.create({
  swiperContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    overflow: 'hidden',
    backgroundColor: '#000',
    zIndex: 999,
  },
  wrapper: {
  },
  slide1: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})