export interface PieChartResponse {
  chartData: IPieChartData[];
  info: IpipeChartInfo[];
  rest: any[];
}

export interface IPieChartData {
  name: string;
  value: string;
}

export interface IpipeChartInfo {
  Platform: string;
  platNum: number;
  InvestmentMoney: string;
  fanli: string;
}