(function($){


    var position;
    var currentPosition;
$.fn.swipe = function( callback ) {
    var touchDown = false;
    var originalPosition = null;
    var $el = $( this );

    function swipeInfo ( event ) {
        var x;
        var dx;

        if (event.originalEvent.pageX === undefined) {
            x = event.originalEvent.touches[0].pageX;

        } else {
            x = event.originalEvent.pageX;

        }
        dx = ( x > originalPosition.x ) ? "right" : "left";
        return {
            offset: {
                x: x - originalPosition.x
            },
            direction: {
                x: dx
            }
        };
    }

    $el.on( 'touchstart mousedown', function ( event ) {
        event.preventDefault();
        touchDown = true;
        var pageX;
        if (event.originalEvent.pageX === undefined) {
            pageX = event.originalEvent.touches[0].pageX;
        } else {
            pageX = event.originalEvent.pageX;
        }
        originalPosition = {
            x: pageX
        };
    });

    $el.on( 'touchend mouseup mouseleave', function ( event) {
        touchDown = false;
        swipeFlag = false;
        originalPosition = null;
    });

    $el.on( 'touchmove mousemove', function ( event ) {
        if ( !touchDown ) {
            return;
        }
        var info = swipeInfo( event );
        /*      this.position = info.offset.x + this.currentPosition;*/
        callback( info.direction, info.offset );
    });
    var swipeFlag = false;
    return true;
};

//plugin pour le caroussel
    $.fn.oMediaCarousel  = function( __options ){


        //option par défault
        var __defaults =
        {
            speed : 4000,
            autoSlide : true,
            pauseOnHover : false,
            setBullet : false,
            setInfinite : false,
            setArrow: true,


        };

        var __options;
        var param;
        var speed;
        var autoSlide;
        var pauseOnHover;
        var setBullet;
        var infinite;
        var setArrow;


        var slider;
        var widthWrapper;
        var widthSlider;
        var nbItem;
        var positionMax;
        var positionMin;
        var imgHeight;
        var heightContainer;
        var widthSave;
        var count;
        var positionItem;
        var firstItem;
        var lastItem;
        var flag;
        var swipeFlag;
        var clickFlag;
        var flagGlitch;
        var autoInterval;
        var countBullet;
        var setBullet;
        var boucleBullet;
        var wrapper;
        var delay;
        var positionItemResize;
        var flagNavigation;
        var flagNavigationSelected;
        var keyDirection;


        //mode objet pour ciblé le carousel
        return this.each(function(){
            this.init = function() {
                //options
                this.param = $.extend({}, __defaults, __options);
                this.speed = this.param.speed;
                this.autoSlide = this.param.autoSlide;
                this.pauseOnHover = this.param.pauseOnHover;
                this.setBullet = this.param.setBullet;
                this.setInfinite = this.param.setInfinite;
                this.setArrow = this.param.setArrow;
                this.touchEnabled = this.param.touchEnabled;


                this.widthSave = 0;
                this.imgHeight = 0;
                this.heightContainer = 0;
                this.currentPosition = 0;
                this.positionItem = 0;
                this.position = 0;
                this.widthWrapper = 0;
                this.widthSlider = 0;
                this.nbItem = 0;
                this.positionMax = 0;
                this.positionMin = 0;
                this.positionItemResize = 0;
                this.delay = 0.8;
                this.flag = true;
                this.x = 0;
                this.swipeFlag = true;
                this.clickFlag = true;
                this.flagGlitch = true;
                this.flagNavigation = true;
                this.flagNavigationSelected = true;
                this.slider = $(this).find('.slider');
                this.wrapper= $(this).find('.wrapper');
                this.parent= this.wrapper.parent();
                this.firstItem = this.slider.find('.item').first();
                this.lastItem = this.slider.find('.item').last();
                this.setWidthItem();
                this.showArrow("both");
                this.hoverNavigation();

                if (this.setBullet === true) {
                    this.count = 0;
                    this.countBullet = 0;
                    this.boucleBullet = 0;
                    this.bullet();
                }

                this.reponsiveImg();
                this.calcPositionMin();

                if(this.setArrow === true) {
                    this.setArrowSlide();
                }

                this.clickSelect();
                this.setFlag();

                if (this.autoSlide === true) {
                    this.autoInterval();
                }
                if (this.pauseOnHover === true) {
                    this.hoverSlide();
                }
                 this.stickySwipe();
                this.keyNavigation();

                if (this.setInfinite === true) {
                    this.x = 2;
                    this.infinite("init");
                    this.showArrow("both");
                }else {
                    this.showArrow("right");
                }


            };



            /*
             function animate
             */
            this.animateSlider = function(delay, position) {
                this.slider.animate({
                    'left' :  position
                }, delay, 'swing');

            };

            this.infinite = function(direction) {
                //duplicate first and last item
                if (direction === "init") {
                    this.firstItem.before(this.lastItem.clone(true));
                    this.lastItem.after(this.firstItem.clone(true));
                    this.position -= this.widthWrapper;
                    this.setWidthSlider();
                    this.calcPositionMin();

                    this.slider.css({
                        'transition-duration' : '0s',
                        'left' : this.position
                    });

                    //if last item come back to the first
                } else if (direction === "left" && this.position === this.positionMax) {
                    this.position = this.positionMin + this.widthWrapper;
                    this.currentPosition = this.position;

                    this.slider.css({
                        'transition-duration' : '0s',
                        'left' : this.position
                    })
                } else if(direction === "right" && this.position === this.positionMin) {
                    //this.resetTransition();
                    this.position = this.positionMax - this.widthWrapper;
                    this.currentPosition = this.position;

                    this.slider.css({
                        'transition-duration' : '0s',
                        'left' : this.position
                    })
                }
            };

            this.autoInterval = function() {
                var __this = this;
                setInterval(function(){ __this.slideAuto(); }, __this.speed);
            };
            //defilement automatique du caroussel
            this.slideAuto = function() {
                if (this.flag === true && this.flagNavigationSelected === true) {
                    this.slide("right");
                } else {
                    clearInterval(this.autoInterval);
                }
            };
            //pause on hover
            this.hoverSlide = function () {
                var __this = this;
                this.slider.mouseover(function(){
                    if (__this.flag === true && __this.clickFlag === true) {
                        __this.flag = false;

                    }
                });
                this.slider.mouseout(function(){
                    if (__this.flag === false && __this.clickFlag === true && __this.flagNavigation  === true ) {
                        __this.flag = true;
                        __this.flagNavigation = true;
                    }
                });
            };
            //accessibilité navigation clavier
            this.hoverNavigation = function () {
                var __this = this;

                this.slider.mouseover(function(){
                    __this.keyDirection = "both";
                    __this.flagNavigation = false;
                });

                this.slider.mouseout(function(){
                    __this.flagNavigation = true;
                });
                //si focus sur le slider possibilité d'aller a gauche et droite
                this.slider.focus(function(){
                        __this.flagNavigation = false;
                        __this.keyDirection = "both";

                    })
                    .blur(function(){
                        __this.flagNavigation = true;
                    });
                //focus arrow
                $(this).find('.direction.arrow.previous').focus(function(){
                    __this.flagNavigation = false;
                    __this.keyDirection = "left";

                }).blur(function(){
                    __this.flagNavigation = true;
                });
                $(this).find('.direction.arrow.next').focus(function(){
                    __this.flagNavigation = false;
                    __this.keyDirection = "right";

                }).blur(function(){
                    __this.flagNavigation = true;
                });
            };


            this.setWidthItem = function() {
                this.widthWrapper = this.wrapper.width();
                $(this).find('.item').css('width', this.widthWrapper);
                this.setWidthSlider();
            };

            this.setWidthSlider = function() {
                this.nbItem = $(this).find('.item').length;
                this.widthSlider = this.widthWrapper * this.nbItem;
                this.slider.width(this.widthSlider);
            };

            this.calcPositionMin = function() {
                this.positionMin = -(this.widthWrapper * (this.nbItem - 1));
            };

            //verification de la hauteur de l'img
            this.reponsiveImg = function() {
                this.imgHeight = $(this).find('.item-image-container img').height();
                this.heightContainer = $(this).find('.item-image-container').height();
                var __this = this;
                $(this).find('.item-image-container img').each(function(){
                    if (__this.imgHeight <= __this.heightContainer) {
                        //
                        __this.widthSave = $(this).css({'height':'100%', 'width' : 'auto'}).width();
                        $(this).css({'height':'auto', 'width' : '100%'});
                        $(this).css('min-width', __this.widthSave);
                    }
                });
            };

            this.setFlag = function() {
                var __this = this;
                $(this).find('.wrapper, .direction').on( 'touchstart mousedown', function () {
                    __this.flag = false;
                    __this.clickFlag = false;
                    __this.swipeFlag = false;
                });
            };
            this.setArrowSlide = function() {
                $('<div class="arrow-content"><div class="container-main height100"><div class="main-container height100"><div class="direction arrow next icon-arrow-right" tabindex ="0"><a href="javascript:void(0);"></a></div></div></div></div>').appendTo(this.wrapper);
                $('<div class="arrow-content"><div class="container-main height100"><div class="main-container height100"><div class="direction arrow previous icon-arrow-left" tabindex ="0"><a href="javascript:void(0);"></a></div></div></div></div>').prependTo(this.wrapper);
            };

            /*
             * Function : displayArrow
             */
            this.showArrow = function (arrowToShow) {
                if(arrowToShow === "both") {
                    //Cas fleche gauche
                    $(this).find('.direction.arrow.previous, .direction.arrow.next').show();

                }else if( arrowToShow === "right") {
                    $(this).find('.direction.arrow.previous').hide();
                }else if (arrowToShow === "left") {
                    $(this).find('.direction.arrow.next').hide();
                }
            };

            this.slide = function( direction ) {
                this.showArrow("both");
                var __this = this;
                this.slider.css('transition-duration' , '1s');
                if (direction === "right") {
                    this.position -= this.widthWrapper;
                } else {
                    this.position += this.widthWrapper;
                }
                if (this.position >= this.positionMin && direction === "right") {
                    if (this.setInfinite === false && this.flagGlitch === true) { // pour corriger le glitch de la 1ere transition en infinite false
                        this.animateSlider(0, 0);
                        this.flagGlitch = false;
                    }
                    this.animateSlider(this.delay, this.position);
                    this.currentPosition = this.position;
                    if(this.position === this.positionMin){
                        if(this.setInfinite === true) {
                            this.activeBullet("right");
                            this.slider.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
                                __this.infinite("right");
                            });
                        }else {
                            this.showArrow("left");
                        }
                    }

                    this.activeBullet("right");

                } else if (this.position <= this.positionMax && direction === "left") {
                    this.animateSlider(this.delay, this.position);
                    this.currentPosition = this.position;
                    if( this.setBullet === true) {
                        this.activeBullet("left");
                    }
                    if(this.position === this.positionMax){
                        if (this.setInfinite === true) {
                            this.activeBullet("left");
                            this.slider.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
                                __this.infinite("left");
                            });
                        }else {
                            this.showArrow("right");
                        }

                    }
                } else {
                    this.position = this.currentPosition;
                }
            };


            //click arrow || bullet
            this.clickSelect = function() {
                var __this = this;
                $(this).find('.direction').click(function(){

                    if ($(this).hasClass('arrow next')) {
                        __this.slide("right");

                    } else if ($(this).hasClass('arrow previous')) {
                        __this.slide("left");
                    } else {
                        __this.parent.find('li.active').removeClass('active');
                        $(this).addClass('active');
                        __this.clickBullet();
                    }
                });
            };

            //creation des bullets
            this.bullet = function() {
                if (this.nbItem > 1) {
                    $('<ul class="slider-bullet"></ul>').appendTo( $(this) );
                    var __this = this;
                    $(this).find('.item').each(function(){
                        $('<li class="direction" data-number ="' + __this.count +'"></li>').appendTo( $(__this).find('ul.slider-bullet'));
                        __this.count++;
                    });
                    $(this).find('li.direction').first().addClass('active');

                }
            };
            this.clickBullet = function() {
                this.positionItem  = parseInt($(this).find('li.active').attr('data-number'));
                //vers la droite
                var __this = this;
                if (this.positionItem  > this.countBullet) {
                    this.boucleBullet = this.positionItem - this.countBullet ;
                    for (var i = 0; i < this.boucleBullet; i++) {
                        __this.slide("right");
                    }
                }
                //vers la gauche
                else if (this.positionItem  < this.countBullet) {
                    this.boucleBullet =  Math.abs(this.positionItem - this.countBullet);
                    for (var i = 0; i < this.boucleBullet; i++) {
                        __this.slide("left");
                    }
                }
            };

            //.active bullet cliqué
            this.activeBullet = function(direction, positionItem) {
                $(this).find('li.direction.active').removeClass('active');
                if (direction === "right") {
                    this.countBullet++;
                    if (this.countBullet > this.nbItem - this.x) {
                        this.countBullet = 0;
                    }
                    $(this).find('ul').find('[data-number="' + this.countBullet +'"]').addClass('active');
                } else if ( direction === "left" ){
                    this.countBullet--;
                    if (this.countBullet < 0) {
                        this.countBullet = this.nbItem - this.x;
                    }
                    $(this).find('ul').find('[data-number="' + this.countBullet +'"]').addClass('active');
                }
            };
            this.stickySwipe = function() {
                var __this = this;
                if (__this.swipeFlag === true) {
                    $(this).swipe(function( direction, offset ) {
                        var absOffset = Math.abs(offset.x);
                        if ( absOffset < 60) {
                            return;
                        }
                        if (direction.x === "left" && __this.swipeFlag === false && absOffset > 60) {
                            __this.swipeFlag = true;
                            __this.slide( "right" );
                        }
                        if (direction.x === "right" && __this.swipeFlag === false && absOffset > 60) {
                            __this.swipeFlag = true;
                            __this.slide( "left");
                        }
                    });
                }
            };

            this.resize = function() {
                var oldWidthSlider = this.widthSlider;
                this.setWidthItem();
                var ratio = this.widthSlider / oldWidthSlider;
                this.position = (this.position * ratio);
                this.reponsiveImg();

                this.slider.css({
                    'transition-duration' : '0s',
                    'left' : this.position
                });
                this.currentPosition = this.position;
                this.calcPositionMin();
            };

            this.keyNavigation = function() {
                var __this = this;
                $(document).keydown(function(e) {
                    if (__this.flagNavigation === false && __this.keyDirection === "both") {
                        switch(e.which) {

                            case 37: __this.slide("left");
                                __this.flagNavigationSelected = false;
                                break;

                            case 39: __this.slide("right");
                                __this.flagNavigationSelected = false;
                                break;
                        }
                    }else if( __this.flagNavigation === false && __this.keyDirection === "right" || "left") {
                        switch(e.which) {
                            case 13:
                                if(__this.keyDirection === "left") {
                                    console.log("plo");
                                    __this.slide("left");
                                }else if (__this.keyDirection === "right") {
                                    __this.slide("right");
                                }
                                __this.flagNavigationSelected = false;
                                break;
                            default: return;
                        }
                    }
                });
            };

            var resized;
            var __this = this;
            $( window ).resize(function() {
                clearTimeout(resized);
                resized = setTimeout($.proxy(__this.resize, __this), 500);
            });





            this.init();
        });
    };

})(jQuery);
