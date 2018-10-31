import fetch from '~fetch';
import { ISearchParams } from '~pages/SearchScreen/share/search-model';

// 债转专区模块
export * from './transferClaims';

export const fetchBannerList = data => {
  return fetch({
    url: 'index/selimage.do',
    method: 'get',
    data: data
  });
};

/**
 * 获取签到累计奖励
 * @param data
 */
export const fetchSignAppList = data => {
  return fetch({
    url: 'getSignAppList.do',
    method: 'get',
    data: data
  });
};

export const fetchNotices = data => {
  return fetch({
    url: 'index/findNoticeAll.do',
    method: 'get',
    data: data
  });
};

// 获取回款信息列表
export const fetchReimbursementRecord = data => {
  return fetch({
    url: 'newVersion/reimbursementRecord.do',
    method: 'get',
    data: data
  });
};
// 获取回款信息详情
export const fetchReceiptDetail = data => {
  return fetch({
    url: 'newVersion/getReceiptDetail.do',
    method: 'get',
    data: data
  });
};

// 获取平台信息
export const getPlatFormMes = data => {
  return fetch({
    url: '/detail/platformMes.do',
    method: 'get',
    data: data
  });
};

// 获取top平台信息
export const getPlatTopInfo = data => {
  return fetch({
    url: '/detail/top.do',
    method: 'get',
    data: data
  });
};

// 获取返利方案
export const getSchemeInfo = data => {
  return fetch({
    url: '/detail/scheme.do',
    method: 'get',
    data: data
  });
};

// 获取理财首页平台列表
export const getPlatFormList = data => {
  return fetch({
    url: '/rebate/findObject.do',
    method: 'get',
    data: data
  });
};

// 获取平台排行数据
export const getRankList = () => {
  return fetch({
    url: '/newVersion/brandRanking.do',
    method: 'get'
  });
};

// 获取推荐搜索
export const getHotList = () => {
  return fetch({
    url: '/rebate/hot.do',
    method: 'get'
  });
};

// 搜索平台标的
export const getBiaoList = (data: ISearchParams) => {
  return fetch({
    url: '/rebate/biaolist.do',
    method: 'get',
    data: data
  });
};

// 个人中心饼状图记录
export const getPieChart = () => {
  return fetch({
    url: '/newVersion/getPieChart.do'
  });
};

export const fetchRecommendList = data => {
  return fetch({
    url: 'index/loadRecommend.do',
    method: 'get',
    data: data
  });
};

/**
 * 资金记录
 * @param data
 */
export const getCapticalRecord = data => {
  return fetch({
    url: 'withdraw/capitalRecord.do',
    method: 'get',
    data: data
  });
};
/**
 * 回单记录
 * @param data
 */
export const getReceiptRecord = data => {
  return fetch({
    url: '/person/getReceiptList.do',
    method: 'get',
    data
  });
};

/**
 * 投资期限
 * @param data
 */
export const getRebateScheme = data => {
  return fetch({
    url: 'hzd/getRebateScheme.do',
    method: 'get',
    data: data
  });
};

/**
 * 获取卡号 姓名
 * @param data
 */
export const getSelBank = data => {
  return fetch({
    url: 'hzd/selbank.do',
    method: 'get',
    data
  });
};

/**
 * 提交回单
 * @param data
 */
export const update = data => {
  return fetch({
    url: 'hzd/update.do',
    method: 'get',
    data
  });
};

/**
 * 获取编辑回单信息
 * @param data
 */
export const getEditSel = data => {
  return fetch({
    url: 'hzd/sel.do',
    method: 'get',
    data
  });
};

/**
 * 删除回单
 * @param data
 */
export const delHzd = data => {
  return fetch({
    url: 'hzd/delHzd.do',
    method: 'get',
    data
  });
};

/**
 * 平台list
 * @param data
 */
export const getPlatFormNames = () => {
  return fetch({
    url: 'person/getUser.do',
    method: 'get'
  });
};

/**
 * 获取回款笔数
 * @param data
 */
export const getReceiptListLen = () => {
  return fetch({
    url: '/newVersion/reimbursementRecord.do',
    method: 'get'
  });
};

/**
 * 获取签到信息
 * @param data
 */
export const getCalendarAPP = () => {
  return fetch({
    url: 'calendarAPP.do',
    method: 'get'
  });
};

/**
 * 获取今天是否签到
 * @param data
 */
export const getSignOrNot = () => {
  return fetch({
    url: 'signOrNot.do',
    method: 'get'
  });
};

/**
 * 提交签到信息
 * @param data
 */
export const getSignIn = () => {
  return fetch({
    url: 'signIn.do',
    method: 'get'
  });
};

/**
 * 提交签到信息
 * @param data
 */
export const getWithdrawBalance = () => {
  return fetch({
    url: 'withdraw/balance.do',
    method: 'get'
  });
};

/**
 * Auth.
 */
// Login
export const fetchLogin = data => {
  return fetch({
    url: 'login.do',
    method: 'post',
    data: data
  });
};

// Register
export const fetchRegister = data => {
  return fetch({
    url: 'zhuCe.do',
    method: 'post',
    data: data
  });
};

// ForgetPassword
export const fetchForgetPassword = data => {
  return fetch({
    url: 'chongShe.do',
    method: 'post',
    data: data
  });
};

/**
 * MySetting.
 */
// User
export const fetchUserInfo = () => {
  return fetch({
    url: 'user.do',
    method: 'get'
  });
};
export const fetchCardInfo = () => {
  return fetch({
    url: 'findCard.do',
    method: 'get'
  });
};
// RedBag
export const fetchRedBag = data => {
  return fetch({
    url: 'person/red.do',
    method: 'get',
    data: {
      effective: 0,
      pageSize: 7,
      ...data
    }
  });
};
// bankCard
export const fetchBankCard = data => {
  return fetch({
    url: 'updateCard.do',
    method: 'post',
    data
  });
};
// bankCard
export const fetchChangePassword = data => {
  return fetch({
    url: 'updatePwd2.do',
    method: 'post',
    data
  });
};

/**
 * 获取注册短信验证码
 */
export const fetchVerifyCode = data => {
  return fetch({
    url: 'zhuCeWAP.do',
    method: 'get',
    params: data
  });
};

/*
* 获取忘记密码中的短信验证码
* */
export const fetchForgetCode = data => {
  return fetch({
    url: 'updatePwd.do',
    method: 'get',
    params: data
  });
};

/**
 * 福利中心任务列表
 */
export const fetchWelfareTaskList = data => {
  return fetch({
    url: '/find/taskDic.do',
    method: 'post',
    params: data || {}
  });
};

/**
 * 福利中心获取当前金豆数
 */
export const fetchCurrentBeans = data => {
  return fetch({
    url: '/find/goldTrees.do',
    method: 'post',
    params: data || {}
  });
};

/**
 * 任务是否完成列表
 */
export const fetchTaskStatusList = data => {
  return fetch({
    url: 'find/taskState.do',
    method: 'post',
    params: data || {}
  });
};

/**
 * 拆红包
 */
export const fetchOpenRedBag = data => {
  return fetch({
    url: '/find/openRed.do',
    method: 'post',
    params: data || {}
  });
};

/**
 * 任务记录列表
 */
export const fetchRecordList = data => {
  return fetch({
    url: 'find/rewardTask.do',
    method: 'post',
    params: data || {}
  });
};

/**
 * 提现
 */
export const fetchWithDraw = data => {
  return fetch({
    url: '/withdraw/balance.do',
    method: 'get'
  });
};

/*
* 新闻列表接口数据
* */
export const modifyUserInfo = data => {
  return fetch({
    url: 'find/updateUserInfo.do',
    method: 'post',
    params: data || {}
  });
};

/*
* 新闻列表接口数据
* */
export const fetchNewsList = data => {
  return fetch({
    url: 'find/article.do',
    method: 'post',
    params: data || {}
  });
};

/*
* 热门新闻列表数据
* */
export const fetchHotNews = data => {
  return fetch({
    url: 'find/findNewsHot.do',
    method: 'post',
    params: data || {}
  });
};

export const fetchNewsDetail = data => {
  return fetch({
    url: 'find/findNews.do',
    method: 'post',
    params: data || {}
  });
};

export const fetchNoticeDetail = data => {
  return fetch({
    url: 'find/findNotice2.do',
    method: 'post',
    params: data || {}
  });
};

/**
 * 邀请记录接口
 */
export const fetchInvitingRecord = data => {
  return fetch({
    url: 'person/yaoqing.do',
    method: 'get',
    params: data || {}
  });
};
/*
* 新闻点赞数评论数接口
* */
export const fetchCommentNum = data => {
  return fetch({
    url: 'find/getGreatNum.do',
    method: 'post',
    params: data || {}
  });
};

/* 消息通知
*/
export const fetchPersonGreat = data => {
  return fetch({
    url: 'find/getPersonGreat.do',
    method: 'post',
    params: data || {}
  });
};

export const fetchDoGreat = data => {
  return fetch({
    url: 'find/great.do',
    method: 'post',
    params: data || {}
  });
};

export const fetchReplyById = data => {
  return fetch({
    url: 'find/findReplyById.do',
    method: 'post',
    params: data || {}
  });
};

export const fetchCommentByArticle = data => {
  return fetch({
    url: 'find/findGreatCommentByArticle.do',
    method: 'post',
    params: data || {}
  });
};

export const fetchDoComment = data => {
  return fetch({
    url: 'find/comment.do',
    method: 'post',
    params: data || {}
  });
};

// 保存意见
export const fetchSuggest = data => {
  return fetch({
    url: 'find/feedBack.do',
    method: 'post',
    params: data || {}
  });
};

export const fetchTipOff = data => {
  return fetch({
    url: 'find/jubao.do',
    method: 'post',
    params: data || {}
  });
};

// 静态数据接口
export const fetchFeData = data => {
  return fetch({
    url: 'http://fe.wsloan.com/data?query=getQNData',
    method: 'get'
  });
};

// 邀请好友分享
export const fetchShareReward = () => {
  return fetch({
    params: {},
    url: 'find/share.do',
    method: 'post'
  });
};

// 消息通知
export const fetchCheckNews = () => {
  return fetch({
    url: 'find/findNotice.do',
    method: 'post',
    params: {}
  });
};

export const fetchLookComment = commentID => {
  return fetch({
    url: 'find/isLookComment.do',
    method: 'post',
    params: {
      commentID
    }
  });
};

// 去哪理财邀请奖励规则
export const fetchFeRewardRules = (params = {}) => {
  return fetch({
    params: params,
    url: 'http://fe.wsloan.com/data?query=getQNRewardsRules',
    method: 'get'
  });
};

// ---------- 债转接口 -----------------//

// 我的债转列表
export const fetchPersonRights = data => {
  return fetch({
    url: 'rights/personRights',
    method: 'get',
    params: data
  });
}
