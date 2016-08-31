$(document).ready(function(){
	//click on menu
	var menuClick = function(id) {
		id.click(function() {
			//click to see menu add class
			$(this).toggleClass('active');
    		$('.overlay').animate({width: 'toggle'}, 500);
		
		});
	}
	menuClick($('.menu-emplacement'));
});
