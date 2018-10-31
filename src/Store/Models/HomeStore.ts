import { observable, computed, flow, action } from 'mobx';
import { DOMAIN_URL } from '~utils';
import axios from 'axios';
import fetch from '~fetch'
import {
  fetchList,
  fetchBannerList as ApiBannerList,
  fetchNotices as ApiNotices,
  fetchRecommendList as ApiRecommendList,
  fetchReimbursementRecord as ApiReimbursementRecord,
  fetchReceiptDetail as ApiReceiptDetail,
  fetchFeData as ApiFeData
} from '~apis';
import {fetchUserInfo} from "~apis/index"

class HomeStore {
  @observable
  arr = [];
  @observable
  bannerList = [];
  @observable
  notices = [];
  @observable
  recommendList = [];
  @observable
  reimbursementRecord = [];
  @observable
  firstRecomment = {} // 今日首推
  @observable
  receiptDetail = {};
  @observable
  platformURL = '' // 平台数据地址
  @observable
  userinfo = 0

  @computed
  get list() {
    return this.arr.map((item, index) => ({
      value: item,
      key: index
    }));
  }
  @computed
  get getBannerList() {
    return this.bannerList;
  }
  @computed
  get getNotices() {
    return this.notices;
  }
  @computed
  get getRecommendList() {
    return this.recommendList;
  }
  @computed
  get getFirstRecommend() {
    return this.firstRecomment
  }
  @computed
  get getReimbursementRecord() {
    return this.reimbursementRecord;
  }
  @computed
  get getReceiptDetail() {
    return this.receiptDetail;
  }
  @computed
  get getPlatformURL() {
    return this.platformURL
  }

  // async
  @action
  setArr(arr) {
    this.arr = arr;
  }
  setBannerList(bannerList) {
    this.bannerList = bannerList;
  }
  setNotices(notices) {
    this.notices = [...notices, ...this.notices];
  }
  setRecommendList(list) {
    this.recommendList = list;
  }
  setFirstRecomment(obj) {
    this.firstRecomment = obj
  }
  setReimbursementRecord(list) {
    this.reimbursementRecord = list;
  }
  setReceiptDetail(detail) {
    this.receiptDetail = detail;
  }
  setPlatformURL(url) {
    this.platformURL = url
  }


  loadList = flow(function*() {
    const data = yield fetchList();
    this.arr = data;
  });

  loadBannerList = flow(function*(params) {
    const data = yield ApiBannerList(params);
    this.setBannerList(data.appImage.length <= 5 ? data.appImage : data.appImage.slice(0, 5));
  });
  loadNotices = flow(function*(params) {
    const data = yield ApiNotices(params);
    this.setNotices(data.list);
  });
  loadRecommendList = flow(function*(params) {
    const data = yield ApiRecommendList(params);
    this.setRecommendList(data.remen.splice(0, 4))
    this.setFirstRecomment(data.shoutui)
  });
  loadReimbursementRecord = flow(function*(params) {
    const data = yield ApiReimbursementRecord(params);
    this.setReimbursementRecord = data;
  });
  loadReceiptDetail = flow(function*(params) {
    const data = yield ApiReceiptDetail(params);
    this.setReceiptDetail(data);
  });
  loadFeData = flow(function* () {
    const data = yield ApiFeData()
    this.setPlatformURL(data.platformURL)
  })
  loadUserInfo = flow(function* () {
    axios.get('http://www.qunalc.com/fanliwang/user.do').then(({ data }) => {
      if(data.code === 0 ) {
        this.userinfo = data.content
      }
    })
  })
}

export default new HomeStore();
