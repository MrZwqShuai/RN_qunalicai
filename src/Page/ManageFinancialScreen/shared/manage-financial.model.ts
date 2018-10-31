export interface PlatForm {
  title: string;
  data: PlatFormItem[];
}

export interface PlatFormItem{
  ID?: number;
  Platform: string;
  sign?: boolean;
  Type?: number;
}

export interface PlatFormListResponse {
  Allpage: number;
  List: PlatScrollData[];
  num: string
}

export interface PlatScrollData {
  // 运营公司
  Operator: string;
  GuaranteeCompany: string;
  ID: number;
  Tag: string;
  // 综合年化收益min
  AnnualizedReturnsMin: number;
  // 综合年化收益max
  AnnualizedReturnsMax: number;
  // 最高返利
  MaxReturnMoney: number;
  // 1为首投 其他为复投
  Type: string;
  PlatformLogo: string;
  PlatformID: number;
  Platform: string;
}


// 接口参数
export interface Ipage {
  page: number;
  pageSize: number;
  investType?: number;
}

export interface FindObjectParams {
  id?: number;
  // 首投or复投
  investType?: number;
  // 综合收益 降序升序
  profitType?: number;
  // 投资期限 降序升序
  investLimit?: number;
  page: number;
  pageSize: number;
}