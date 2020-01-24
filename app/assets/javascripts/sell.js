/************************************************************************/
/**                      販売手数料・販売利益計算処理                       **/
/************************************************************************/
$(function(){
  $('#price_calc').on('input', function(){
    var data = $('#price_calc').val();
    if ((data >= 300) && (data <= 9999999)){
      var profit = Math.ceil(data * 90 / 100)
      var fee = (data - profit).toLocaleString();
      profit = profit.toLocaleString();
      $('.l-right1').html(fee);
      $('.l-right1').prepend('¥');
      $('.l-right2').html(profit);
      $('.l-right2').prepend('¥');
      $('#price').val(data);
    }
    else if(data == ''){
      $('.l-right2').html('-');
      $('.l-right1').html('-');
    }
    else if ((data >= 300) && (data >= 9999999)) {
      $('.l-right1').html('-');
      $('.l-right2').html('-');
    }
    else if (data <= 300) {
      $('.l-right1').html('-');
      $('.l-right2').html('-');
    }
  })
});



/************************************************************************/
/**                             画像表示処理                             **/
/************************************************************************/
$(function(){
  function buildImage(loadedImageUri,imgId){
    var html =
    `<li class="sell-upload-item" data-img-id="${imgId}">
      <figure class="sell-upload-figure landscape">
        <img src=${loadedImageUri} id="${imgId}">
      </figure>
      <div class="sell-upload-button">
        <a href="javascript:void(0)" class="sell-upload-edit">編集</a>
        <a href="javascript:void(0)" class="sell-img-delete">削除</a>
      </div>
    </li>`
    return html
  };

  var fileField = $('.sell-upload-drop-box')
  var count = 0;

  //--------------------------クリックでの画像選択処理-------------------------//
  $(fileField).on('change', fileField, function(e) {
    file = e.target.files[0]
    reader = new FileReader()
    var imgId = count;

    reader.onload = (function(file) {
      return function(e) {
        var loadedImageUri = e.target.result

        //画像の数に合わせてクラス名の数字を修正
        var className1 = document.querySelector(`.sell-upload-items`).classList.value;
        var countStr1 = "sell-upload-items have-item-".length;
        var className11= Number(className1.substr(countStr1, (className1.length - countStr1)));

        var className2 = document.querySelector(`.sell-upload-drop-box`).classList.value;
        var countStr2 = "sell-upload-drop-box have-item-".length;
        var className21= Number(className2.substr(countStr2, (className2.length - countStr2)));

        document.querySelector(`.sell-upload-items.have-item-${className11}`).classList.value = `sell-upload-items have-item-${(className11 + 1)}`;
        document.querySelector(`.sell-upload-drop-box.have-item-${className21}`).classList.value = `sell-upload-drop-box have-item-${(className21 + 1)}`;

        $(buildImage(loadedImageUri,imgId)).appendTo(".sell-upload-items ul").trigger("create");
        count = ++count;
      };
    })(file);
    reader.readAsDataURL(file);

    //画像表示が終わったらファイルが入ったinputのidを変更し、新しいinputを挿入
    $('#post_img_last').attr('id', 'post_img');
    var html = `<input multiple="multiple" class="sell-upload-drop-file" id="post_img_last" data-img-input-id="${count+1}" accept="image/*" type="file" name="product[urls][]">`
    $(html).appendTo('.sell-upload-drop-box');

  });

  //--------------------------ドラッグでの画像選択処理-------------------------//
  $(fileField).on('drag', fileField, function(e) {
    file = e.target.files[0]
    reader = new FileReader()
    var imgId = count;
    reader.onload = (function(file) {
      return function(e) {
        var loadedImageUri = e.target.result

        //画像の数に合わせてクラス名の数字を修正
        var className1 = document.querySelector(`.sell-upload-items`).classList.value;
        var countStr1 = "sell-upload-items have-item-".length;
        var className11= Number(className1.substr(countStr1, (className1.length - countStr1)));

        var className2 = document.querySelector(`.sell-upload-drop-box`).classList.value;
        var countStr2 = "sell-upload-drop-box have-item-".length;
        var className21= Number(className2.substr(countStr2, (className2.length - countStr2)));

        document.querySelector(`.sell-upload-items.have-item-${className11}`).classList.value = `sell-upload-items have-item-${(className11 + 1)}`;
        document.querySelector(`.sell-upload-drop-box.have-item-${className21}`).classList.value = `sell-upload-drop-box have-item-${(className21 + 1)}`;

        $(buildImage(loadedImageUri,imgId)).appendTo(".sell-upload-items ul").trigger("create");
        count = ++count;
      };
    })(file);
    reader.readAsDataURL(file);

    //画像表示が終わったらファイルが入ったinputのidを変更し、新しいinputを挿入
    $('#post_img_last').attr('id', 'post_img');
    var html = `<input multiple="multiple" class="sell-upload-drop-file" id="post_img_last" data-img-input-id="${count+1}" accept="image/*" type="file" name="product[urls][]">`
    $(html).appendTo('.sell-upload-drop-box');

  });

});


//-----------------画像「編集」と「削除」ボタンの処理-----------------//
// 今回は「削除」ボタンのみ実装する
$(function(){
  $('#img_field').on('click','li a',function() {  //クリックされたaタグ情報を取得
    if($(this).context.text == "削除"){
    //----- 削除クリック時の処理

      //クリックされた画像をli要素ごと削除（画像１つを削除）
      $(this).parent().parent().remove();

      //クリックされた画像のinputタグを削除
      var img_id = $(this).parent().parent().attr("data-img-id"); //クリックされた画像の枠(li)に付けられたimg-data-idの番号を取得
      var obj = $(".sell-upload-drop-box input")

      for(var i = 0; i < obj.length; i++){
        if(obj.eq(i).data("img-input-id") == img_id){
          obj.eq(i).remove(); //inputタグ削除

          //画像の数に合わせてクラス名の数字を修正
          var className1 = document.querySelector(`.sell-upload-items`).classList.value;
          var countStr1 = "sell-upload-items have-item-".length;
          var className11= Number(className1.substr(countStr1, (className1.length - countStr1)));

          var className2 = document.querySelector(`.sell-upload-drop-box`).classList.value;
          var countStr2 = "sell-upload-drop-box have-item-".length;
          var className21= Number(className2.substr(countStr2, (className2.length - countStr2)));

          document.querySelector(`.sell-upload-items.have-item-${className11}`).classList.value = `sell-upload-items have-item-${className11 - 1}`;
          document.querySelector(`.sell-upload-drop-box.have-item-${className21}`).classList.value = `sell-upload-drop-box have-item-${className21 - 1}`;
        }
      }
    }else if($(this).context.text == "編集"){
    //----- 編集クリック時の処理(今回は未実装)
    }
  });

});


/************************************************************************/
/**                           カテゴリ選択処理                            **/
/************************************************************************/
$(function(){
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成
  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = `<div class='select-wrap' id= 'children_wrapper'>
                        <select class="select-default" id="child_category" name="children_id">
                          <option value="---" data-category="---">---</option>
                          ${insertHTML}
                        <select>
                        <i class="fas fa-chevron-down"></i>
                      </div>`;
    $('.product-detail-category').append(childSelectHtml);
  }
  // 孫カテゴリーの表示作成
  function appendGrandchidrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `<div class='select-wrap' id= 'grandchildren_wrapper'>
                        <select class="select-default" id="grandchild_category" name="grandchild_id">
                          <option value="---" data-category="---">---</option>
                          ${insertHTML}
                        <select>
                        <i class="fas fa-chevron-down"></i>
                      </div>`;
    $('.product-detail-category').append(grandchildSelectHtml);
  }

  // 親カテゴリー選択後のイベント
  $('#parent_category').on('change', function(){
    // var parentCategory = document.getElementById('parent_category').value; //選択された親カテゴリーの名前を取得
    var parentCategory = document.getElementById('parent_category').value;
    if (parentCategory != "---"){ //親カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/sell/get_category_children',
        type: 'GET',
        data: { parent_id: parentCategory },
        dataType: 'json'
      })
      .done(function(children){
        $('#children_wrapper').remove(); //親が変更された時、子以下を削除
        $('#grandchildren_wrapper').remove();
        $('#size_wrapper').remove();
        $('#brand_wrapper').remove();
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child);
        });
        appendChidrenBox(insertHTML);
      })
      .fail(function(){
        // 通信失敗時の処理
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#children_wrapper').remove(); //親カテゴリーが初期値になった時、子以下を削除
      $('#grandchildren_wrapper').remove();
      $('#size_wrapper').remove();
      $('#brand_wrapper').remove();
    }
  });
  // 子カテゴリー選択後のイベント
  $('.product-detail-category').on('change', '#child_category', function(){
    var childId = $('#child_category option:selected').data('category'); //選択された子カテゴリーのidを取得
    if (childId != "---"){ //子カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/sell/get_category_grandchildren',
        type: 'GET',
        data: { child_id: childId },
        dataType: 'json'
      })
      .done(function(grandchildren){
        if (grandchildren.length != 0) {
          $('#grandchildren_wrapper').remove(); //子が変更された時、孫以下を削除
          $('#size_wrapper').remove();
          $('#brand_wrapper').remove();
          var insertHTML = '';
          grandchildren.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          appendGrandchidrenBox(insertHTML);
        }
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchildren_wrapper').remove(); //子カテゴリーが初期値になった時、孫以下を削除
      $('#size_wrapper').remove();
      $('#brand_wrapper').remove();
    }
  });
});



/************************************************************************/
/**        サイズ・ブランド選択処理（特定の孫カテゴリに対して表示・非表示）       **/
/************************************************************************/
$(function(){
  // サイズセレクトボックスのオプションを作成
  function appendSizeOption(size){
    var html = `<option value="${size.id}">${size.name}</option>`;
    return html;
  }
  // サイズ・ブランド入力欄の表示作成
  function appendSizeBox(insertHTML){
    var sizeSelectHtml = '';
    sizeSelectHtml = `<div class="form-group" id= 'size_wrapper'>
                        <label class="form-group label" for="サイズ">サイズ</label>
                        <span class='form-require'>必須</span>
                        <div class='select-wrap'>
                          <select class="select-default" id="size" name="size_id">
                            <option value="---">---</option>
                            ${insertHTML}
                          <select>
                        <i class="fas fa-chevron-down"></i>
                        </div>
                      </div>
                      <div class="form-group" id= 'brand_wrapper'>
                        <label class="form-group label" for="ブランド">ブランド</label>
                        <span class='form-arbitrary'>任意</span>
                        <input class="input-default" placeholder="例)シャネル" type="text" name="product[brand]" id="brand" list="brandsList"
                        <i class="fas fa-chevron-down"></i>
                        </div>
                      </div>`;
    $('.product-detail-size_brand').append(sizeSelectHtml);
  }
  
  // 孫カテゴリー選択後のイベント
  $('.product-detail-category').on('change', '#grandchild_category', function(){
    var parentId = document.getElementById('parent_category').value; //選択された親カテゴリーのidを取得
    var childId = $('#child_category option:selected').data('category'); //選択された子カテゴリーのidを取得
    var grandchildId = $('#grandchild_category option:selected').data('category'); //選択された孫カテゴリーのidを取得
    if (grandchildId != "---"){ //孫カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/sell/get_size',
        type: 'GET',
        data: { parent_id: parentId, child_id: childId ,grandchild_id: grandchildId },
        dataType: 'json'
      })
      .done(function(sizes){
        $('#size_wrapper').remove(); //孫が変更された時、サイズ欄以下を削除
        $('#brand_wrapper').remove();
        if (sizes.length != 0) {
        var insertHTML = '';
          sizes.forEach(function(size){
            insertHTML += appendSizeOption(size);
          });
          appendSizeBox(insertHTML);
        }
      })
      .fail(function(){
        alert('サイズ取得に失敗しました');
      })
    }else{
      $('#size_wrapper').remove(); //孫カテゴリーが初期値になった時、サイズ欄以下を削除
      $('#brand_wrapper').remove();
    }
  });

  // ブランドカテゴリーの入力候補表示イベント
  var brand_array;
  $(document).on("keyup","#brand",function() {
    brand_array = new Array();
    let input = $("#brand").val();
    $.ajax({
      url: '/sell/get_brand',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(brands) {
      brands.forEach(function(brand){
        brand_array.push({id:brand.id,value:brand.name},);
      });
    })
    availableTags = brand_array;
    $("#brand").autocomplete({
      source: availableTags
    });
  });

});


/************************************************************************/
/**                        発送方法 選択処理                              **/
/************************************************************************/
$(function(){
  // 発送方法セレクトボックスのオプションを作成
  function appendMethodOption(method){
    var html = `<option value="${method.id}">${method.name}</option>`;
    return html;
  }
  // 発送方法入力欄の表示作成
  function appendMethodBox(insertHTML){
    var methodSelectHtml = '';
    methodSelectHtml = `<div class="form-group" id= 'method_wrapper'>
                        <label class="form-group label" for="発送の方法">発送の方法</label>
                        <span class='form-require'>必須</span>
                        <div class='select-wrap'>
                          <select class="select-default" id="method" name="product[shipping_method_id]">
                            <option value="---">---</option>
                            ${insertHTML}
                          <select>
                        <i class="fas fa-chevron-down"></i>
                        </div>
                      </div>`;
    $('#shippingCharge').append(methodSelectHtml);
  }
  // 配送料の負担選択後のイベント
  $(document).on('change', '#shipping_charge', function(){
    var chargeId = document.getElementById('shipping_charge').value; //選択された親カテゴリーのidを取得
    if (chargeId != "---"){ //配送料の負担が初期値でないことを確認
      $.ajax({
        url: '/sell/get_method',
        type: 'GET',
        data: { shipping_method_id: chargeId},
        dataType: 'json'
      })
      .done(function(methods){
        $('#method_wrapper').remove(); //配送料の負担が変更された時、配送の方法欄を削除
        if (methods.length != 0) {
        var insertHTML = '';
          methods.forEach(function(method){
            insertHTML += appendMethodOption(method);
          });
          appendMethodBox(insertHTML);
        }
      })
      .fail(function(){
        alert('配送の方法の取得に失敗しました');
      })
    }else{
      $('#method_wrapper').remove(); //孫カテゴリーが初期値になった時、サイズ欄以下を削除
    }
  });
});


/************************************************************************/
/**                        入力チェック処理                               **/
/************************************************************************/

function builderHTMLType(targetObj, addObj, message){
  let type = "";
  let blank = "  ";
  let html = "";
  let id = "";

    id = targetObj.selector.split('#')[1]+"_error";
  if(!$(`div.error_alert#${id}`).length){
    id = targetObj.selector.split('#')[1]+"_error";
    type  = `<div class="error_alert" id=${id}><span class="info-container__error">`;
    html = type + blank + message + '</span></div>';
  }
  $(addObj).after(html);
}

//テキスト・セレクト項目が空かどうかチェック
function isEmptyInput (obj){
  (obj.val() == "" || obj.val() == "---") ?  result = true : result = false;
  return result;
}

$(function(){
  $('#new_product').submit(function(){

    /************* 空チェック処理 ************/
    flag = 0;
    //画像の有無チェック
    if ($('li.sell-upload-item').length < 1){
       builderHTMLType($('#sell-dropbox-container'),$('#imgview') ,'画像がありません'); flag = ++flag;
    }else{$('#sell-dropbox-container_error').remove();}

    if (isEmptyInput($('#product_name'))) {
      builderHTMLType($('#product_name'),$('#product_name') ,'入力してください'); flag = ++flag;
    }else{$('#product_name_error').remove();}

    if (isEmptyInput($('#product_description'))) {
      builderHTMLType($('#product_description'), $('#product_description'), '入力してください'); flag = ++flag;
    }else{$('#product_description_error').remove();}

    if (isEmptyInput($('#parent_category'))) {
      builderHTMLType($('#parent_category'),$('#product-detail-category'), '選択してください'); flag = ++flag;
    }else{$('#parent_category_error').remove();}

    if (isEmptyInput($('#child_category'))) {
      builderHTMLType($('#child_category'),$('#product-detail-category'), '選択してください'); flag = ++flag;
    }else{$('#child_category_error').remove();}

    if (isEmptyInput($('#grandchild_category'))) {
      builderHTMLType($('#grandchild_category'),$('#product-detail-category'), '選択してください'); flag = ++flag;
    }else{$('#grandchild_category_error').remove();}

    if (isEmptyInput($('#size'))) {
      builderHTMLType($('#size'),$('#size_wrapper'), '選択してください'); flag = ++flag;
    }else{$('#size_error').remove();}
    
    if (isEmptyInput($('#product_status'))) {
      builderHTMLType($('#product_status'),$('#product_status'), '選択してください'); flag = ++flag;
    }else{$('#product_status_error').remove();}

    if (isEmptyInput($('#shipping_charge'))) {
      builderHTMLType($('#shipping_charge'),$('#shipping_charge'), '選択してください'); flag = ++flag;
    }else{$('#shipping_charge_error').remove();}

    if (isEmptyInput($('#shipping_area'))) {
      builderHTMLType($('#shipping_area'),$('#shipping_area'), '選択してください'); flag = ++flag;
    }else{$('#shipping_area_error').remove();}

    if (isEmptyInput($('#shipping_time'))) {
      builderHTMLType($('#shipping_time'),$('#shipping_time'), '選択してください'); flag = ++flag;
    }else{$('#shipping_time_error').remove();}

    if (isEmptyInput($('#price_calc'))) {
      builderHTMLType($('#price_calc'),$('#priceview'), '300以上9999999以下で入力してください'); flag = ++flag;
    }else{$('#price_calc_error').remove();}

    if(!flag == 0){
      return false;  // submitを中止
    }else{
      // モーダルウィンドウ用HTML
      function appendModalView(){
        var methodSelectHtml = '';
        methodSelectHtml = `<div>
                              <h3 class="modal-head">出品が完了しました</h3>
                              <div class="sell-modal-body">
                                あなたが出品した商品は「出品した商品一覧」からいつでも見ることができます。
                                <a class="btn-default btn-red" href="./sell" data-turbolinks="false">続けて出品する</a>
                                <p class="text-center">
                                  <a href="./">商品ページへ言ってシェアする</a>
                                </p>
                              </div>
                            </div>`;
        $('.modal-inner').append(methodSelectHtml);
      }
      appendModalView();  // モーダルウィンドウHTML追加
      $(".modal").addClass("is-show is-animate sell-draft");  //HTMLタグにクラス追加
      $(".overlay").addClass("modal-open is-animate");  //HTMLタグにクラス追加
      $('.modal').fadeIn();  //モーダルウィンドウをフェードインで表示
    }
  })
});




