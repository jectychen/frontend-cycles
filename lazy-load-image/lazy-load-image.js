;(function($) {
    $.fn.imgLazyLoad = function(settings) {
        var self = this,
            $self = $(this),
            defaultSet = {
                threshold : 0,
                onShow : null,
                onError : null
            };

        settings = $.extend({}, defaultSet, settings);

        // main func
        function scrollFunc() {
            Array.prototype.slice.call(self).forEach(function(item) {
                !!imageInView(item) && loadImage(item);
            })
        }

        // can load image or not
        function imageInView(el) {
            var imageRect = el.getBoundingClientRect(),
                winH = window.innerHeight || document.documentElement.clientHeight;

            return imageRect.top >= 0 && imageRect.left >= 0 && (imageRect.top + settings.threshold) <= winH;
        }

        // load image func
        function loadImage(el, fn) {
            var image = new Image(),
                src = el.getAttribute('data-src');

            image.src = src;
            image.onload = function() {
                el.setAttribute('src', src);
                settings.onShow && settings.onShow($(el));
            }
            image.onerror = function() {
                settings.onError && settings.onError($(el));
            }
        }

        scrollFunc();
        addEventListener('scroll', scrollFunc);
    }
}($))
