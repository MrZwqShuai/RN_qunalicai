import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
// import * as wechat from 'react-native-wechat';
import Modal from 'react-native-simple-modal';
import { toJS } from 'mobx';
import Toast from '~components/NewToast';
import ShareUtil from '../../Config/umeng/ShareUtil';

const style = EStyleSheet.create({
  containerStyle: {
    justifyContent: 'flex-end'
  },
  modalContent: {
    width: '100%',
    margin: 0,
    padding: 0
  },
  shareContainer: {},
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingTop: 10,
    paddingBottom: 20
  },
  topItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    backgroundColor: '#eee',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 15
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10
  }
});

@inject('ShareStore')
@observer
export default class MyRedBagModal extends React.Component {
  constructor(props) {
    super(props);
    // wechat.registerApp('wx203bdbf6749d77e8');
  }

  _closeModal = () => {
    this.props.ShareStore.toggleShareModel();
  };

  _shareToTimeline = async () => {
    const {
      title,
      description,
      picture,
      shareUrl
    } = this.props.ShareStore.shareContent;
    console.log(title,
      description,
      picture,
      shareUrl, '就ask的飞机喀什假大空', ShareUtil);
    this.props.ShareStore.toggleShareModel();
    ShareUtil.share(
      description,
      picture,
      shareUrl,
      title,
      3,
      (code, message) => {
        Toast.show(code === 200 ? '分享成功' : '分享失败');
        if (code === 200) {
          this.props.ShareStore.callback();
        }
        return;
      }
    );
    // const isInstalled = await wechat.isWXAppInstalled();
    // const shareContent = toJS(this.props.ShareStore.shareContent);
    // if (isInstalled) {
    //   try {
    //     let result = await wechat.shareToTimeline({
    //       title: shareContent.title || '',
    //       description: shareContent.description || '',
    //       thumbImage: shareContent.picture || '',
    //       type: 'news',
    //       webpageUrl: shareContent.shareUrl || ''
    //     });
    //     Toast.show('分享成功');
    //     this.props.ShareStore.callback();
    //     this.props.ShareStore.toggleShareModel();
    //   } catch (e) {
    //     Toast.show('分享失败');
    //   }
    // } else {
    //   Toast.show('微信未安装');
    // }
  };

  _shareToFriend = async () => {
    const {
      title,
      description,
      picture,
      shareUrl
    } = this.props.ShareStore.shareContent;
    this.props.ShareStore.toggleShareModel();
    ShareUtil.share(
      description,
      picture,
      shareUrl,
      title,
      2,
      (code, message) => {
        Toast.show(code === 200 ? '分享成功' : '分享失败');
        if (code === 200) {
          this.props.ShareStore.callback();
        }
      }
    );
    // const isInstalled = await wechat.isWXAppInstalled();
    // const shareContent = this.props.ShareStore.shareContent;
    // if (isInstalled) {
    //   try {
    //     let result = await wechat.shareToSession({
    //       title: shareContent.title || '22',
    //       description: shareContent.description || '222',
    //       thumbImage:
    //         shareContent.picture ||
    //         'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
    //       type: 'news',
    //       webpageUrl:
    //         shareContent.shareUrl ||
    //         'http://192.168.3.12:124/app/rebate/index.html#/download'
    //     });
    //     Toast.show('分享成功');
    //     this.props.ShareStore.callback();
    //     this.props.ShareStore.toggleShareModel();
    //   } catch (e) {
    //     Toast.show('分享失败');
    //   }
    // } else {
    //   Toast.show('微信未安装');
    // }
  };

  render() {
    return (
      <Modal
        open={this.props.ShareStore.isOpenShareModel}
        containerStyle={style.containerStyle}
        modalStyle={style.modalContent}>
        <View style={style.shareContainer}>
          <View style={style.top}>
            <TouchableOpacity
              style={style.topItem}
              activeOpacity={0.7}
              onPress={this._shareToFriend}>
              <Image
                source={require('./images/friend.png')}
                style={style.icon}
              />
              <Text>微信好友</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.topItem}
              activeOpacity={0.7}
              onPress={this._shareToTimeline}>
              <Image
                source={require('./images/circle.png')}
                style={style.icon}
              />
              <Text>朋友圈</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this._closeModal}>
            <Text style={style.bottom}>取消</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  shareSuccess(): void {
    this.props.ShareStore.callback();
  }
}
