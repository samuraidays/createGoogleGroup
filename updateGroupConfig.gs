//Groupの詳細設定
function updateGroupConfig(groupEmail, externaldomain, orgcanview) {
  try {
    const group = AdminGroupsSettings.Groups.get(groupEmail);
    
    if (externaldomain == 'YES'){
      group.whoCanPostMessage = "ANYONE_CAN_POST"; //外部ドメインからも送れる
    } else {
      group.whoCanPostMessage = "ALL_IN_DOMAIN_CAN_POST"; //ドメイン内なら誰でも送れる
    }
    group.messageModerationLevel = "MODERATE_NONE"; // 承認なしでグループにメッセージを送れる

    if (orgcanview == 'YES'){
      group.whoCanViewGroup = "ALL_IN_DOMAIN_CAN_VIEW"; //トピックを表示 ドメイン全体
    }
    group.whoCanViewGroup = "ALL_MEMBERS_CAN_VIEW"; //トピックを表示 グループメンバーのみ
    
    AdminGroupsSettings.Groups.patch(group, groupEmail);

    return 'ok';
  } catch(e) {
    const error = 'グループ詳細設定に失敗しました。このメッセージを#corp_itに投げてください' + '\n' + 'name：'　+ e.name + '\n' + 'message：'　+ e.message
    return error;
  }
}