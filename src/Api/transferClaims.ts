import fetch from '~fetch';

// 债转专区列表
export const fetchTransferList = data => {
  return fetch({
    url: 'rights/rightsList',
    method: 'post',
    data: data
  });
};
