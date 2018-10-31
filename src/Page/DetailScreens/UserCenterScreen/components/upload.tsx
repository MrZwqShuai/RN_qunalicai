import * as React from 'react';
import { ActionSheet, Text } from 'native-base';
import { UPLOAD_AVATOR_URL } from '~utils';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from '~components/NewToast';
import RootStore from '../../../../Store/Models/RootStore';

const BUTTONS = ['拍照', '从相册选择照片', '取消'];
const CANCEL_INDEX = 2;
const UPLOAD_OPTION = {
  width: 80,
  height: 80,
  cropperCircleOverlay: true,
  includeBase64: true,
  freeStyleCropEnabled: true,
  avoidEmptySpaceAroundImage: false,
  showCropGuidelines: false,
  enableRotationGesture: false,
  hideBottomControls: true,
  cropperToolbarTitle: '图片裁剪',
  cropperChooseText: '确定',
  cropperCancelText: '取消',
  cropping: true
};
class CameraButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    getAvatorData: PropTypes.func
  };
  _handleSubmitUpload = res => {
    if (res && res.data) {
      if (res.size / 1024 / 1024 > 5) {
        return Toast.show('照片尺寸不能超过5M');
      }
      let userid = RootStore.userId;
      let body = [
        { name: 'userid', data: userid },
        {
          name: 'file',
          filename: res.modificationDate || 'file',
          type: 'image/jpg',
          data: res.data
        }
      ];
      RNFetchBlob.fetch(
        'POST',
        UPLOAD_AVATOR_URL,
        {
          'Content-Type': 'multipart/form-data'
        },
        body
      )
        .uploadProgress((written, total) => {
          // 本地查找进度
        })
        .progress((received, total) => {
          let perent = received / total;
          // 上传进度打印
          console.log('perent', perent);
        })
        .then(response => response.json())
        .then(response => {
          // 上传信息返回
          console.log('response', response);
          if (response.code === 0) {
            this.props.getAvatorData(res.path);
          }
        })
        .catch(error => {
          // 错误信息
          console.log('error', error);
        });
    }
  };
  _toggleActionSheet = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: '选择照片'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          ImagePicker.openCamera(UPLOAD_OPTION).then(res => {
            this._handleSubmitUpload(res);
          });
        } else if (buttonIndex === 1) {
          ImagePicker.openPicker(UPLOAD_OPTION).then(res => {
            console.log('res', res);
            this._handleSubmitUpload(res);
          });
        }
      }
    );
  };
  render() {
    return null;
  }
}

export default CameraButton;
