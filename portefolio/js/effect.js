$(document).ready(function(){

	var menuClick = function(id,link) {
		id.click(function() {
			//click to see menu add class
			$(this).toggleClass('active');
    		$('.overlay').animate({width: 'toggle'}, 500);
			
		});
		link.click(function() {
			//click to see menu add class
			link.removeClass('active');
			var selectLink = $(this).data('title');
			link.each(function() {
				if($(this).data('title') === selectLink) {
					$(this).addClass('active');
				}
				
			});
    
		
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
