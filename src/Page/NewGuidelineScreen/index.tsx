import * as React from 'react';
import {
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import Swiper from 'react-native-swiper';
import { observer, inject } from 'mobx-react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GUIDE_IMAGES, BOOT_IMAGES } from './shared/images.config';

@inject('RootStore')
@observer
export default class NewGuideLineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0, // 0 GUIDE_IMAGES  1 BOOT_IMAGES
      curIndex: 0
    };
  }

  _scroller;

  handlePressOnGuideImage = async i => {
    const {
      state: { curIndex },
      _scroller
    } = this;
    if (curIndex === GUIDE_IMAGES.length - 1) {
      await AsyncStorage.setItem('isFirst', '1');
      this.setState({
        curIndex: 0,
        type: 0
      });
      this.props.RootStore.setShowApp(true);
    } else {
      _scroller.scrollBy(1, true);
    }
  };

  _onIndexChanged = idx => {
    this.setState({
      curIndex: idx
    });
  };

  _handleTapLast = i => {
    this.setState({
      type: 1
    });
  };

  render() {
    const {
      state: { type }
    } = this;

    return type === 0 ? (
      <Swiper index={0} loop={false} showsPagination={false}>
        {BOOT_IMAGES.map((item, i) => {
          return (
            <TouchableOpacity
              style={styles.swiperItem}
              activeOpacity={1}
              onPress={
                i === BOOT_IMAGES.length - 1 ? this._handleTapLast : null
              }
              key={i}>
              <Image
                style={styles.swiperImage}
                source={item}
                // resizeMode="cover"
              />
            </TouchableOpacity>
          );
        })}
      </Swiper>
    ) : (
      <Swiper
        index={2}
        loop={false}
        scrollEnabled={false}
        showsPagination={false}
        ref={r => (this._scroller = r)}
        onIndexChanged={this._onIndexChanged}>
        {GUIDE_IMAGES.map((item, i) => {
          return (
            <TouchableOpacity
              style={styles.swiperItem}
              activeOpacity={1}
              onPress={() => this.handlePressOnGuideImage(i)}
              key={i}>
              <Image
                style={styles.swiperImage}
                source={item}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          );
        })}
      </Swiper>
    );
  }
}

const { height, width } = Dimensions.get('window');
const styles = EStyleSheet.create({
  swiperItem: {
    width,
    height
  },
  swiperImage: {
    width,
    '@media ios': {
      height
    },
    '@media android': {
      height: height - 20
    }
  }
});
