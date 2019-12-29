//fee,profit計算処理
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
        <a href class="sell-upload-edit">編集</a>
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
        // 画像数に応じてclass名変更 & 取得したURLを利用して、ビューにHTMLを挿入
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
  

  
});
