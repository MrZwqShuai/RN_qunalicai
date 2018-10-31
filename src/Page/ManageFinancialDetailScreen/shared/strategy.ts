interface Strategy {
  title: string;
  gonglue: StrategyContent,
  lint: StrategyContent;
  state: StrategyContentString
}

export interface StrategyContent {
  title: string;
  content: string[];
}

export interface StrategyContentString {
  title: string;
  content: string;
}

const strategy: Strategy = 
  {
    "title": "投资攻略&重要提示",
    "gonglue": {
      "title" : "投资攻略:",
      "content" : [
        "1.投资攻略&重要提示",
        "2.实名、绑卡、开通存管、充值、投资;",
        "3.投资完毕后,在去哪理财本页面填写回单信息,等待银行卡返现;",
        "4.每次提交回单后，1个工作日处理完返现。"
      ]
    },
    "lint": {
      "title" : "重要提示:",
      "content" : [
        "1.投资攻略&重要提示",
        "2.实名、绑卡、开通存管、充值、投资;",
        "3.投资完毕后,在去哪理财本页面填写回单信息,等待银行卡返现;",
        "4.每次提交回单后，1个工作日处理完返现。"
      ]
    },
    "state": {
      "title" : "免责声明：",
      "content" : "去哪理财仅为信息平台，本身不吸纳用户资金。活动平台不保证100%安全，如出现意外情况（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金、利息的情况），除去哪理财在特殊 活动上有注明的保障规则，否则去哪理财不承担任何责任。"
    }
  }

  export default strategy
