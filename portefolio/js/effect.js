$(document).ready(function(){
	var count = 0;
	//height AboutMe
	var heightWindow = function() {
		var sizeHeight= $(window).height();
		$("#about").height(sizeHeight);
	}
	
	var menuClick = function(id,link) {
		id.click(function(event) {
			event.preventDefault();
			//scroll menu
			if(count === 0){
				$('.mask').css('display','block');
				count++;
			}else {
				$('.mask').css('display','none');
				count=0;
			}
			var idScroll = $(this).attr('href');

			//click to see menu add class
			$(this).toggleClass('active');

	
    		$('.overlay').animate({width: 'toggle'}, 500);

			//to scroll on the good content
			    $('html,body').animate({scrollTop:$(this.hash).offset().top}, "slow");

			
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
	heightWindow();

	$( window ).resize(function() {
		heightWindow();
	});
});
