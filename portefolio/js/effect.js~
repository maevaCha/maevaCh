$(document).ready(function(){
	//click on menu
	var menuClick = function(id,link) {
		id.click(function() {
			//click to see menu add class
			$(this).toggleClass('active');
    		$('.overlay').animate({width: 'toggle'}, 500);
			
		});
		link.click(function() {
			link.removeClass('active');
			$(this).addClass('active');
		
		});
	}
	var langChoose = function(link) {
		link.click(function() {
			if($(this).hasClass('fr')){
				$('.fr').hide();
				$('.engl').show();
			}else {
				$('.engl').hide();
				$('.fr').show();
			}
		});
	}
	langChoose($('.language'));
	menuClick($('.menu-emplacement'),$('.overlay-link'));
});
