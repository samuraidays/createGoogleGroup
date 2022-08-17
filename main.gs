function onFormSubmit(e) {
  //var range = e.range; //=> Rangeオブジェクトで取得
  const formdata = e.values;
  // Logger.log(array); //=> ['2015/05/04 15:00', 'Jane', 'Doe']
  //  var json = e.namedValues;
  //  Logger.log(json); //=> { 'Timestamp': ['2015/05/04 15:00'], 'First Name': ['Jane'], 'Last Name': ['Doe'] }
  
  const type=formdata[2]; // 追加 or 削除
  
  switch(type){
    case "追加":
      createGroupFlow(formdata);
      break;
    case "削除":
      deleteGroupFlow(formdata);
      break;
    default:
      break;
  }
}
