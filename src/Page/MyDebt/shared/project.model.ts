export default interface Projects {
  // 显示的类型 0 债转 1 承接
  uiType: number;
  // 债权id
  id: number;
  // 平台名称
  platName: string;
  // 债转金额
  payMoney: number;
  // 综合年化
  annualPercentage: number;
  // 剩余期限
  rest: number;
  // 期限单位，0表示天，1表示月
  unit: number;
  // 还款方式
  payWay: string;
  // 折扣
  discount: number;
  // 折扣金额
  discountMoney: number;
  // 债权有效期限
  effectiveDays: number;
  // 债权链接
  rightsUrl: string;
  // 是否预付，0否，1是
  prepay: number;
  // 担保服务费
  serviceCharge: number;
  // 支付方式
  payMethod: string;
  // 倒计时
  countdown: number;
  // 项目状态 如转让中等
  projectStatus: string;
}
