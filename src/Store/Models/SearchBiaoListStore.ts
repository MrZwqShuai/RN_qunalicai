import { observable, action, computed, flow } from 'mobx';
import {
  PlatFormListResponse,
  PlatScrollData
} from '~pages/ManageFinancialScreen/shared/manage-financial.model';
import { getBiaoList } from '~apis/index';
import { ISearchParams } from '~pages/SearchScreen/share/search-model';
import { RootStore } from '~store';

class SearchBiaoListStore {
  @observable
  clearHistory = false;

  @observable
  isEmpty = false;

  @observable
  platList = [];

  @observable
  AllPage: number = 0;

  @observable
  searchName: string | number = '';

  @observable
  isRefresh: boolean = false;

  @computed
  get getterClearHistory() {
    return this.clearHistory;
  }

  @computed
  get getterEmpty() {
    return this.isEmpty;
  }

  @computed
  get getterPlatList() {
    return this.platList.slice(0);
  } 

  @action
  showEmptyPage(isEmpty: boolean) {
    this.isEmpty = isEmpty;
  }

  @action
  setPlatList(platList: PlatScrollData[]) {
    if(this.isRefresh) {
      this.platList = platList;
      this.setRefresh(false);
    } else {
      this.platList = this.platList.concat(platList);
    }
  }

  @action
  clearHistoryList(clearHistory: boolean) {
    this.clearHistory = clearHistory;
  }

  @action
  setAllPage(AllPage: number) {
    this.AllPage = AllPage;
  }

  @action
  setSearchName(searchName: string | number) {
    this.searchName = searchName;
    console.log(this.searchName, searchName);
  }

  @action
  setRefresh(isRefresh: boolean) {
    this.isRefresh = isRefresh;
  }

  getBiaoList = flow(function*(data: ISearchParams) {
    try {
      const projects: PlatFormListResponse = yield getBiaoList(data);
      console.log(projects, '----搜索的内容----');
      if (projects.Allpage === 0) {
        this.clearHistoryList(true);
        this.showEmptyPage(true);
      } else {
        this.showEmptyPage(false);
        this.clearHistoryList(true);
        this.setPlatList(projects.List);
        this.setAllPage(projects.Allpage);
      }
      RootStore.setLoading(false);
    } catch (e) {
      RootStore.setLoading(false);
      console.log('biaolist.do错误', e);
    }
  });
}

export default new SearchBiaoListStore();
