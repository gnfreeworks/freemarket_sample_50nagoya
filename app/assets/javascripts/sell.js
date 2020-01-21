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
/**                             画像選択処理                             **/
/************************************************************************/

// //テストDrag投稿
// $(function() {
//   var input_area = $('.sell-upload-drop-box');
//   $(document).on('change','#post_img,#post_img_last',function(event) {
//     var new_input = $(`<input multiple="multiple" class="sell-upload-drop-file" id="post_img" accept="image/*" type="file" name="product[image][]">`);
//     input_area.prepend(new_input);
//     $(".sell-upload-drop-box").children(":first").css({'display':'block'});
//     $(this).css({'display':'none'});
//   });
// });

$(function(){

  function buildImage(loadedImageUri,imgId){
    var html =
    `<li class="sell-upload-item">
      <figure class="sell-upload-figure landscape">
        <img src=${loadedImageUri} id="${imgId}">
      </figure>
      <div class="sell-upload-button">
        <a href>削除</a>
      </div>
    </li>`
    return html
  };

  $fileField = $('#post_img_last')
  var files_array = [];

  // 選択された画像を取得し表示
  $($fileField).on('change', $fileField, function(e) {
    
    file = e.target.files[0]
    files_array.push(file);
    reader = new FileReader(),
    $preview = $("#img_field");

    reader.onload = (function(file) {
      return function(e) {
        $preview.empty();
        var loadedImageUri = e.target.result
        document.querySelector(".sell-upload-items.have-item-0").classList.value = "sell-upload-items have-item-1";
        document.querySelector(".sell-upload-drop-box.have-item-0").classList.value = "sell-upload-drop-box have-item-1";
        $(buildImage(loadedImageUri)).appendTo(".sell-upload-items ul").trigger("create");
      };
    })(file);
    reader.readAsDataURL(file);

  });
});


$(function(){
  // プレビューに挿入する画像枠(5-10)HTMLの作成
  function buildbox(){
    var html =
    `<div class="sell-upload-items have-item-0">
      <ul></ul>
    </div>`
    return html
  };

  // 画像を管理するための配列を定義
  var files_array = [];
  
  // 通常のドラッグオーバイベントを停止
  $('.sell-upload-drop-box').on('dragover',function(e){
    e.preventDefault();
  });

  //新ドラッグアンドドロップ画像読み込みテスト
  //プレビューに挿入するHTMLの作成
  function buildImage(loadedImageUri,imgId){
    var html =
    `<li class="sell-upload-item">
      <figure class="sell-upload-figure landscape">
        <img src=${loadedImageUri} id="${imgId}">
      </figure>
      <div class="sell-upload-button">
        <a href>削除</a>
      </div>
    </li>`
    return html
  };

  //画像枠をクリック時のイベント作成
  $('.sell-upload-drop-box').on('drop','#post_img,#post_img_last',function(e) {
      e.preventDefault();
      files = e.originalEvent.dataTransfer.files;
      for (var i=0; i<files.length; i++) {
        files_array.push(files[i]);
        var fileReader = new FileReader();
        fileReader.onload = function( e ) {
          var loadedImageUri = e.target.result;
          var imgId = "img-"+files_array.length;
          var new_input = $(`<input multiple="multiple" class="sell-upload-drop-file" id="post_img" accept="image/*" type="file" name="images[]">`);

          // if(files_array)
          $('.sell-upload-drop-box').prepend(new_input);
          $(buildImage(e.target.result,imgId)).appendTo(".sell-upload-items ul").trigger("create");
          $(imgId).attr('src', e.target.result);

          class_items1 = ".sell-upload-items.have-item-" + (files_array.length - 1);
          class_items2 = "sell-upload-items have-item-" + (files_array.length);
          class_drop1 = ".sell-upload-drop-box.have-item-" + (files_array.length - 1);
          class_drop2 = "sell-upload-drop-box have-item-" + (files_array.length);
          document.querySelector(class_items1).classList.value = class_items2;
          document.querySelector(class_drop1).classList.value = class_drop2;

          if(files_array.length==5){
            //画像表示枠追加(5-6個用)
            $(buildbox()).appendTo(".sell-upload-products-container");
          }
        };
        // ファイルの読み込み実行
        fileReader.readAsDataURL(files[i]);
      }

    //   var num = 1;
    //   var new_input = $(`<input multiple="multiple" class="sell-upload-drop-file" id="post_img" accept="image/*" type="file" name="product[image][]">`);
    //   $('.sell-upload-drop-box.have-item-0 ul').prepend(new_input);

    //   $(buildImage(e.target.result,num)).appendTo(".sell-upload-items.have-item-0 ul").trigger("create");
    //   $("#img-1").attr('src', e.target.result);

    // var file = e.target.files[0]
    // var reader = new FileReader();
    // reader.onload = function (e) {
    //     var img = document.getElementById("img-1")
    //     img.src = e.target.result;
    // }
    // reader.readAsDataURL(file);
  });




  // //画像枠をクリック時のイベント作成
  // var input_area = $('.sell-upload-drop-box.have-item-0 ul');
  // $(document).on('change','#post_img,#post_img_last',function(event) {
  //   var new_input = $(`<input multiple="multiple" class="sell-upload-drop-file" id="post_img" accept="image/*" type="file" name="product[image][]">`);
  //   input_area.prepend(new_input);
  //   $(".sell-upload-drop-box").children(":first").css({'display':'block'});
  //   $(this).css({'display':'none'});
  // });


  // // ドロップ時のイベントの作成
  // $('.sell-upload-drop-box').on('drop',function(event){
  //   event.preventDefault();
  //   // イベントによって得たファイルを配列で取り込む
  //   files = event.originalEvent.dataTransfer.files;
  //   // 画像のファイルを一つずつ画像管理用の配列に追加
  //   for (var i=0; i<files.length; i++) {
  //     files_array.push(files[i]);
  //     var fileReader = new FileReader();
  //     // ファイルが読み込まれた際に行う動作を定義
  //     fileReader.onload = function( event ) {
  //       // 画像のurlを取得
  //       var loadedImageUri = event.target.result;
  //       // 画像数に応じてclass名変更 & 取得したURLを利用してビューにHTMLを挿入
  //       if(files_array.length==1){
  //         document.querySelector(".sell-upload-items.have-item-0").classList.value = "sell-upload-items have-item-1";
  //         document.querySelector(".sell-upload-drop-box.have-item-0").classList.value = "sell-upload-drop-box have-item-1";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-1 ul").trigger("create");
  //       }else if(files_array.length==2){
  //         document.querySelector(".sell-upload-items.have-item-1").classList.value = "sell-upload-items have-item-2";
  //         document.querySelector(".sell-upload-drop-box.have-item-1").classList.value = "sell-upload-drop-box have-item-2";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-2 ul").trigger("create");
  //       }else if(files_array.length==3){
  //         document.querySelector(".sell-upload-items.have-item-2").classList.value = "sell-upload-items have-item-3";
  //         document.querySelector(".sell-upload-drop-box.have-item-2").classList.value = "sell-upload-drop-box have-item-3";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-3 ul").trigger("create");
  //       }else if(files_array.length==4){
  //         document.querySelector(".sell-upload-items.have-item-3").classList.value = "sell-upload-items have-item-4";
  //         document.querySelector(".sell-upload-drop-box.have-item-3").classList.value = "sell-upload-drop-box have-item-4";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-4 ul").trigger("create");
  //       }else if(files_array.length==5){
  //         document.querySelector(".sell-upload-items.have-item-4").classList.value = "sell-upload-items have-item-5";
  //         document.querySelector(".sell-upload-drop-box.have-item-4").classList.value = "sell-upload-drop-box have-item-0";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-5 ul").trigger("create");
  //         //画像表示枠追加(5-6個用)
  //         $(buildbox()).appendTo(".sell-upload-products-container");
  //       }else if(files_array.length==6){
  //         document.querySelector(".sell-upload-items.have-item-0").classList.value = "sell-upload-items have-item-1";
  //         document.querySelector(".sell-upload-drop-box.have-item-0").classList.value = "sell-upload-drop-box have-item-1";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-1 ul").trigger("create");
  //       }else if(files_array.length==7){
  //         document.querySelector(".sell-upload-items.have-item-1").classList.value = "sell-upload-items have-item-2";
  //         document.querySelector(".sell-upload-drop-box.have-item-1").classList.value = "sell-upload-drop-box have-item-2";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-2 ul").trigger("create");
  //       }else if(files_array.length==8){
  //         document.querySelector(".sell-upload-items.have-item-2").classList.value = "sell-upload-items have-item-3";
  //         document.querySelector(".sell-upload-drop-box.have-item-2").classList.value = "sell-upload-drop-box have-item-3";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-3 ul").trigger("create");
  //       }else if(files_array.length==9){
  //         document.querySelector(".sell-upload-items.have-item-3").classList.value = "sell-upload-items have-item-4";
  //         document.querySelector(".sell-upload-drop-box.have-item-3").classList.value = "sell-upload-drop-box have-item-4";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-4 ul").trigger("create");
  //       }else if(files_array.length==10){
  //         //一時的に"have-item-5"を"have-item-10"に変更
  //         document.querySelector(".sell-upload-items.have-item-5").classList.value = "sell-upload-items have-item-10";
  //         document.querySelector(".sell-upload-items.have-item-4").classList.value = "sell-upload-items have-item-5";
  //         document.querySelector(".sell-upload-drop-box.have-item-4").classList.value = "sell-upload-drop-box have-item-0 disabled-upload";
  //         $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-5 ul").trigger("create");
  //         //"have-item-10"を"have-item-5"に戻す
  //         document.querySelector(".sell-upload-items.have-item-10").classList.value = "sell-upload-items have-item-5";
  //       }
  //     };
  //     // ファイルの読み込み実行
  //     fileReader.readAsDataURL(files[i]);
  //   }
  // });

  // 画像削除処理
  $(document).on('click','.sell-upload-products-container a', function(){
    event.preventDefault();
    // index関数を利用して、クリックされたaタグが、div内で何番目のものか特定する。
    var index = $(".sell-upload-products-container a").index(this);
    // クリックされたaタグの順番から、削除すべき画像を特定し、配列から削除する。
    files_array.splice(index - 1, 1);
    // 画像表示枠のクラス名変更
    if(files_array.length==0){
      document.querySelector(".sell-upload-items.have-item-1").classList.value = "sell-upload-items have-item-0";
      document.querySelector(".sell-upload-drop-box.have-item-1").classList.value = "sell-upload-drop-box have-item-0";
    }else if(files_array.length==1){
      document.querySelector(".sell-upload-items.have-item-2").classList.value = "sell-upload-items have-item-1";
      document.querySelector(".sell-upload-drop-box.have-item-2").classList.value = "sell-upload-drop-box have-item-1";
    }else if(files_array.length==2){
      document.querySelector(".sell-upload-items.have-item-3").classList.value = "sell-upload-items have-item-2";
      document.querySelector(".sell-upload-drop-box.have-item-3").classList.value = "sell-upload-drop-box have-item-2";
    }else if(files_array.length==3){
      document.querySelector(".sell-upload-items.have-item-4").classList.value = "sell-upload-items have-item-3";
      document.querySelector(".sell-upload-drop-box.have-item-4").classList.value = "sell-upload-drop-box have-item-3";
    }else if(files_array.length==4){
      document.querySelector(".sell-upload-items.have-item-5").classList.value = "sell-upload-items have-item-4";
      document.querySelector(".sell-upload-drop-box.have-item-5").classList.value = "sell-upload-drop-box have-item-4";
      //画像表示枠削除(5-6個用)
      $(".sell-upload-items.have-item-0").remove();
    }else if(files_array.length==5){
      document.querySelector(".sell-upload-items.have-item-1").classList.value = "sell-upload-items have-item-0";
      document.querySelector(".sell-upload-drop-box.have-item-1").classList.value = "sell-upload-drop-box have-item-0";
    }else if(files_array.length==6){
      document.querySelector(".sell-upload-items.have-item-2").classList.value = "sell-upload-items have-item-1";
      document.querySelector(".sell-upload-drop-box.have-item-2").classList.value = "sell-upload-drop-box have-item-1";
    }else if(files_array.length==7){
      document.querySelector(".sell-upload-items.have-item-3").classList.value = "sell-upload-items have-item-2";
      document.querySelector(".sell-upload-drop-box.have-item-3").classList.value = "sell-upload-drop-box have-item-2";
    }else if(files_array.length==8){
      document.querySelector(".sell-upload-items.have-item-4").classList.value = "sell-upload-items have-item-3";
      document.querySelector(".sell-upload-drop-box.have-item-4").classList.value = "sell-upload-drop-box have-item-3";
    }else if(files_array.length==9){
      document.querySelector(".sell-upload-items.have-item-5").classList.value = "sell-upload-items have-item-4";
      document.querySelector(".sell-upload-drop-box.have-item-5").classList.value = "sell-upload-drop-box have-item-4";
    }

    // クリックされたaタグが含まれるli要素をHTMLから削除する。
    $(this).parent().parent().remove();


//[一時中断]削除機能は一時中断。画像を削除した場合に1-5個の枠、6-10個の枠それぞれの中で削除されるだけで跨いでの連携ができていない。

    // ******配列を再読み込みして画像を再表示する******
    // if(files_array.length <= 5){
    //   var add_space1 = ".sell-upload-items.have-item-" + files_array.length + " ul";
    // }else if(files_array.length > 5){
    //   var add_space1 = ".sell-upload-items.have-item-5 ul";
    //   var add_space2 = ".sell-upload-items.have-item-" + (files_array.length-5) + " ul";
    // }

    // for (var i = 1; i < files_array.length; ++i){
    //   console.log(i);
    //   console.log(files_array.length);
    //   console.log("add_space1="+add_space1);
    //   if(i <= 5){
    //     $(buildImage(loadedImageUri,)).appendTo(add_space1).trigger("create");
    //   }else if(i > 5){
    //     $(buildImage(loadedImageUri,)).appendTo(add_space2).trigger("create");
    //   }
    // }
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
    console.log($("#brand").value);
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

function isEmptyInput (obj){
  (obj.val() == "" || obj.val() == "---") ?  result = true : result = false;
  return result;
}

$(function(){
  $('#new_product').submit(function(){

    /************* 空チェック処理 ************/
    flag = 0;

    //画像チェック用
    // if (isEmptyInput($('#product_name'))) {
    //   builderHTMLType($('#product_name'),$('#imgview') ,'入力してください');
    // }else{$('#product_name_error').remove();}

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
                                <a class="btn-default btn-red" href="./">続けて出品する</a>
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
      return false;
    }
  })
});




