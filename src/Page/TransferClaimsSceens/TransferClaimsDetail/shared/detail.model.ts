import { PlatScrollData, Ipage } from '../../ManageFinancialScreen/shared/manage-financial.model';

export interface PlatDetail extends PlatScrollData {
  // 综合年化收益
  AnnualizedReturns: string;
  // 最高返利
  zdfl: string;
  // 标期
  ObjectDeadline: string;
  // 投资额度范围
  InvestmentSection: string;
  // 上线时间
  OnlineTime: string;
  // 风险评分
  RiskAssessment: number;
  // 平台年化收益
  InterestRate: string
}

export interface PlatformMes extends PlatDetail {
  // 风险评分
  RiskAssessment: number;
  // 投资攻略
  tzgl: string;
  // 重要提示
  zyts: string;
  // 推荐理由
  tjly: string;
  // 资金存款
  DepositFund: string;
  // 投资期限
  InvestmentHorizon: string;
  // 注册资金
  RegisteredFund: string;
  // 担保公司
  GuaranteeCompany: string;
  // 提现到账
  Withdraw: string;
  // 客服电话
  PhoneNumber: string;
  // 平台背景
  BackgroundPedestal: string;
  // 融资背景
  BackgroundFinancing: string;
  // 公司地址
  Address: string;
}

export interface PlatScheme {
  // 投资期限
  LimitedDuration: string;
  // 有效项目
  EffectiveProject: string;
  // 投资金额
  InvestmentLimit: number;
  // 返现金额
  RebateImmediately: number;
  // 总收益
  TotalRevenue: number;
}

export interface PlatSchemeItem {
  item: PlatScheme;
}

// top.do platformMes.do store参数接口
interface IParmas {
  id: number
}

export interface ManageFinancialImpl{

  getPlatTopInfo: (params: IParmas) => Promise<any>;

  getPlatFormMesData: (params: IParmas) => Promise<any>;

  getSchemeInfo: (params: IParmas) => Promise<any>;

  getPlatFormList: (params: Ipage, currentPage: number) => Promise<any>;

  showActivityRegister: boolean;

  getPlatformMes: PlatformMes;

  getPlatDetail: PlatDetail;

  getterSchemeInfo: PlatScheme[];

  getterShowBindCard: boolean;

  getterPlatFormList: PlatScrollData[];
  
  helperPictureList: Array<object>;

  showHelperSwiper: boolean;

  getterHelperSwiper: boolean;

  setModalBindCard: (visible: boolean) => void;

  setModalARegister: (visible: boolean) => void;

  hideHelperSwiperPicture: () => void;

  showHelperSwiperPicture: () => void;
}