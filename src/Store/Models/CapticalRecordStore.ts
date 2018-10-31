import { observable, computed, flow, action } from 'mobx';
import { getCapticalRecord } from '~apis';

class CapticalRecordStore {
  @observable
  isReady = false; //骨架屏
  @observable
  tabIndex = 0; //当前tab索引值
  @observable
  pageSize = 10; //请求的每页数据数量
  @observable
  ffrom = 2; //列表请求数据的必传参数
  @observable
  // tab列表
  tabs = [
    {
      recordType: '',
      name: '全部',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    },
    {
      recordType: '返现',
      name: '返现',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    },
    {
      recordType: '邀请奖励',
      name: '邀请奖励',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    },
    {
      recordType: '红包',
      name: '红包',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    },
    {
      recordType: '提现',
      name: '提现',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    }
  ];

  @action
  setTabIndex(index) {
    this.tabIndex = index;
  }
  getCapticalRecord = flow(function*(type) {
    const startTime = Date.now();
    if (type === 0) {
      this.isReady = false;
    }
    const index = this.tabIndex;
    const page = type === 1 ? this.tabs[index].page + 1 : 1;
    const { recordType } = this.tabs[index];
    const { pageSize, ffrom } = this;
    const data = yield getCapticalRecord({
      recordType,
      page,
      pageSize,
      ffrom
    });
    if (type === 0) {
      const timeGap = (Date.now() - startTime) / 1000;
      if (timeGap < 1) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          this.isReady = true;
        }, 300);
      } else {
        this.isReady = true;
      }
    }
    const list =
      type === 1
        ? this.tabs[index].list.concat(data.capitalRecordList)
        : data.capitalRecordList;
    const isLast = page >= data.Allpage ? true : false;
    this.tabs[index] = {
      ...this.tabs[index],
      status: 1,
      page,
      list,
      isLast
    };
  });
}

export default new CapticalRecordStore();
