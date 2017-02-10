
(function($) {
    $.fn.oResponsiveImg = function () {

        var imgHeight;
        var heightContainer;
        return this.each(function(){
            this.init = function() {
                this.heightContainer = 0;
                this.reponsiveImg();
            };
            this.reponsiveImg = function () {
                this.imgHeight = $(this).find('.image img').height();
                this.heightContainer = $(this).find('.image').height();
                var __this = this;
                $(this).find('.image img').each(function () {
                    if (__this.imgHeight <= __this.heightContainer) {
                        //
                        __this.widthSave = $(this).css({'height': '100%', 'width': 'auto'}).width();
                        $(this).css({'height': 'auto', 'width': '100%'});
                        $(this).css('min-width', __this.widthSave);
                    }
                });
            };
            this.resize = function() {
                this.reponsiveImg();

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
