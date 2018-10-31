import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { PlatformMes } from '~pages/ManageFinancialDetailScreen-copy/shared/detail.model';

type Props = {
  getPlatFormMes: PlatformMes;
};

@inject('ManageFinancialStore')
@observer
export default class PlatHelperComponent extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }

  public render() {
    let platFormMes = this.props.getPlatFormMes;
    return (
      <View>
        <View style={styles.importantTips}>
          {this.renderHelperComponent({
            title: '重要提示',
            content: platFormMes.zyts || ''
          })}
          <View style={{ marginTop: pxToDp(81) }}>
            {this.renderHelperComponent({
              title: '投资攻略',
              content: platFormMes.tzgl || ''
            })}
          </View>
        </View>
        <View style={styles.tutorial}>
          <Text style={styles.tutorialTitle}>图文教程</Text>
          <Text style={styles.tutorialContentTxt}>{platFormMes.twjc}</Text>
          <TouchableWithoutFeedback>
            <View style={styles.thumbnail}>{this.rendertHumbnail()}</View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.disclaimer}>
          {this.renderHelperComponent({
            title: '免责声明',
            content:
              '去哪理财仅为信息平台，本身不吸纳用户资金。活动平台不保证100%安全，如出现意外情况（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金、利息的情况），除去哪理财在特殊 活动上有注明的保障规则，否则去哪理财不承担任何责任。' ||
              ''
          })}
        </View>
      </View>
    );
  }

  componentDidMount() {
  }

  private rendertHumbnail() {
    return this.props.ManageFinancialStore.godaddy.map((photo, v) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            this.openHelperSwiper(v);
          }}
          key={v}>
          <View
            key={v}
            style={[
              styles.thumbnailItem,
              v === 1 ? { marginLeft: pxToDp(16), marginRight: pxToDp(16) } : ''
            ]}>
            <Image source={{uri: photo.allurl}} style={styles.thumbnailItemImage} />
            <View>
              <Image
                source={require('../../assets/images/search.png')}
                style={styles.thumbnailItemSearch}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  private renderHelperComponent(helper) {
    return (
      <View>
        <Text style={styles.helperTitle}>{helper.title}</Text>
        <View style={{ marginTop: pxToDp(50) }}>
          {helper.content.split('；').map((k, v) => {
            return (
              <View style={styles.helperContent} key={v}>
                {/* <View style={styles.helperContentSortView}>
                <Text style={styles.helperContentSort}>{v+1}</Text>
              </View> */}
                <Text style={styles.helperContentText}>{k}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  openHelperSwiper(index: number) {
    this.props.swiperChildrenRoot.wrappedInstance.openHelperSwiper(index);
  }
}

const styles = EStylesheet.create({
  importantTips: {
    // height: pxToDp(900),
    marginTop: pxToDp(16),
    paddingBottom: pxToDp(48),
    paddingLeft: pxToDp(31),
    paddingTop: pxToDp(49),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  },
  helperTitle: {
    fontSize: pxToDp(32),
    fontWeight: 'bold',
    color: '#333333'
  },
  helperContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: pxToDp(21)
  },
  helperContentSortView: {
    width: pxToDp(30),
    height: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(15),
    backgroundColor: '#BBBBBB'
  },
  helperContentSort: {
    fontSize: pxToDp(26),
    color: '#fff'
  },
  helperContentText: {
    // marginLeft: pxToDp(20),
    fontSize: pxToDp(28),
    color: '#333'
  },
  tutorial: {
    marginTop: pxToDp(16),
    paddingTop: pxToDp(46),
    paddingBottom: pxToDp(49),
    paddingLeft: pxToDp(32),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  },
  tutorialTitle: {
    fontSize: pxToDp(32),
    color: '#333'
  },
  tutorialContentTxt: {
    marginTop: pxToDp(33),
    fontSize: pxToDp(28),
    color: '#333333'
  },
  thumbnail: {
    flexDirection: 'row',
    marginTop: pxToDp(53)
  },
  thumbnailItem: {
    position: 'relative',
    width: pxToDp(208),
    height: pxToDp(208)
  },
  thumbnailItemSearch: {
    position: 'absolute',
    bottom: pxToDp(13),
    right: pxToDp(13),
    width: pxToDp(30),
    height: pxToDp(30)
  },
  thumbnailItemImage: {
    width: '100%',
    height: '100%',
    borderRadius: pxToDp(10)
  },
  disclaimer: {
    paddingLeft: pxToDp(31),
    paddingTop: pxToDp(49),
    paddingBottom: pxToDp(63),
    marginTop: pxToDp(16),
    marginBottom: pxToDp(32),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  }
});
