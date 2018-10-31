import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Icon, Item, Text } from 'native-base';
import { inject, observer } from 'mobx-react';
import { Image, PixelRatio, TouchableOpacity } from 'react-native';
import Touchable from '~components/Touchable';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { withNavigation } from 'react-navigation';
import { mainContent } from '~pages/DiscoverScreen/assets/styles';
import { pxToDp } from '~utils';

@inject('NewsListStore')
@observer
class QNNewsItem extends React.Component {
  static propTypes = {
    itemData: PropTypes.object
  };
  static defaultProps = {
    itemData: {}
  };
  constructor(props) {
    super(props);
  }
  _onPress = item => {
    this.props.navigation.navigate('NewsDetail', {
      id: item.id
    });
  };
  public render() {
    let { itemData } = this.props;
    itemData = toJS(itemData);
    let imgUrl = null;
    const { defaultPic } = this.props.NewsListStore;
    if (itemData.ImgUrl) {
      itemData.ImgUrl = JSON.parse(itemData.ImgUrl);
      imgUrl = itemData.ImgUrl[0] ? itemData.ImgUrl[0].allurl : defaultPic;
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this._onPress(itemData)}
        style={styles.newsItem}>
        <Image
          source={{
            uri:
              imgUrl ||
              'https://wsimages.wsloan.com/images/qunalicai/qunalicai/qunalicai/placeholderbU8KUX_T4g2D1kiLV5JES.png'
          }}
          style={styles.newsImage}
        />
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.infoTitle}>
            {itemData.InfoTitle}
          </Text>
          {Number(itemData.IsAdvert) === 0 ? (
            <Text style={styles.advertBox}>广告</Text>
          ) : (
            <Text style={styles.infoTime}>{itemData.InfoTime}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = EStyleSheet.create({
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: pxToDp(200),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#e8e6e6',
    backgroundColor: '#fff'
  },
  newsImage: {
    width: pxToDp(165),
    height: pxToDp(120),
    resizeMode: 'stretch'
  },
  info: {
    flex: 1,
    marginLeft: pxToDp(30)
  },
  infoTitle: {
    width: '100%',
    marginBottom: pxToDp(16),
    color: '#333',
    fontSize: pxToDp(28)
  },
  infoTime: {
    color: '#999',
    fontSize: pxToDp(29)
  },
  advertBox: {
    width: pxToDp(81),
    height: pxToDp(35),
    lineHeight: pxToDp(33),
    color: '#666',
    fontSize: pxToDp(28),
    textAlign: 'center',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#959595',
    borderRadius: pxToDp(8)
  }
});

export default withNavigation(QNNewsItem);
