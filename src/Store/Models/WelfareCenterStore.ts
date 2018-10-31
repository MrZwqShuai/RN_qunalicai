import { observable, action, flow } from 'mobx';
import Toast from '~components/NewToast';
import {
  fetchWelfareTaskList,
  fetchCurrentBeans,
  fetchRecordList,
  fetchTaskStatusList,
  fetchUserInfo,
  fetchOpenRedBag,
  getSignIn
} from '~apis';
class WelfareCenterStore {
  @observable
  taskReady = false; //福利中心骨架屏
  @observable
  isReady = false; //任务记录骨架屏
  @observable
  nickName = ''; //昵称
  @observable
  headPicture = ' '; //头像
  @observable
  taskList = []; //任务列表
  @observable
  needBeans = 100; //当前还需要的金豆数量
  @observable
  currentBeans = 0; //当前还需要的金豆数量
  @observable
  redBagMoney = 0; //红包钱
  @observable
  recordList = []; //任务记录列表
  @observable
  page = 1; //当前的页码
  @observable
  pageSize = 10; //请求的每页数据数量
  @observable
  isLast = false; //数据是否到底
  @action
  // 获取任务列表
  getTaskList = flow(function*(isLogin) {
    const data = yield fetchWelfareTaskList();
    if (isLogin) {
      const statusList = yield fetchTaskStatusList();
      data.forEach((item, index) => {
        for (let attr in statusList) {
          if (item.code == attr) {
            item.status = statusList[attr];
          }
        }
      });
    } else {
      data.forEach(item => {
        item.status = 0;
      });
    }
    this.taskReady = true;
    this.taskList = data;
  });

  // 获取用户信息
  getUserInfo = flow(function*() {
    const { user } = yield fetchUserInfo();
    this.nickName = user.nickName;
    this.headPicture = user.headPicture;
  });

  // 获取当前还需要的金豆数
  getCurrentBeans = flow(function*() {
    const data = yield fetchCurrentBeans();
    this.needBeans = data.restGold;
    this.currentBeans = data.tree_gold;
  });

  // 拆红包
  openRedBag = flow(function*() {
    const data = yield fetchOpenRedBag();
    this.redBagMoney = data;
  });

  // 获取任务记录列表
  getRecordList = flow(function*(type) {
    const startTime = Date.now();
    const page = type === 1 ? this.page + 1 : 1;
    const data = yield fetchRecordList({ page, pageSize: this.pageSize });
    this.isLast = page >= data.allPages ? true : false;
    if (type === 1) {
      this.recordList = this.recordList.concat(data.rewardList);
    } else {
      this.recordList = data.rewardList;
    }
    const timeGap = (Date.now() - startTime) / 1000;
    if (timeGap < 1) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.isReady = true;
      }, 300);
    } else {
      this.isReady = true;
    }
  });
  //签到
  getSignIn = flow(function*() {
    const data = yield getSignIn();
    if (data) {
      this.getCurrentBeans();
      this.taskList.forEach((item, index) => {
        if (item.code === 'SIGN') {
          this.taskList[index] = {
            ...this.taskList[index],
            status: 1
          };
        }
      });
      Toast.show('签到成功');
    }
  });
}
export default new WelfareCenterStore();
