/************************************************************************/
/**                        入力チェック処理                               **/
/************************************************************************/
$(window).on("turbolinks:load", function() {

  if(!gon.payment_method){
  // 支払い方法が設定されてない場合
    var element = document.querySelector('#submitflag');
    element.className = 'product-buy-btn-gray';
    e.preventDefault();
  }else if(!gon.user.address_zipcode || !gon.user.address_prefecture || !gon.user.address_city || !gon.user.address_block || !gon.user.address_first_name || !gon.user.address_last_name){
  // 配送先が設定されてない場合
    var element = document.querySelector('#submitflag');
    element.className = 'product-buy-btn-gray';
    e.preventDefault();
  }


  $('#submitflag').on('click', function(e){
    if(gon.payment_method.card_number && gon.payment_method.card_number){
      var element = $('#submitflag')
      element.attr("href",`${gon.href}`);
      document.getElementById('submitflag').onclick = function () {
        document.getElementById('submitflag').click();
      }
    }
  });

});

