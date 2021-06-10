$(document).ready(function(){
  $('.slider').slick({
  	speed: 500,
  	arrows: false,
  	dots: true,
  });
});

$(document).ready(function() {
  $('.menu-opener').on('click', function(e) { 
    e.preventDefault();
    $('body').toggleClass('burger') 
  })
})
