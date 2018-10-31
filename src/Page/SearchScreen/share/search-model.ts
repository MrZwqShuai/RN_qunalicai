// 搜索接口参数

export interface ISearchParams {
  page: number;
  pageSize: number;
  name: string;
  isLoading: number;
}

export interface HotListItem {
  ID: number;
  Platform: string;
}