import { observable, action, computed } from 'mobx';
import { DeviceStorage } from '~utils';
import JPushModule from 'jpush-react-native';

class RootStore {
  // 配置
  @observable
  // userId = '';
  userId = 'avMN6FRfebRvH2dVJVeQUw==';
  @action
  setUserId(userId) {
    // userId = 'xSXTtq9r7LsO5pkz4QhttA==';
    this.isLogin = !!userId;
    this.userId = userId;
  }

  @observable
  rootRouter = null;
  @action
  updateRootRouter(rootRouter) {
    this.rootRouter = rootRouter;
  }

  @observable
  currentTab = 'Home';

  @observable
  isConnected: boolean = true;

  @action
  setNetWork(isConnected: boolean): void {
    this.isConnected = isConnected;
  }

  @action
  setCurrentTab(currentTab) {
    this.currentTab = currentTab;
  }

  @observable
  isShowApp = false;
  @action
  setShowApp(isShowApp) {
    this.isShowApp = isShowApp;
  }

  @observable
  showFirstOrGuide = 0; // 0 first 1 guide
  @action
  setShowFirstOrGuide(showFirstOrGuide) {
    this.showFirstOrGuide = showFirstOrGuide;
  }

  @observable
  isLogin = false;
  @action
  setIsLogin(isLogin) {
    this.isLogin = isLogin;
  }

  @observable
  isOpenMyRedBagModal = false;
  @action
  toggleMyRedBagModal() {
    this.isOpenMyRedBagModal = !this.isOpenMyRedBagModal;
  }

  @observable
  isOpenRootModal = false;

  @observable
  renderRoot = null;

  @observable
  onCloseModal = null;

  @observable
  rootContainerStyle = {};

  @action
  setRenderRoot(renderRoot) {
    this.renderRoot = renderRoot;
  }

  @action
  setRootOnCloseModal(onCloseModal) {
    this.onCloseModal = onCloseModal;
  }

  @action
  setRootContainerStyle(containerStyle) {
    this.rootContainerStyle = containerStyle;
  }

  @action
  toggleRootModal() {
    this.isOpenRootModal = !this.isOpenRootModal;
  }

  @observable
  loading: boolean = true;
  @action
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @observable
  isOpenActivityModal: boolean = false;
  @action
  toggleActivityModal() {
    this.isOpenActivityModal = !this.isOpenActivityModal;
  }

  // JPUSH
  @action
  onStopPress() {
    JPushModule.stopPush();
    DeviceStorage.setItem('openNotify', 0); // 停止推送消息存入缓存中
  }

  onResumePress() {
    JPushModule.resumePush();
    DeviceStorage.setItem('openNotify', 1); // 开启推送消息
  }
}

export default new RootStore();
