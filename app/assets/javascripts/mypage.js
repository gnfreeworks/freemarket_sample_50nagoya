$(function() {
  /*クリックイベント*/
  $('.tab-pane').on('click', function() {
    $('.tab_item').removeClass("is-active-item");
    $($(this).attr("href")).addClass("is-active-item");
    $('.tab_btn').removeClass('is-active-btn');
    $(this).addClass('is-active-btn');
  });
});
