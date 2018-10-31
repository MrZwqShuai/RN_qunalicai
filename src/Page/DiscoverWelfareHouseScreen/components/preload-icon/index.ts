const icons = [
  {
    name: 'ZHUCE',
    require: require('../../assets/images/registerWelfare.png')
  },
  {
    name: 'BANGKA',
    require: require('../../assets/images/cardWelfare.png')
  },
  {
    name: 'SIGN',
    require: require('../../assets/images/signWelfare.png')
  },
  {
    name: 'SHARE',
    require: require('../../assets/images/shareWelfare.png')
  },
  {
    name: 'COMMENT',
    require: require('../../assets/images/commentWelfare.png')
  },
  {
    name: 'HOT_COMMENT',
    require: require('../../assets/images/hotCommentWelfare.png')
  },
  {
    name: 'INVITE',
    require: require('../../assets/images/inviteWelfare.png')
  },

  {
    name: 'INVEST',
    require: require('../../assets/images/investWelfare.png')
  },
  {
    name: 'INVEST_SUM',
    require: require('../../assets/images/totalInvestWelfare.png')
  }
];

export default name => {
  let requireIcon = null;
  icons.forEach(item => {
    if (item.name === name) {
      requireIcon = item.require;
    }
  });
  return requireIcon ? requireIcon : icons[0].require;
};
