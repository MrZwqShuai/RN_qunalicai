import { observable, flow, action, toJS } from 'mobx';
import Toast from '~components/NewToast';
import {
  getReceiptRecord as getReceiptRecordList,
  getPlatFormNames as getPlatFormNamesList,
  getRebateScheme as getRebateSchemeList,
  getSelBank as getSelBankList,
  update as updatePost,
  getEditSel as getEditSelList,
  delHzd as delHzdData,
  fetchUserInfo,
  fetchReceiptDetail
} from '~apis';
class ReceiptRecordStore {
  @observable
  refresh = false; //刷新
  @observable
  isReady = false; //骨架屏
  @observable
  tabIndex = 0; //当前tab索引值
  @observable
  pageSize = 10; //请求的每页数据数量
  @observable
  ffrom = 2; //列表请求数据的必传参数
  @observable
  pingtaiName = []; //平台列表
  @observable
  tabs = [
    // tab列表
    {
      recordType: '',
      name: '全部',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    },
    {
      recordType: '1',
      name: '待审核',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    },
    {
      recordType: '3',
      name: '已审核',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    },
    {
      recordType: '4',
      name: '已驳回',
      status: 0,
      page: 1,
      list: [],
      isLast: false
    }
  ];
  @observable
  receiptDetailData = []; //回单详情也数据
  @observable
  fillReceiptParams = {
    // 平台id
    id: null,
    // 是否是编辑 编辑为2 录入为1
    isEdit: 1,
    // 修改传入 回单id
    hzdid: '',
    platformUser: '',
    phoneNumber: '',
    investmentDate: '',
    investmentLimit: '',
    investmentMoney: '',
    payType: 2,
    redId: 0,
    // app 和wap
    receiptFrom: 2
  };
  @observable
  redName = '';
  // 投资期限
  @observable
  tzqxList = [];
  @action
  clearTabs() {
    this.refresh = false;
    this.isReady = false;
    this.tabIndex = 0;
    this.tabs = [
      {
        recordType: '',
        name: '全部',
        status: 0,
        page: 1,
        list: [],
        isLast: false
      },
      {
        recordType: '1',
        name: '待审核',
        status: 0,
        page: 1,
        list: [],
        isLast: false
      },
      {
        recordType: '3',
        name: '已审核',
        status: 0,
        page: 1,
        list: [],
        isLast: false
      },
      {
        recordType: '4',
        name: '已驳回',
        status: 0,
        page: 1,
        list: [],
        isLast: false
      }
    ];
  }
  @action
  setRefresh(value) {
    this.refresh = value;
  }
  @action
  setFillParams(key, value) {
    this.fillReceiptParams[key] = value;
  }
  @action
  setTabIndex(index) {
    this.tabIndex = index;
  }
  @action
  clearParams() {
    this.fillReceiptParams = {
      id: null,
      isEdit: 1,
      hzdid: '',
      platformUser: '',
      phoneNumber: '',
      investmentDate: '',
      investmentLimit: '',
      investmentMoney: '',
      payType: 2,
      redId: 0,
      receiptFrom: 2
    };
  }
  //判断是否帮卡
  getBindCardInfo = flow(function*() {
    const data = yield fetchUserInfo();
    return data.user.cardNo ? true : false;
  });

  // 获取平台列表
  getPlatFormName = flow(function*() {
    const { pingtaiName } = yield getPlatFormNamesList();
    this.pingtaiName = pingtaiName;
  });

  // 获取回单记录列表
  getReceiptRecord = flow(function*(type) {
    const startTime = Date.now();
    const index = this.tabIndex;
    if (type === 0) {
      this.isReady = false;
    }
    const page = type === 1 ? this.tabs[index].page + 1 : 1;
    const { recordType } = this.tabs[index];
    const { pageSize, ffrom } = this;
    const data = yield getReceiptRecordList({
      recordType,
      page,
      pageSize,
      ffrom
    });
    const isLast = page >= data.Allpage ? true : false;
    const list =
      type === 1 ? this.tabs[index].list.concat(data.list) : data.list;
    this.tabs[index] = {
      ...this.tabs[index],
      status: 1,
      isLast,
      list,
      page
    };
    if (type === 0) {
      this.isReady = true;
    }
  });

  // 删除回单记录
  delHzdData = flow(function*(params) {
    const data = yield delHzdData(params);
    if (data !== 0) {
      let listArr = toJS(this.tabs[this.tabIndex].list);
      listArr.splice(listArr.findIndex(item => item.id == params.id), 1);
      this.tabs[this.tabIndex] = {
        ...this.tabs[this.tabIndex],
        list: listArr
      };
      Toast.show('删除成功');
    }
  });

  // 回单详情页数据
  getReceiptDetail = flow(function*(id) {
    const data = yield fetchReceiptDetail({
      id: id
    });
    this.receiptDetailData = data;
  });

  // 提交回单页 投资期限列表
  getQxList = flow(function*() {
    const data = yield getRebateSchemeList({
      platID: this.fillReceiptParams.id
    });
    if (data && data.length) {
      this.tzqxList = data;
    } else {
      this.tzqxList = ['无'];
    }
  });

  // 添加 编辑回执单提交
  hzdUpdate = flow(function*(redId) {
    this.fillReceiptParams.redId = redId;
    const data = yield updatePost(this.fillReceiptParams);
    return data;
  });

  //获取提交回单页 某个回执单编辑的信息
  getEditSelList = flow(function*(params) {
    const {
      InvestmentMoney,
      PhoneNumber,
      PlatformUser,
      InvestmentDate,
      InvestmentLimit
    } = yield getEditSelList(params);
    this.setFillParams('investmentMoney', String(InvestmentMoney));
    this.setFillParams('phoneNumber', PhoneNumber);
    this.setFillParams('platformUser', PlatformUser);
    this.setFillParams('investmentDate', InvestmentDate);
    this.setFillParams('investmentLimit', InvestmentLimit);
    this.setFillParams('hzdid', params.id);
  });
}

export default new ReceiptRecordStore();
