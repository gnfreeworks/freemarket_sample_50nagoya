/* slick スライダー */
$(document).on('ready turbolinks:load', function() {
// $(function(){
  //始めにactionを追加
  $('.owl-dots .owl-dot:first-child').addClass('active');
  $('.owl-dots .owl-dot:first-child').css({'opacity':'1','pointer':'default'});
  //hover時に色変更&activeクラス追加
  $('.owl-dot').hover(function(){
    $('.active').css({'opacity':'','pointer':''})
    $('.active').removeClass('active');
    $(this).addClass('active');
    $(this).css({'opacity':'1','pointer':'default'});
  });

  //スライド
  $('.owl-stage').slick({
    autoplay: false,
    Speed: 1000,
    arrows: false,
    dots: false,
    dotsClass: 'owl-dots',
    pauseOnDotsHover: true,
    infinite: true,
  });

  $('.owl-dot').on('click', function(e){
    var $currTarget = $(e.currentTarget);
    index = $('.owl-dot').index(this);
    slickObj = $('.owl-stage').slick('getSlick');
    slickObj.slickGoTo(index);    // アニメーション中でも切り替える
  });

  $('.owl-dot').on('mouseover', function(e){
    var $currTarget = $(e.currentTarget);
    index = $('.owl-dot').index(this);
    slickObj = $('.owl-stage').slick('getSlick');
    slickObj.slickGoTo(index);    // アニメーション中でも切り替える
  });
  
  //画像が４枚よりも多い場合
  if($('.owl-dot').length > 4) {
    $('.owl-dot').css({'width':'60px','height':'60px'});
  }
  //画像が１枚以下の場合
  if($('.owl-dot').length <= 1) {
    $('.owl-dot').css({'display':'none'});
  }
});
