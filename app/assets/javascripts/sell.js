//===============================================================================//
//                                     new 処理                                  //
//===============================================================================//

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
    var html = `<input multiple="multiple" class="sell-upload-drop-file" id="post_img_last" data-img-input-id="${count+1}" accept="image/*" type="file" name="product[product_images_attributes][${count+1}][url]">`
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
    var html = `<input multiple="multiple" class="sell-upload-drop-file" id="post_img_last" data-img-input-id="${count+1}" accept="image/*" type="file" name="product[product_images_attributes][${count+1}][url]">`
    $(html).appendTo('.sell-upload-drop-box');

  });

  //-----------------画像「編集」と「削除」ボタンの処理-----------------//
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
    }
  });


  //----- 編集クリック時の処理
  // 編集用に.sell-upload-itemsへ編集用inputタグを挿入
  var html = $(`<input multiple="multiple" class="sell-upload-drop-file" id="post_img" accept="image/*" type="file" name="product[product_images_attributes][][url]">`)
  $('.sell-upload-items').append(html);

  $(".sell-upload-items").on('click', '.sell-upload-edit', function(){
    // クリックした画像を取得
    var target_image = $(this).parent().parent();
    // 編集画像のdata-image番号を取得
    var target_image_num = target_image.data('img-id');
    // inputタグを取得
    var getInput = document.getElementsByClassName('sell-upload-drop-file');

    //編集用inputをクリックさせる
    $('.sell-upload-products-container .sell-upload-drop-file').click();

    // 編集用inputの内容変更されたら処理
    $(".sell-upload-products-container").on('change', 'input[type= "file"].sell-upload-drop-file', function(e){
      // changeイベントが重複実行されないようにイベントをOFFへ変更。これにより１度だけ実行される。
      $(".sell-upload-items .sell-upload-drop-file").off('change');

      for (var i=0; i < getInput.length; i++){
        if(target_image_num == Number(getInput[i].dataset.imgInputId)){

          var file = $(this).prop("files")[0];
          var reader = new FileReader();
            var img = $(`<li class="sell-upload-item">
                          <figure class="sell-upload-figure landscape">
                            <img>
                          </figure>
                          <div class="sell-upload-button">
                            <a href="javascript:void(0)" class="sell-upload-edit">編集</a>
                            <a href="javascript:void(0)" class="sell-img-delete">削除</a>
                          </div>
                        </li>`)

          reader.onload = function(e) {
            img.find("img").attr({
              src: e.target.result,
              id: target_image_num
            });
            img.attr('data-img-id', target_image_num);
          }
          reader.readAsDataURL(file);
          
          // 画像の挿入処理
          var list = $('#img_field').children()
          for (var n=0; n < list.length; n++){
            if (target_image_num == Number(list[n].dataset.imgId)){
              // クリックした画像の位置の後ろへ新しい画像を挿入
              $(img).insertAfter(list[n]);
              
              // クリックした画像を削除
              list[n].remove();
              
              // 新しいinputにdata属性付与、name属性の配列番号付与
              $('.sell-upload-products-container .sell-upload-drop-file').attr({
                'data-img-input-id': target_image_num,
                name: `product[product_images_attributes][${target_image_num}][url]`
              });
              
              // クリックした画像のinputの後ろへ新しい画像のinputを移動
              $('.sell-upload-products-container .sell-upload-drop-file').insertAfter(getInput[i]);
              
              // クリックした画像のinputを削除
              getInput[n].remove();

              break;
            }
          }
        }
      }

    });
  })

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
                        <select class="select-default" id="child_category" name="product[category_children_id]">
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
                        <select class="select-default" id="grandchild_category" name="product[category_grandchild_id]">
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
                          <select class="select-default" id="size" name="product[size_id]">
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
    }else{
      if($('#price_calc').val() < 300) {
        builderHTMLType($('#price_calc'),$('#priceview'), '300以上9999999以下で入力してください'); flag = ++flag;
      }else{
        if($('#price_calc').val() > 9999999) {
          builderHTMLType($('#price_calc'),$('#priceview'), '300以上9999999以下で入力してください'); flag = ++flag;
        }else{
          $('#price_calc_error').remove();
        }
      }
    }


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
                                <a class="btn-default btn-red" href="./" data-turbolinks="false">続けて出品する</a>
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


//===============================================================================//
//                                edit update 処理                                //
//===============================================================================//

/************************************************************************/
/**                             画像表示処理                             **/
/************************************************************************/
$(window).on("turbolinks:load", function() {
  var dropzone = $(".item__img__dropzone__input");
  var dropzone2 = $(".item__img__dropzone2__input2");
  var appendzone = $(".item__img__dropzone2")
  var input_area = $(".input-area");
  var preview = $("#preview");
  var preview2 = $("#preview2");

  // 登録済画像と新規追加画像を全て格納する配列（ビュー用）
  var images = [];
  // 登録済画像データだけの配列（DB用）idのみの配列
  var registered_images_ids =[]
  // 新規追加画像データだけの配列（DB用）
  var new_image_files = [];
  // 編集画像データだけの配列（DB用）[id,画像データ]
  var edit_image_files = [];
  var edit_image_ids = [];

  // 登録済画像のプレビュー表示
  gon.product_images.forEach(function(image, index){
    var img = $(`<div class= "add_img"><div class="img_area"><img class="image"></div></div>`);

    // カスタムデータ属性を付与
    img.data("image", index)
    var btn_wrapper = $('<div class="btn_wrapper"><a class="btn_edit">編集</a><a class="btn_delete">削除</a></div>');

    // 画像に編集・削除ボタンをつける
    img.append(btn_wrapper);

    binary_data = gon.product_images_binary_datas[index]

    // 表示するビューにバイナリーデータを付与
    img.find("img").attr({
      src: "data:image/*;base64," + binary_data
    });

    // 登録済画像のビューをimagesに格納
    images.push(img)
    registered_images_ids.push(image.id)
  })

  // 画像が４枚以下のとき
  if (images.length <= 4) {
    $(preview).empty();
    $.each(images, function(index, image) {
      image.data('image', index);
      preview.append(image);
    })
    dropzone.css({
      'width': `calc(100% - (3px * ${images.length}) - (20% * ${images.length}))`,
      'margin-left': "11px"
    })

    // 画像が５枚のとき１段目の枠を消し、２段目の枠を出す
  } else if (images.length == 5) {
    $("#preview").empty();
    $.each(images, function(index, image) {
      image.data("image", index);
      preview.append(image);
    });
    appendzone.css({
      display: "block",
      'margin-bottom': '10px'
    });
    dropzone.css({
      display: "none"
    });
    preview2.empty();

    // 画像が６枚以上のとき
  } else if (images.length >= 6) {
    // １〜５枚目の画像を抽出
    var pickup_images1 = images.slice(0, 5);

    // １〜５枚目を１段目に表示
    $('#preview').empty();
    $.each(pickup_images1, function(index, image) {
      image.data('image', index);
      preview.append(image);
    })

    // ６枚目以降の画像を抽出
    var pickup_images2 = images.slice(5);

    // ６枚目以降を２段目に表示
    $.each(pickup_images2, function(index, image) {
      image.data('image', index + 5);
      preview2.append(image);
    })

    dropzone.css({
      'display': 'none'
    })
    appendzone.css({
      'display': 'block',
      'margin-bottom': '0px'
    })

    dropzone2.css({
      'display': 'block',
      'width': `calc(100% - (3px * ${images.length - 5}) - (20% * ${images.length - 5}))`,
      'margin-left': "11px"
    })

    // 画像が１０枚になったら枠を消す
    if (images.length == 10) {
      dropzone2.css({
        display: "none"
      });
    }
  }

  //--------------------------クリックでの追加-----------------------------
  // 画像を新しく追加する場合
  $("#cell-container").on("change", '.upload-image', function() {
    var file = $(this).prop("files")[0];
    new_image_files.push(file)
    var reader = new FileReader();
    var img = $(`<div class= "add_img"><div class="img_area"><img class="image"></div></div>`);

    reader.onload = function(e) {
      var btn_wrapper = $('<div class="btn_wrapper"><a class="btn_edit">編集</a><a class="btn_delete">削除</a></div>');

      // 画像に編集・削除ボタンをつける
      img.append(btn_wrapper);
      img.find("img").attr({
        src: e.target.result
      });
    };

    reader.readAsDataURL(file);
    images.push(img);

    // 画像が４枚以下のとき
    if (images.length <= 4) {
      $('#preview').empty();
      $.each(images, function(index, image) {
        image.data('image', index);
        preview.append(image);
      })
      dropzone.css({
        'width': `calc(100% - (3px * ${images.length}) - (20% * ${images.length}))`,
        'margin-left': "11px"
      })

      // 画像が５枚のとき１段目の枠を消し、２段目の枠を出す
    } else if (images.length == 5) {
      $("#preview").empty();
      $.each(images, function(index, image) {
        image.data("image", index);
        preview.append(image);
      });
      appendzone.css({
        display: "block",
        'margin-bottom': '10px'
      });
      dropzone.css({
        display: "none"
      });
      preview2.empty();

      // 画像が６枚以上のとき
    } else if (images.length >= 6) {

      // 配列から６枚目以降の画像を抽出
      var pickup_images = images.slice(5);

      $.each(pickup_images, function(index, image) {
        image.data("image", index + 5);
        preview2.append(image);

        dropzone2.css({
          'width': `calc(100% - (3px * ${images.length - 5}) - (20% * ${images.length - 5}))`,
          'margin-left': "11px",
          'float': "right"
        })
      });

      appendzone.css({
        'margin-bottom': '0px'
      })

      // 画像が１０枚になったら枠を消す
      if (images.length == 10) {
        dropzone2.css({
          display: "none"
        });
      }
    }

    // inputの値をクリア (同じ画像を連続投稿出来なくなるため)
    $("input.upload-image").val('')

  });


//   //-----------------------ドラッグでの追加---------------------------
//   // 画像を新しく追加する場合
//   $(".item__img__dropzone__input").on("drop",".upload-image", function() {
// alert("入った");
//     var file = $(this).prop("files")[0];
//     new_image_files.push(file)
//     var reader = new FileReader();
//     var img = $(`<div class= "add_img"><div class="img_area"><img class="image"></div></div>`);

//     reader.onload = function(e) {
//       var btn_wrapper = $('<div class="btn_wrapper"><a class="btn_edit">編集</a><a class="btn_delete">削除</a></div>');

//       // 画像に編集・削除ボタンをつける
//       img.append(btn_wrapper);
//       img.find("img").attr({
//         src: e.target.result
//       });
//     };

//     reader.readAsDataURL(file);
//     images.push(img);

//     // 画像が４枚以下のとき
//     if (images.length <= 4) {
//       $('#preview').empty();
//       $.each(images, function(index, image) {
//         image.data('image', index);
//         preview.append(image);
//       })
//       dropzone.css({
//         'width': `calc(100% - (3px * ${images.length}) - (20% * ${images.length}))`,
//         'margin-left': "11px"
//       })

//       // 画像が５枚のとき１段目の枠を消し、２段目の枠を出す
//     } else if (images.length == 5) {
//       $("#preview").empty();
//       $.each(images, function(index, image) {
//         image.data("image", index);
//         preview.append(image);
//       });
//       appendzone.css({
//         display: "block",
//         'margin-bottom': '10px'
//       });
//       dropzone.css({
//         display: "none"
//       });
//       preview2.empty();

//       // 画像が６枚以上のとき
//     } else if (images.length >= 6) {

//       // 配列から６枚目以降の画像を抽出
//       var pickup_images = images.slice(5);

//       $.each(pickup_images, function(index, image) {
//         image.data("image", index + 5);
//         preview2.append(image);

//         dropzone2.css({
//           'width': `calc(100% - (3px * ${images.length - 5}) - (20% * ${images.length - 5}))`,
//           'margin-left': "11px",
//           'float': "right"
//         })
//       });

//       appendzone.css({
//         'margin-bottom': '0px'
//       })

//       // 画像が１０枚になったら枠を消す
//       if (images.length == 10) {
//         dropzone2.css({
//           display: "none"
//         });
//       }
//     }

//     // inputの値をクリア (同じ画像を連続投稿出来なくなるため)
//     $("input.upload-image").val('')

//   });






  // 削除ボタン
  $("#cell-container").on('click', '.btn_delete', function() {

    // 削除ボタンを押した画像を取得
    var target_image = $(this).parent().parent();

    // 削除画像のdata-image番号を取得
    var target_image_num = target_image.data('image');

    // 対象の画像をビュー上で削除
    target_image.remove();

    // 対象の画像を削除した新たな配列を生成
    images.splice(target_image_num, 1);

    // target_image_numが登録済画像の数以下の場合は登録済画像データの配列から削除、それより大きい場合は新たに追加した画像データの配列から削除
    if (target_image_num < registered_images_ids.length) {
      registered_images_ids.splice(target_image_num, 1);
    } else {
      new_image_files.splice((target_image_num - registered_images_ids.length), 1);
    }

    if(images.length == 0) {
      $('input[type= "file"].upload-image').attr({
        'data-image': 0
      })
    }

    // 削除後の配列の中身の数で条件分岐
    // 画像が0枚のとき
    if(images.length == 0){
      $('#preview').empty();
      dropzone.css({
        'width': '100%',
        'display': 'block',
        'margin-left': '0px',
        'margin-bottom': '10px'
      })
      appendzone.css({
        'display': 'none'
      })

    // 画像が４枚以下のとき
    } else if (images.length <= 4) {
      $('#preview').empty();
      $.each(images, function(index, image) {
        image.data('image', index);
        preview.append(image);
      })
      dropzone.css({
        'width': `calc(100% - (3px * ${images.length}) - (20% * ${images.length}))`,
        'margin-left': "11px",
        'display': 'block'
      })
      appendzone.css({
        'display': 'none'
      })

    // 画像が５枚のとき１段目の枠を消し、２段目の枠を出す
    } else if (images.length == 5) {
      $('#preview').empty();
      $.each(images, function(index, image) {
        image.data('image', index);
        preview.append(image);
      })
      appendzone.css({
        'display': 'block',
        'margin-bottom': '10px'
      })
      dropzone2.css({
        'width': '100%',
        'margin-left': '0px'
      })
      dropzone.css({
        'display': 'none'
      })
      preview2.empty();

    // 画像が６枚以上のとき
    } else {
      // １〜５枚目の画像を抽出
      var pickup_images1 = images.slice(0, 5);

      // １〜５枚目を１段目に表示
      $('#preview').empty();
      $.each(pickup_images1, function(index, image) {
        image.data('image', index);
        preview.append(image);
      })

      // ６枚目以降の画像を抽出
      var pickup_images2 = images.slice(5);

      // ６枚目以降を２段目に表示
      $.each(pickup_images2, function(index, image) {
        image.data('image', index + 5);
        preview2.append(image);
        dropzone2.css({
          'display': 'block',
          'width': `calc(100% - (3px * ${images.length - 5}) - (20% * ${images.length - 5}))`,
          'margin-left': "11px",
        })
      })

      appendzone.css({
        'margin-bottom': '0px'
      })
    }
  })


  // 編集用inputタグを挿入
  var edit_image = $(`<input class="edit-image" type="file" accept="image/*" id="edit-image">`);
  $('.input-area').append(edit_image);

  // 編集ボタン処理
  $(".sell-upload-box").on('click', '.btn_edit', function() {
    // 編集ボタンを押した画像を取得
    var target_image = $(this).parent().parent();
    // 編集画像のdata-image番号を取得
    var target_image_num = target_image.data('image');
    // 編集用inputをclickして画像を選択させる
    $('#edit-image').click();

    // 編集用inputの内容変更されたら処理
    $("#cell-container .item__img__dropzone, #cell-container .item__img__dropzone2").on('change', 'input[type= "file"].edit-image', function(e){
      // changeイベントが重複実行されないようにイベントをOFFへ変更。これにより１度だけ実行される。
      $("#cell-container .item__img__dropzone, #cell-container .item__img__dropzone2").off('change');

      var file = $(this).prop("files")[0];
      var reader = new FileReader();
      var img = $(`<div class= "add_img"><div class="img_area"><img class="image"></div></div>`);
      reader.onload = function(e) {
        var btn_wrapper = $('<div class="btn_wrapper"><a class="btn_edit">編集</a><a class="btn_delete">削除</a></div>');
        // 画像に編集・削除ボタンをつける
        img.append(btn_wrapper);
        img.find("img").attr({
          src: e.target.result
        });
      };
      reader.readAsDataURL(file);

      //新規か既存かの判定は、クリックされた画像の番号が「既存配列registered_images_idsのlength」より大きい場合は新規、同じ以下は既存
      if (target_image_num  >= registered_images_ids.length){
      // 新規追加した画像を編集した場合
        // 新規配列new_image_filesの何番目を置き換えるかの番号を取得
        replace_num = target_image_num - registered_images_ids.length
        // 新規配列new_image_filesから対象画像を削除し新しい画像と置き換える
        new_image_files.splice(replace_num,1,file);
      }else{
      // DB保存済の既存画像を編集した場合
        // 変更した画像ファイルのid番号(DB保存済みのid)をedit_image_ids配列へpush
        edit_image_ids.push(registered_images_ids[target_image_num]);
        // 変更した画像ファイルをedit_image_files配列へpush
        edit_image_files.push(file);
      }

      // 対象の画像を削除し、同じ位置へ新しい画像データを挿入した配列を生成
      images.splice(target_image_num, 1, img)

      // 画像が４枚以下のとき
      if (images.length <= 4) {
        $(preview).empty();
        $.each(images, function(index, image) {
          image.data('image', index);
          preview.append(image);
        })
        dropzone.css({
          'width': `calc(100% - (3px * ${images.length}) - (20% * ${images.length}))`,
          'margin-left': "11px"
        })

        // 画像が５枚のとき１段目の枠を消し、２段目の枠を出す
      } else if (images.length == 5) {
        $("#preview").empty();
        $.each(images, function(index, image) {
          image.data("image", index);
          preview.append(image);
        });
        appendzone.css({
          display: "block"
        });
        dropzone.css({
          display: "none"
        });
        dropzone2.css({
          'width': '100%',
          'margin-left': '0px'
        });
        preview2.empty();

        // 画像が６枚以上のとき
      } else if (images.length >= 6) {
        // １〜５枚目の画像を抽出
        var pickup_images1 = images.slice(0, 5);

        // １〜５枚目を１段目に表示
        $('#preview').empty();
        $.each(pickup_images1, function(index, image) {
          image.data('image', index);
          preview.append(image);
        })

        // ６枚目以降の画像を抽出
        var pickup_images2 = images.slice(5);

        // ６枚目以降を２段目に表示
        $('#preview2').empty();
        $.each(pickup_images2, function(index, image) {
          image.data('image', index + 5);
          preview2.append(image);
        })

        dropzone.css({
          'display': 'none'
        })
        appendzone.css({
          'display': 'block'
        })
        
        dropzone2.css({
          'display': 'block',
          'width': `calc(100% - (3px * ${images.length - 5}) - (20% * ${images.length - 5}))`,
          'margin-left': "11px"
        })
      }

      $("input.edit-image").val('');
    });
  });


  // submit処理
  $('.sell-form').on('submit', function(e){
    // 通常のsubmitイベントを止める
    e.preventDefault();
    // images以外のform情報をformDataに追加
    var formData = new FormData($(this).get(0));

    // 登録済画像が残っていない場合は便宜的に0を入れる
    if (registered_images_ids.length == 0) {
      formData.append("registered_images_ids[ids][]", 0)
    // 登録済画像で、まだ残っている画像があればidをformDataに追加していく
    } else {
      registered_images_ids.forEach(function(registered_image){
        formData.append("registered_images_ids[ids][]", registered_image)
      });
    }

    // 新しく追加したimagesがない場合は便宜的に空の文字列を入れる
    if (new_image_files.length == 0) {
      formData.append("new_images[images][]", " ")
    // 新しく追加したimagesがある場合はformDataに追加する
    } else {
      new_image_files.forEach(function(file){
        formData.append("new_images[images][]", file)
      });
    }

console.log(images);
console.log(registered_images_ids);
console.log(new_image_files);
console.log(edit_image_files);
console.log(edit_image_ids);

    // 変更をかけた画像ファイルがない場合は便宜的に0を入れる
    if (edit_image_files.length == 0) {
      formData.append("edit_images[images][]", " ")
    } else {
      edit_image_files.forEach(function(file){
        formData.append("edit_images[images][]", file)
      });
    }

    // 変更をかけた画像idがない場合は便宜的に0を入れる
    if (edit_image_ids.length == 0) {
      formData.append("edit_image_ids[ids][]", " ")
    } else {
      edit_image_ids.forEach(function(id){
        formData.append("edit_image_ids[ids][]", id)
      });
    }

    $.ajax({
      url:         gon.product.id,
      type:        "PATCH",
      data:        formData,
      contentType: false,
      processData: false,
    })
  });
});


/************************************************************************/
/**                   カテゴリ(子・孫)、ブランド初期表示処理                 **/
/************************************************************************/
$(document).ready(function () {
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category,category_id){
    if(category.id == category_id){
      var html = `<option value="${category.id}" selected data-category="${category.id}">${category.name}</option>`;
      return html;
    }else{
      var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
      return html;
    }
  }
  // 子カテゴリーの表示作成
  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = `<div class='select-wrap' id= 'children_wrapper'>
                        <select class="select-default" id="child_category" name="product[category_children_id]">
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
                        <select class="select-default" id="grandchild_category" name="product[category_grandchild_id]">
                          <option value="---" data-category="---">---</option>
                          ${insertHTML}
                        <select>
                        <i class="fas fa-chevron-down"></i>
                      </div>`;
    $('.product-detail-category').append(grandchildSelectHtml);
  }

  // サイズセレクトボックスのオプションを作成
  function appendSizeOption(size,size_id){
    if(size.id == size_id){
      var html = `<option value="${size.id}" selected>${size.name}</option>`;
      return html;
    }else{
      var html = `<option value="${size.id}">${size.name}</option>`;
      return html;
    }
  }
  // サイズ・ブランド入力欄の表示作成
  function appendSizeBox(insertHTML,brand){
    var sizeSelectHtml = '';
    sizeSelectHtml = `<div class="form-group" id= 'size_wrapper'>
                        <label class="form-group label" for="サイズ">サイズ</label>
                        <span class='form-require'>必須</span>
                        <div class='select-wrap'>
                          <select class="select-default" id="size" name="product[size_id]">
                            <option value="---">---</option>
                            ${insertHTML}
                          <select>
                        <i class="fas fa-chevron-down"></i>
                        </div>
                      </div>
                      <div class="form-group" id= 'brand_wrapper'>
                        <label class="form-group label" for="ブランド">ブランド</label>
                        <span class='form-arbitrary'>任意</span>
                        <input class="input-default" placeholder="例)シャネル" type="text" value="${brand}" name="product[brand]" id="brand" list="brandsList"
                        <i class="fas fa-chevron-down"></i>
                        </div>
                      </div>`;
    $('.product-detail-size_brand').append(sizeSelectHtml);
  }

  // 子カテゴリー一覧作成と初期値設定
  var insertHTML = '';
  gon.category_chidren_array.forEach(function(child){
    insertHTML += appendOption(child,gon.product.category_children_id);
  });
  appendChidrenBox(insertHTML);

  // 孫カテゴリー一覧作成と初期値設定
  var insertHTML = '';
  gon.category_grandchild_array.forEach(function(grandchild){
    insertHTML += appendOption(grandchild,gon.product.category_grandchild_id);
  });
  appendGrandchidrenBox(insertHTML);

  // サイズ・ブランド一覧作成と初期値設定
  if(gon.product.size_id !== null){
    var insertHTML = '';
    gon.size_array.forEach(function(size){
      insertHTML += appendSizeOption(size,gon.product.size_id);
    });
    appendSizeBox(insertHTML,gon.brand);
  }

  // 販売手数料・販売利益を初期表示
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

});
