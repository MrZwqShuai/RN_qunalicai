const icons = [
  {
    name: 'receiptRecord',
    require: require('../../assets/images/receiptRecord.png')
  },
  {
    name: 'receiptPlan',
    require: require('../../assets/images/receiptPlan.png')
  }
];

export default (name) => {
  let requireIcon = null;
  icons.forEach(item=>{
    if(item.name === name){
      requireIcon = item.require
    }
  })
  return requireIcon ? requireIcon : icons[0].require;
}