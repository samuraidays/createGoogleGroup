// Slackのwebhookにリクエストを送る
function callSlackWebhook(applicant, messages) {
  // webhook設定
  const sp = PropertiesService.getScriptProperties();
  const SLACK_WEBHOOK_URL = sp.getProperty('SLACK_WEBHOOK_URL');
  
  // 申請者メールアドレスからSlackIDへ変換
  //const suserid = getSlackUserId(applicant);
  // 申請者メールアドレスがある→@つける、ない→@itへ
  const suserid = '@info-corpit-task'
  /*if(suserid !== 'none'){
    suserid = '@' + suserid;
  } else {
    suserid = '@info-corpit-task'
  }*/
  
  // 通知するデータ
  const params = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      //channel: suserid, // 通知するチャンネル
      text: messages,
      link_names: 1,
    })
  };
  // slack通知
  const response = UrlFetchApp.fetch(SLACK_WEBHOOK_URL, params);
  return response;
}

// 申請者のEメールからSlackIDを取得する
function getSlackUserId(applicant) {
  // アクセストークンを取得
  const sp = PropertiesService.getScriptProperties();
  const SLACK_ACCESS_TOKEN = sp.getProperty('SLACK_ACCESS_TOKEN');
  
  // API設定
  const slackURLBase = "https://slack.com/api"
  const slackUserListAPI = slackURLBase + "/users.list?token=" + SLACK_ACCESS_TOKEN
  
  // APIを実行しユーザリストを取得する
  const res = UrlFetchApp.fetch(slackUserListAPI) 
  const data = JSON.parse(res);  // APIから得られたデータを連想配列に変換する
  
  //Logger.log(data.members)

  var userid;
  // 取得したユーザリストと申請者メールアドレスを突き合わせる
  for (const i in data.members) {
    if(data.members[i].profile.email == applicant){
      userid = data.members[i].id;
      break;
    } else {
      userid = 'none';
    }
  }
  //Logger.log(userid);
  return userid;
}