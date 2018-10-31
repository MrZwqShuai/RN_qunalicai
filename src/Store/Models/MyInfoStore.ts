import { observable, action, flow } from 'mobx';
import {
  getPlatFormNames,
  getReceiptListLen,
  getWithdrawBalance,
  fetchUserInfo,
  fetchWithDraw,
  modifyUserInfo
} from '~apis';
import { getDateList, getCurrentDate } from '~utils';
import Picker from 'react-native-picker';
class MyInfoStore {
  @observable
  user = {
    sex: '', //性别
    birthday: '', //生日
    cardNo: '', // 银行卡
    headPicture: '', //头像
    nickName: '', //昵称
    referrerCode: '', // 邀请码
    phoneNumber: '' //手机号
  };
  @observable
  lJProfit = 0; //累计收益
  @observable
  balance = 0; //账户余额
  @observable
  redNum = 0; //红包个数
  @observable
  receiptList = [
    {
      bgImg: 'receiptRecord',
      title: '回单记录',
      desc: '',
      link: 'ReceiptRecord'
    },
    {
      bgImg: 'receiptPlan',
      title: '回款计划',
      desc: '',
      link: 'ReturnPlan'
    }
  ];
  @action
  clearParams() {
    this.user = {
      sex: '', //性别
      birthday: '', //生日
      cardNo: '', // 银行卡
      headPicture: '', //头像
      nickName: '', //昵称
      referrerCode: '', // 邀请码
      phoneNumber: '' //手机号
    };
    this.lJProfit = 0;
    this.balance = 0;
    this.redNum = 0;
    this.receiptList = [
      { ...this.receiptList[0], desc: '' },
      { ...this.receiptList[1], desc: '' }
    ];
  }
  @action
  showSexPicker() {
    Picker.init({
      pickerData: ['男', '女'],
      selectedValue: ['男'],
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择性别',
      onPickerConfirm: sex => {
        const sexVal = sex[0] == '男' ? 0 : 1;
        this.modifyUserInfo('sex', sexVal);
      }
    });
    Picker.show();
  }
  @action
  showBirthdayPicker() {
    Picker.init({
      pickerData: getDateList(),
      selectedValue: getCurrentDate(),
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择日期',
      onPickerConfirm: val => {
        const date = val[0] + '-' + val[1] + '-' + val[2];
        this.modifyUserInfo('birthday', date);
      }
    });
    Picker.show();
  }
  @action
  setPrams(param, val) {
    this.user[param] = val;
  }
  // 我的页面初始化
  initData = flow(function*() {
    console.log('dateList:', getDateList()[0]);
    const data = yield fetchUserInfo();
    const {
      gerenshouyi: { lJProfit, number, balance },
      redNum: { xinshouRed }
    } = yield getPlatFormNames();
    const res = yield getReceiptListLen();
    for (let attr in this.user) {
      this.user[attr] = data.user[attr];
    }
    this.receiptList[0].desc = number + '笔待审核';
    this.receiptList[1].desc = res.counts + '笔待回款';
    this.lJProfit = lJProfit;
    this.balance = balance;
    this.redNum = xinshouRed;
  });
  // 处理提现
  handleWithDraw = flow(function*() {
    const data = yield fetchWithDraw();
    if (data !== 0) {
      this.balance = 0;
    }
  });
  //修改个人信息
  modifyUserInfo = flow(function*(type, value) {
    let tabState;
    switch (type) {
      case 'nickName':
        tabState = 1;
        break;
      case 'sex':
        tabState = 2;
        break;
      case 'birthday':
        tabState = 3;
        break;
    }
    const data = yield modifyUserInfo({ str: value, tabState });
    if (data !== 0) {
      this.user[type] = value;
    }
  });
}
export default new MyInfoStore();
