/* Swiper */
window.addEventListener('DOMContentLoaded', function() {
  var swiper = new Swiper('.slider-visual__container .swiper-container', {
    loop: true,
    centeredSlides : true,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      reverseDirection: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
}, false);
