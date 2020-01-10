//---fee,profit計算処理
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


//---ドラッグ&ドロップ処理
$(function(){
  //ドラッグアンドドロップおよび画像読み込み
  // プレビューに挿入するHTMLの作成
  function buildImage(loadedImageUri){
    var html =
    `<li class="sell-upload-item">
      <figure class="sell-upload-figure landscape">
        <img src=${loadedImageUri}>
      </figure>
      <div class="sell-upload-button">
        <a href>削除</a>
      </div>
    </li>`
    return html
  };

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

  // ドロップ時のイベントの作成
  $('.sell-upload-drop-box').on('drop',function(event){
    event.preventDefault();
    // イベントによって得たファイルを配列で取り込む
    files = event.originalEvent.dataTransfer.files;
    // 画像のファイルを一つずつ画像管理用の配列に追加
    for (var i=0; i<files.length; i++) {
      files_array.push(files[i]);
      var fileReader = new FileReader();
      // ファイルが読み込まれた際に行う動作を定義
      fileReader.onload = function( event ) {
        // 画像のurlを取得
        var loadedImageUri = event.target.result;
        // 画像数に応じてclass名変更 & 取得したURLを利用してビューにHTMLを挿入
        if(files_array.length==1){
          document.querySelector(".sell-upload-items.have-item-0").classList.value = "sell-upload-items have-item-1";
          document.querySelector(".sell-upload-drop-box.have-item-0").classList.value = "sell-upload-drop-box have-item-1";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-1 ul").trigger("create");
        }else if(files_array.length==2){
          document.querySelector(".sell-upload-items.have-item-1").classList.value = "sell-upload-items have-item-2";
          document.querySelector(".sell-upload-drop-box.have-item-1").classList.value = "sell-upload-drop-box have-item-2";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-2 ul").trigger("create");
        }else if(files_array.length==3){
          document.querySelector(".sell-upload-items.have-item-2").classList.value = "sell-upload-items have-item-3";
          document.querySelector(".sell-upload-drop-box.have-item-2").classList.value = "sell-upload-drop-box have-item-3";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-3 ul").trigger("create");
        }else if(files_array.length==4){
          document.querySelector(".sell-upload-items.have-item-3").classList.value = "sell-upload-items have-item-4";
          document.querySelector(".sell-upload-drop-box.have-item-3").classList.value = "sell-upload-drop-box have-item-4";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-4 ul").trigger("create");
        }else if(files_array.length==5){
          document.querySelector(".sell-upload-items.have-item-4").classList.value = "sell-upload-items have-item-5";
          document.querySelector(".sell-upload-drop-box.have-item-4").classList.value = "sell-upload-drop-box have-item-0";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-5 ul").trigger("create");
          //画像表示枠追加(5-6個用)
          $(buildbox()).appendTo(".sell-upload-products-container");
        }else if(files_array.length==6){
          document.querySelector(".sell-upload-items.have-item-0").classList.value = "sell-upload-items have-item-1";
          document.querySelector(".sell-upload-drop-box.have-item-0").classList.value = "sell-upload-drop-box have-item-1";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-1 ul").trigger("create");
        }else if(files_array.length==7){
          document.querySelector(".sell-upload-items.have-item-1").classList.value = "sell-upload-items have-item-2";
          document.querySelector(".sell-upload-drop-box.have-item-1").classList.value = "sell-upload-drop-box have-item-2";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-2 ul").trigger("create");
        }else if(files_array.length==8){
          document.querySelector(".sell-upload-items.have-item-2").classList.value = "sell-upload-items have-item-3";
          document.querySelector(".sell-upload-drop-box.have-item-2").classList.value = "sell-upload-drop-box have-item-3";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-3 ul").trigger("create");
        }else if(files_array.length==9){
          document.querySelector(".sell-upload-items.have-item-3").classList.value = "sell-upload-items have-item-4";
          document.querySelector(".sell-upload-drop-box.have-item-3").classList.value = "sell-upload-drop-box have-item-4";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-4 ul").trigger("create");
        }else if(files_array.length==10){
          //一時的に"have-item-5"を"have-item-10"に変更
          document.querySelector(".sell-upload-items.have-item-5").classList.value = "sell-upload-items have-item-10";
          document.querySelector(".sell-upload-items.have-item-4").classList.value = "sell-upload-items have-item-5";
          document.querySelector(".sell-upload-drop-box.have-item-4").classList.value = "sell-upload-drop-box have-item-0 disabled-upload";
          $(buildImage(loadedImageUri,)).appendTo(".sell-upload-items.have-item-5 ul").trigger("create");
          //"have-item-10"を"have-item-5"に戻す
          document.querySelector(".sell-upload-items.have-item-10").classList.value = "sell-upload-items have-item-5";
        }
      };
      // ファイルの読み込み実行
      fileReader.readAsDataURL(files[i]);
    }
  });

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


//---カテゴリ選択処理（３項目）
$(function(){
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category){
    var html = `<option value="${category.name}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成
  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = `<div class='select-wrap' id= 'children_wrapper'>
                        <select class="select-default" id="child_category" name="category_id">
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
                        <select class="select-default" id="grandchild_category" name="category_id">
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


//---サイズカテゴリ選択処理（特定の孫カテゴリに対して表示・非表示）
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
                      </div>`;
    $('.product-detail-category').append(sizeSelectHtml);
  }
  // 孫カテゴリー選択後のイベント
  $('.product-detail-category').on('change', '#grandchild_category', function(){
    var parentId = document.getElementById('parent_category').value; //選択された親カテゴリーのidを取得
    var childId = $('#child_category option:selected').data('category'); //選択された子カテゴリーのidを取得
    var grandchildId = $('#grandchild_category option:selected').data('category'); //選択された孫カテゴリーのidを取得
    console.log(parentId);
    console.log(childId);
    console.log(grandchildId);
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
});
