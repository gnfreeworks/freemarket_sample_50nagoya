window.addEventListener("DOMContentLoaded", function() {
  let tabs = document.getElementsByClassName("tab_item");
  tabsAry = Array.prototype.slice.call(tabs);

  let transtabs = document.getElementsByClassName("transaction_tab");
  transtabsAry = Array.prototype.slice.call(transtabs);

  tabsAry.forEach(function(value){
    value.addEventListener('click', function(e){
      //デフォルトアクション無効化
      e.preventDefault();

      //選択されたタブ以外を非表示: active, show class削除
      document.getElementsByClassName("active")[0].classList.remove("active");
      document.getElementsByClassName("mypage-item-list")[0].classList.remove("show");
      
      //選択されたタブを表示:active, show class追加
      const index = tabsAry.indexOf(this);
      console.log(index);
      console.log(document.getElementsByClassName("mypage-item-list")[index].classList);
      document.getElementsByClassName("tab_item")[index].classList.add("active");
      document.getElementsByClassName("mypage-item-list")[index].classList.add("show");

      // タブ切り替えにより未読数を表示/非表示
      if (index == 0) {
        document.getElementsByClassName("mypage-nav-number")[0].classList.remove("hidden-large");
      }else{
        document.getElementsByClassName("mypage-nav-number")[0].classList.add("hidden-large");
      }
    });
  });

  transtabsAry.forEach(function(value){
    value.addEventListener('click', function(e){
      //デフォルトアクション無効化
      e.preventDefault();

      //選択されたタブ以外を非表示: active, show class削除
      document.getElementsByClassName("active")[1].classList.remove("active");
      document.getElementsByClassName("show")[1].classList.remove("show");
      
      // //選択されたタブを表示:active, show class追加
      const index = transtabsAry.indexOf(this);
      console.log(index);
      console.log(document.getElementsByClassName("transaction-list")[index].classList);
      document.getElementsByClassName("transaction_tab")[index].classList.add("active");
      document.getElementsByClassName("transaction-list")[index].classList.add("show");

    });
  });
});