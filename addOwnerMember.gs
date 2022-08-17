// オーナーとしてメンバー追加
function addOwnerMember(memberEmail, groupEmail){
  try {
    AdminDirectory.Members.insert({email: memberEmail, role: "OWNER"}, groupEmail);
    return 'ok';
  } catch(e) {
    const error = 'オーナー設定に失敗しました。このメッセージを#corp_itに投げてください' + '\n' + 'name：'　+ e.name + '\n' + 'message：'　+ e.message
    return error;
  }
}