$(document).ready(function(){
  $('.slider-fade').slick({
  	speed: 500,
  	fade: true,
  	arrows: true,
  	dots: true,
  	responsive: [
    {
  		breakpoint: 1024,
  		settings: {
  			arrows: false,
  			dots: true,
  		}
  	}]
  });

  $('.sldr').slick({
  	speed: 500,
  	arrows: true,
  	slidesToShow: 4,
    dots: false,

  	responsive: [
  	{
  		breakpoint: 576,
  		settings: {
  			arrows: false,
        dots: true,
  			slidesToShow: 1
  		}
  	},
  	{
  		breakpoint: 768,
  		settings: {
  			arrows: false,
        dots: true,
  			slidesToShow: 2
  		}
  	},
  	{
  		breakpoint: 1024,
  		settings: {
  			arrows: true,
  			dots: false,
  			slidesToShow: 3
  		}
  	}
  	]
  });
});