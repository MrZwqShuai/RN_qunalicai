import { observable, computed, autorun, flow, action, toJS } from 'mobx';
import {
  PlatDetail,
  ManageFinancialImpl,
  PlatformMes,
  PlatScheme
} from '~pages/ManageFinancialDetailScreen/shared/detail.model';
import {
  getPlatFormMes,
  getPlatTopInfo,
  getSchemeInfo,
  getPlatFormList
} from '~apis/index';
import {
  Ipage,
  PlatScrollData,
  PlatFormListResponse
} from '~pages/ManageFinancialScreen/shared/manage-financial.model';
import RootStore from './RootStore';

class ManageFinancialStore implements ManageFinancialImpl {
  @observable
  platformMes: PlatformMes = {};

  @observable
  platDetail: PlatDetail = {};

  @observable
  platScheme: PlatScheme[] = [];

  // 控制绑定卡弹窗的状态
  @observable
  showBindCard: boolean = false;

  // 控制活动注册弹窗的状态
  @observable
  showActivityRegister: boolean = false;

  // 理财首屏列表
  @observable
  platFormList: PlatScrollData[] = [];

  // 理财首屏列表全部首投复投
  @observable
  platFormListAll: PlatScrollData[][] = [[], [], []];

  @observable
  AllPage: number = 0;

  // 理财详情查看大图list
  @observable
  helperPictureList = [{}, {}, {}];

  // 显示图文教程swiper
  @observable
  showHelperSwiper: boolean = false;

  // 刷新
  @observable
  isRefresh: boolean = false;

  // 是否加载结束
  @observable
  isReady: boolean = false;

  // 图文教程数组
  @observable
  godaddy: object[] = [
    {
      allurl:
        'https://wsimages.wsloan.com/images/qunalicai/qunalicai/qunalicai/placeholderbU8KUX_T4g2D1kiLV5JES.png'
    },
    {
      allurl:
        'https://wsimages.wsloan.com/images/qunalicai/qunalicai/qunalicai/placeholderbU8KUX_T4g2D1kiLV5JES.png'
    },
    {
      allurl:
        'https://wsimages.wsloan.com/images/qunalicai/qunalicai/qunalicai/placeholderbU8KUX_T4g2D1kiLV5JES.png'
    }
  ];

  @computed
  get getPlatformMes() {
    return this.platformMes;
  }

  @computed
  get getPlatDetail() {
    return this.platDetail;
  }

  @computed
  get getterSchemeInfo() {
    return this.platScheme.slice(0);
  }

  @computed
  get getterShowBindCard() {
    return this.showBindCard;
  }

  @computed
  get getterPlatFormList() {
    return this.platFormList.concat();
  }

  @computed
  get getterLoading() {
    return this.loading;
  }

  getPlatFormMesData = flow(function*(data) {
    data = {
      id: 3237
    };
    try {
      const projects: PlatformMes = yield getPlatFormMes(data);
      this.setPlatformMes(projects);
      this.setGodaddy(projects);
    } catch (error) {
      console.log(error, 'error');
    }
  });

  getPlatTopInfo = flow(function*(data) {
    try {
      const projects: PlatDetail = yield getPlatTopInfo(data);
      this.setPlatDetail(projects);
    } catch (error) {
      console.log(error, 'error');
    }
  });

  getSchemeInfo = flow(function*(data) {
    try {
      const projects: PlatDetail = yield getSchemeInfo(data);

      this.setPlatScheme(projects);
    } catch (e) {
      console.error('scheme.do错误信息', e);
    }
  });

  getPlatFormList = flow(function*(data, currentPage: number = 0) {
    try {
      const projects: PlatFormListResponse = yield getPlatFormList(data);
      if (projects) {
        this.setReady(true);
        RootStore.setLoading(false);
        // this.setPlatFormList(projects.List);
        this.setPlatFormListAll(projects.List, currentPage);
        console.log(projects, data, '哈哈哈哈哈哈哈');
        this.AllPage = projects.Allpage;
      }
    } catch (error) {
      console.error('findObject.do错误信息', error);
      RootStore.setLoading(false);
    }
  });

  @action
  setPlatformMes(platformMes: PlatformMes) {
    this.platformMes = platformMes;
  }

  @action
  setGodaddy(platFormMes: PlatformMes): void {
    try {
      let godaddy = JSON.parse(platFormMes.twjcPic);
      if (platFormMes.twjcPic && godaddy.length) {
        if (Array.isArray(godaddy)) {
          this.godaddy = godaddy;
        }
      } else {
        this.godaddy = [
          {
            allurl:
              'https://wsimages.wsloan.com/images/qunalicai/14c76V5oU7qdLYpT2epFF4.png'
          },
          {
            allurl:
              'https://wsimages.wsloan.com/images/qunalicai/2kVgahKoEKOFKaXlgOdvi7.png'
          },
          {
            allurl:
              'https://wsimages.wsloan.com/images/qunalicai/3vR2Vup5Albw4SSN5g7845.png'
          }
        ];
      }
    } catch (e) {
      console.log('错误: ' + e.message);
    }
  }

  @action
  setPlatDetail(platDetail: PlatDetail) {
    this.platDetail = platDetail;
  }

  @action
  setPlatScheme(platScheme: PlatScheme[]) {
    platScheme.forEach((k, v) => {
      platScheme[v].isDropDown = false;
    });
    this.platScheme = platScheme;
  }

  @action
  setModalBindCard(visible: boolean) {
    this.showBindCard = visible;
  }

  @action
  setModalARegister(visible: boolean) {
    this.showActivityRegister = visible;
  }

  @action
  setPlatFormList(platFormList: PlatScrollData[]) {
    this.platFormList = this.platFormList.concat(platFormList);
  }

  @action
  setPlatFormListAll(platFormList: PlatScrollData[], index: number) {
    if (this.isRefresh) {
      this.platFormListAll[index] = platFormList;
      this.setRefresh(false);
    } else {
      this.platFormListAll[index] = this.platFormListAll[index].concat(
        platFormList
      );
    }
  }

  @action
  setRefresh(isRefresh: boolean) {
    this.isRefresh = isRefresh;
  }

  @action
  setHelperSwiperPicture(showHelperSwiper: boolean) {
    this.showHelperSwiper = showHelperSwiper;
  }

  @action
  setDropDown(index: number, isDropDown: boolean) {
    this.platScheme[index].isDropDown = isDropDown;
  }

  @action
  setReady(isReady: boolean) {
    this.isReady = isReady;
  }
}

export default new ManageFinancialStore();
