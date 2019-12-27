$(function(){
  $('#price_calc').on('input', function(){
    var data = $('#price_calc').val();
    if ((data >= 300) && (data <= 9999999)){
      // var profit = Math.round(data * 0.9)
      var profit = Math.ceil(data * 90 / 100)
      var fee = (data - profit)
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

