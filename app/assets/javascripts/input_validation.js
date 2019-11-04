// https://qiita.com/kubokubo/items/9a6d930515651a2b468a

/**
 文字列チェック
 @param  input    String  チェック対象文字列
 @param  charType String  チェック種別
                          　・"zenkaku"               : 全角文字（ひらがな・カタカナ・漢字 etc.）
                          　・"hiragana"              : 全角ひらがな
                          　・"katakana"              : 全角カタカナ
                          　・"alphanumeric"          : 半角英数字（大文字・小文字）
                          　・"numeric"               : 半角数字
                          　・"alphabetic"            : 半角英字（大文字・小文字）
                          　・"upper-alphabetic"      : 半角英字（大文字のみ）
                          　・"lower-alphabetic"      : 半角英字（小文字のみ）
 @return Boolean チェック結果OKかどうか 
                 true  : チェックOK（引数に指定した種別の文字列のみで構成されている)
                 false : チェックNG（引数に指定した種別以外の文字列が含まれている）
 */
function checkCharType(input, charType) {
  switch (charType) {
      // 全角文字（ひらがな・カタカナ・漢字 etc.）
      case "zenkaku":
          return (input.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) ? true : false;
      // 全角ひらがな
      case "hiragana":
          return (input.match(/^[\u3041-\u3096]+$/)) ? true : false;
      // 全角カタカナ
      case "katakana":
          return (input.match(/^[\u30a1-\u30f6]+$/)) ? true : false;
      // 半角英数字（大文字・小文字）
      case "alphanumeric":
          return (input.match(/^[0-9a-zA-Z]+$/)) ? true : false;
      // 半角数字
      case "numeric":
          return (input.match(/^[0-9]+$/)) ? true : false;
      // 半角英字（大文字・小文字）
      case "alphabetic":
          return (input.match(/^[a-zA-Z]+$/)) ? true : false;
      // 半角英字（大文字のみ）
      case "upper-alphabetic":
          return (input.match(/^[A-Z]+$/)) ? true : false;
      // 半角英字（小文字のみ）
      case "lower-alphabetic":
          return (input.match(/^[a-z]+$/)) ? true : false;
  }
  return false;
}

function isCreditCard(input) {
  if (input.match(/^4[0-9]{12}(?:[0-9]{3})?$/)        /**Visa */
  || (input.match(/^5[1-5][0-9]{14}$/))               /**MasterCard */
  || (input.match(/^3[47][0-9]{13}$/))                /**American Express */
  || (input.match(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/))/**Diners Club*/
  || (input.match(/^6(?:011|5[0-9]{2})[0-9]{12}$/))   /**ディスカバー */
  || (input.match(/^(?:2131|1800|35\d{3})\d{11}$/))   /**JCB */
  || (input.match(/^[0-9]{15}$/))){
    return true;
  }else{
    return false;
  }

}
  
/**
 文字列チェック
 @param  targetObj      Objct   メッセージ対象オブジェクト
 @param  messageType    String  メッセージタイプ
                            ・"success"               : 成功
                            ・"waring"                : 警告
                            ・"error"                 : エラー
 @param  message        String  表示するメッセージ文
 @return html           String  表示するHTML形式
 */
function builderHTMLType(targetObj, messageType, message){
  let type = "";
  let blank = "  ";
  let html = "";
  switch (messageType) {
    case "success":
      if(!$(targetObj).nextAll('div.alert__success').length){
        type  = '<div class="alert alert__success"><span class="alert__success__message"><i class="far fa-thumbs-up fa-lg"></i>';
        html = type + blank + message + '</span></div>';
      }
      if($(targetObj).nextAll('div.alert__waring')){
        $('div.alert__waring').remove();
      }
      if($(targetObj).nextAll('div.alert__error')){
        $('div.alert__error').remove();
      }
      break;

    case "waring":
      if(!$(targetObj).nextAll('div.alert__waring').length){
        type  = '<div class="alert alert__waring"><span class="info-container__waring"><i class="fas fa-exclamation-triangle fa-lg"></i>';
        html = type + blank + message + '</span></div>';
      }

      if($(targetObj).nextAll('div.alert__success')){
        $('div.alert__success').remove();
      }

      if($(targetObj).nextAll('div.alert__error')){
        $('div.alert__error').remove();
      }
      break;
    
    case "error":
      if(!$(targetObj).nextAll('div.alert__error').length){
        type  = '<div class="alert alert__error"><span class="info-container__error"><i class="fas fa-skull-crossbones fa-lg"></i>';
        html = type + blank + message + '</span></div>';
      }
      if($(targetObj).nextAll('div.alert__success')){
        $('div.alert__success').remove();
      }
      if($(targetObj).nextAll('div.alert__waring')){
        $('div.alert__waring').remove();
      }
      break;
    }

  $(targetObj).after(html);

}

/**
 文字列チェック
 @param  obj            String  空白チェック対象オブジェクト
 @param  message        String  表示するメッセージ文
 @return  Boolean チェック結果OKかどうか 
                 true  : チェックOK
                 false : チェックNG
 */
function isEmptyInput (obj){
  (obj.val() == "") ?  result = true : result = false;
  return result;
}
/**
*/
function isDisableButton (obj, btnSw = true){

  if(btnSw){
    obj.css('background-color', 'silver');
    obj.css('border', '1px solid silver');
    obj.prop('disabled', true);
  }else{
    obj.css('background-color', 'red');
    obj.css('border', '1px solid #ea352d');
    obj.prop('disabled', false);
  }
}

/************************************************************************/
/**                            check empty                             **/
/************************************************************************/

$(document).on('change','#input-nickname', function () {
  
  if (!isEmptyInput($('#input-nickname'))) {
    builderHTMLType($('#input-nickname'),'success', 'SUCCESS');
  }
});
$(document).on('blur','#input-email', function () {
  
  if (isEmptyInput($('#input-nickname'))) {
    builderHTMLType($('#input-nickname'),'waring', 'ニックネームは必須');
  }
});

$(document).on('focus','#input-password', function () {

  if(isEmptyInput($('#input-nickname')))  builderHTMLType($('#input-nickname'),'waring', 'ニックネームは必須');
  if(isEmptyInput($('#input-email')))     builderHTMLType($('#input-email'),'waring', 'メールアドレスは必須');

});

$(document).on('focus','#input-password_confirm', function () {

  if(isEmptyInput($('#input-nickname')))  builderHTMLType($('#input-nickname'),'waring', 'ニックネームは必須');
  if(isEmptyInput($('#input-email')))     builderHTMLType($('#input-email'),'waring', 'メールアドレスは必須');
  if(isEmptyInput($('#input-password')))  builderHTMLType($('#input-password'),'waring', 'パスワードは必須');

});

$(document).on('focus','#input-last_name', function () {
  
  if(isEmptyInput($('#input-nickname')))    builderHTMLType($('#input-nickname'),'waring', 'ニックネームは必須');
  if(isEmptyInput($('#input-email')))       builderHTMLType($('#input-email'),'waring', 'メールアドレスは必須');
  if(isEmptyInput($('#input-password')))    builderHTMLType($('#input-password'),'waring', 'パスワードは必須');
  if(isEmptyInput($('#input-first_name')))  builderHTMLType($('#input-name'),'waring', '名前は必須');

});

$(document).on('focus','#input-last_kananame', function () {
  
  if(isEmptyInput($('#input-nickname')))        builderHTMLType($('#input-nickname'),'waring', 'ニックネームは必須');
  if(isEmptyInput($('#input-email')))           builderHTMLType($('#input-email'),'waring', 'メールアドレスは必須');
  if(isEmptyInput($('#input-password')))        builderHTMLType($('#input-password'),'waring', 'パスワードは必須');
  if(isEmptyInput($('#input-first_name')))      builderHTMLType($('#input-name'),'waring', '名前は必須');
  if(isEmptyInput($('#input-first_kananame')))  builderHTMLType($('#input-kananame'),'waring', 'ナマエは必須');

});

$(document).on('change','.day', function () {

  if(isEmptyInput($('#input-nickname')))        builderHTMLType($('#input-nickname'),'waring', 'ニックネームは必須');
  if(isEmptyInput($('#input-email')))           builderHTMLType($('#input-email'),'waring', 'メールアドレスは必須');
  if(isEmptyInput($('#input-password')))        builderHTMLType($('#input-password'),'waring', 'パスワードは必須');
  if(isEmptyInput($('#input-first_name')))      builderHTMLType($('#input-name'),'waring', '名前は必須');
  if(isEmptyInput($('#input-first_kananame')))  builderHTMLType($('#input-kananame'),'waring', 'ナマエは必須');
  if(isEmptyInput($('.year')) || isEmptyInput($('.month')) || isEmptyInput($('.day'))){
    builderHTMLType($('#input-birthday'),'waring', '生年月日は必須');
  }else{
    builderHTMLType($('#input-birthday'),'success', 'SUCCESS');
  };
  
});

/************************************************************************/
/**                            check tel                               **/
/************************************************************************/
$(document).on('blur','#input-tel', function () {
  
  if (isEmptyInput($(this))){
    builderHTMLType($(this),'waring', '電話番号は必須');
    isDisableButton($(".btn-step2"));
  }else {
    let tel = $(this).val().replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
    if (tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
      builderHTMLType($(this),'success', 'SUCCESS');
      isDisableButton($(".btn-step2"), false);
    }else{
      builderHTMLType($(this),'waring', '電話番号が変');
      isDisableButton($(".btn-step2"));
    }  
  }
});

/************************************************************************/
/**                            check code                              **/
/************************************************************************/
$(document).on('blur','#authorization_code', function () {
  
  if (isEmptyInput($(this), 'authorization_code!!')){
    builderHTMLType($(this),'waring', '認証コードは必須');
    isDisableButton($(".btn-step3"));
  }else {
    let code = $(this).val();
    if (code.match(/^([0-9]{4})$/)) {
      builderHTMLType($(this),'success', 'SUCCESS');
      isDisableButton($(".btn-step3"), false);
    }else{
      builderHTMLType($(this),'waring', 'コードは4桁ですよ');
      isDisableButton($(".btn-step3"));
    }
  }
});


/************************************************************************/
/**                            check email                             **/
/************************************************************************/
$(document).on('change', '#input-email', function (){
 
  if(!$(this).val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
    builderHTMLType(this,'waring', 'メールアドレス形式で入力ください');
  }else {
    builderHTMLType(this, 'success', 'SUCCESS');
  }
});

/************************************************************************/
/**                            check password                          **/
/************************************************************************/
$(document).on('blur', '#input-password', function (){
 
  let str = $(this).val();
  let passwordLegth = $(this).val().length;

  if(checkCharType(str,'alphanumeric')){
    if(passwordLegth >= 7){
      builderHTMLType(this,'success', 'SUCCESS');
    }else{
      builderHTMLType(this,'waring', passwordLegth + "文字!! 7文字以上で入力ください");
    }
  }else {
    builderHTMLType(this,'waring',"半角英数字以外はダメですよ");
  }
   
});

$(document).on('blur', '#input-password_confirm', function (){
 
  let orgPass = $('#input-password').val();
  let confirmPass = $(this).val();
  if($('#input-password').val() == $(this).val()){
    builderHTMLType(this,'success', 'SUCCESS');
  }else {
    builderHTMLType(this,'waring', 'パスワードが一致していません');
  }
  
});
/************************************************************************/
/**                            check  全角                              **/
/************************************************************************/
$(document).on('blur', '#input-last_name', function (){
 
  let str = $(this).val();
  let firstName = $('#input-first_name').val();
  if (checkCharType(str,'zenkaku') && checkCharType(firstName,'zenkaku')){
    builderHTMLType($('#input-name'),'success', 'SUCCESS');
  }else{
    builderHTMLType($('#input-name'),'waring', '全角カタカタで入力ください');
  }

});
/************************************************************************/
/**                            check  カナ                              **/
/************************************************************************/
$(document).on('blur', '#input-last_kananame', function (){
 
  let str = $(this).val();
  let firstKananame = $('#input-first_kananame').val();
  if (checkCharType(str,'katakana') && checkCharType(firstKananame,'katakana')){
    builderHTMLType($('#input-kananame'),'success', 'SUCCESS');
  }else{
    builderHTMLType($('#input-kananame'),'waring', '全角カタカタで入力ください');
  }

});

/************************************************************************/
/**                                  閏年                              **/
/************************************************************************/

// https://www.granfairs.com/blog/staff/jquery-date-control
function formSetDay(){
  var lastday = formSetLastDay($('.year').val(), $('.month').val());
  var option = '';
  for (var i = 1; i <= lastday; i++) {
    if (i === $('.day').val()){
      option += '<option value="' + i + '" selected="selected">' + i + '</option>\n';
    }else{
      option += '<option value="' + i + '">' + i + '</option>\n';
    }
  }
  $('.day').html(option);
}

function formSetLastDay(year, month){
  var lastday = new Array('', 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0){
    lastday[2] = 29;
  }
  return lastday[month];
}

$(document).on('change', '.month', function (){
  formSetDay();
});

/************************************************************************/
/**                           check  クレジットカード                     **/
/************************************************************************/
$(document).on('blur', '#input-card_number', function (){
  let str = $(this).val();
  if(isCreditCard(str)){
    builderHTMLType(this,'success', 'SUCCESS');
  }else{
    builderHTMLType($('#input-card_number'),'waring', '不正な番号です');
  }
});


$(document).on('blur', '#input-expiration_date', function (){
  if(!isEmptyInput($('.year')) || isEmptyInput($('.month')) || isEmptyInput($('.day'))){
    builderHTMLType(this,'success', 'SUCCESS');
  }  
});

$(document).on('blur', '#input-secrity_code', function (){

  if(isEmptyInput($('.year')) || isEmptyInput($('.month')) || isEmptyInput($('.day'))){
    builderHTMLType($('#input-expiration_date'),'waring', '必須です');
  }

  if(isEmptyInput($(this))){
    builderHTMLType($(this),'waring', '必須や!!');
  }else {
    let code = $(this).val();
    if (code.match(/^([0-9]{3})$/)　|| code.match(/^([0-9]{4})$/)) {
      builderHTMLType($(this),'success', 'SUCCESS');
    }else{
      builderHTMLType($(this),'waring', 'コードは3または4桁ですよ');
    }
  }    
 
});

/************************************************************************/
/**                                  ボタン有効                          **/
/************************************************************************/
$(document).on('change', '*', function (){

  if($(this).find('.btn-step1').length){
      if(isEmptyInput($('#input-nickname')) 
      || isEmptyInput($('#input-email')) 
      || isEmptyInput($('#input-password'))
      || isEmptyInput($('#input-first_name')) 
      || isEmptyInput($('#input-last_name')) 
      || isEmptyInput($('#input-first_kananame')) 
      || isEmptyInput($('#input-last_kananame'))
      || isEmptyInput($('.year'))
      || isEmptyInput($('.month')) 
      || isEmptyInput($('.day'))){
        isDisableButton($('.btn-step1'));
      }else{
        isDisableButton($('.btn-step1'), false);
      }
  }else if($(this).find('.btn-step4').length){
    if(isEmptyInput($('#input-address_first_name')) 
    || isEmptyInput($('#input-address_last_name')) 
    || isEmptyInput($('#input-address_firt_kananame'))
    || isEmptyInput($('#input-address_last_kananame')) 
    || isEmptyInput($('#input-address_zipcode')) 
    || isEmptyInput($('#input-address_prefecture')) 
    || isEmptyInput($('#input-address_city')) 
    || isEmptyInput($('#input-address_block'))){
      isDisableButton($('.btn-step4'));
    }else{
      isDisableButton($('.btn-step4'), false);
    }
  }else if($(this).find('.btn-card_create').length){
    if(isEmptyInput($('#input-card_number')) 
    || isEmptyInput($('#year')) 
    || isEmptyInput($('#month'))
    || isEmptyInput($('#input-secrity_code'))){
      isDisableButton($('.btn-card_create'));
    }else{
      isDisableButton($('.btn-card_create'), false);
    }

  }
});
