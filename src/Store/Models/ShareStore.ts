import { observable, action } from 'mobx';

class ShareStore {
  @observable
  isOpenShareModel = false;
  @observable
  shareContent = {};
  @observable
  callback = () => {};

  @action
  setShare(shareContent) {
    this.shareContent = shareContent;
  }

  @action
  toggleShareModel() {
    this.isOpenShareModel = !this.isOpenShareModel;
  }

  @action
  setCallBack(callback) {
    this.callback = callback;
  }

  @action
  resetCallback() {
    this.callback = () => null;
  }
}

export default new ShareStore();
