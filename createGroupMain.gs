function createGroupFlow(formdata) {

  const applicant=formdata[1]; // 申請者
  const groupID=formdata[3]; // グループアドレス
  const desc=formdata[4]; // 説明
  const memberemail=formdata[5]; // オーナー
  const postpriv=formdata[6]; // 投稿を公開
  const topicview=formdata[7]; // トピックを表示

  // グループ作成後に通知するメンバー追加URLの生成
  let groupIDSplit = groupID.split("@"); 
  Logger.log(groupIDSplit);
  let memberAddUrl = 'https://groups.google.com/a/justincase-tech.com/g/' + groupIDSplit[0] + '/members';
  Logger.log(memberAddUrl);
  
  // Group作成
  const errtx = createGroup(groupID, desc);
  // エラーをSlackへ通知
  if(errtx !== 'ok'){
    callSlackWebhook(applicant, errtx);
    return;
  }
  
  // Groupの詳細設定
  const groupErrtx = updateGroupConfig(groupID, postpriv, topicview);
  if(groupErrtx !== 'ok'){
    callSlackWebhook(applicant, groupErrtx);
    return;
  }
  
  // オーナーとしてメンバー追加
  const ownerErrtx = addOwnerMember(memberemail, groupID);
  if(ownerErrtx !== 'ok'){
    callSlackWebhook(applicant, ownerErrtx);
    return;
  }
  
  // Slackへの通知
  if(errtx == 'ok'){
    const tx = groupID + 'グループが作成されました！' + '\n' + '下記URLからメンバーを追加してください' + '\n' + memberAddUrl;
    callSlackWebhook(applicant, tx);
    return;
  } else {
    const tx = groupID + 'グループの作成に失敗しました！';
    callSlackWebhook(applicant, tx);
    return;
  }
}

//Group作成
function createGroup(groupID, desc) {
  try {
    const group = AdminDirectory.Groups.insert({email: groupID, description: desc});
    Logger.log(group);
    return 'ok';
  } catch(e) {
    // エラーメッセージを返す
    const error = groupID + 'グループ作成に失敗しました。このメッセージを#corp_itに投げてください' + '\n' + 'name：'　+ e.name + '\n' + 'message：'　+ e.message
    return error;
  }
}