import { observable, action, flow, computed } from 'mobx';
import {
  getPlatFormNames,
  getCalendarAPP,
  getSignOrNot,
  getSignIn,
  fetchSignAppList
} from '~apis';
import { initSignAppList } from '~utils'
class SignStore {
  @observable signDay = 0
  @observable award = 0
  @observable signInfo = {}
  @observable signModal = false
  @observable isSign = true
  @observable signMoney = 0

  @observable params = {
    page: 1,
    pageSize: 15,
    recordType: '',
    ffrom: '2'
  }
  @observable.shallow totalGainList = []
  @observable allPage = 1
  @observable currentPage = 1
  @observable status = 0


  @computed get signInfoList() {
    let arr = []
    for (const key in this.signInfo) {
      if (this.signInfo.hasOwnProperty(key)) {
        const element = this.signInfo[key];
        arr.push({ name: key, isActive: element });
      }
    }
    return arr;
  }
  get gainList () {
    return initSignAppList(this.totalGainList);
  }
  @action
  setAward(value) {
    this.award = value;
  }
  setSignDay(value) {
    this.signDay = value;
  }
  setSignInfo(value) {
    this.signInfo = value;
  }
  setSignModal(value) {
    this.signModal = value;
  }
  setIsSign(value) {
    this.isSign = value;
  }
  setSignMoney(value) {
    this.signMoney = value;
  }
  setCurrentPage(value) {
    this.currentPage = value;
  }
  clearTotalGainList(list) {
    this.totalGainList = list;
  }
  setGotalGainList (value) {
    this.totalGainList = this.totalGainList.concat(value);
  }
  setParams(key, value) {
    this.params[key] = value;
  }
  setAllPage(value) {
    this.allPage = value;
  }
  setStatus (value) {
    this.status = value;
  }
  getPlatFormNames = async () => {
    const { gerenshouyi: { award, signDays } } = await getPlatFormNames()
    this.setAward(award);
    this.setSignDay(signDays)
  }
  getCalendarAPP = async () => {
    const data = await getCalendarAPP()
    this.setSignInfo(data)
  }
  getSignOrNot = async () => {
    const data = await getSignOrNot()
    if (data === '未签到') {
      this.setIsSign(false)
    } else {
      this.setIsSign(true)
    }
  }
  getSignIn = async () => {
    const data = await getSignIn();
    if (data !== 0) {
      this.setSignMoney(data);
      this.setSignModal(true);
    }
  }
  fetchSignAppList = flow(function* () {
    const data = yield fetchSignAppList(this.params);
    const { list, Allpage } = data;
    if (this.currentPage == 1) {
      this.clearTotalGainList(list);
    } else {
      this.setGotalGainList(list);
    }
    this.setAllPage(Allpage);
  })
  
}

export default new SignStore();