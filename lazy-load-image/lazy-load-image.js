// ;(function() {

//     var images = $$('.lazy-image');

//     // 主函数
//     function scrollFunc() {
//         Array.prototype.slice.call(images).forEach(function(item, index) {
//             if(imageInView(item)) {
//                 loadImage(item, function() {
//                     if(item.className.indexOf('fadein') < 0) {
//                         item.className += ' fadein';
//                     }
//                 });
//             }
//         })
//     }

//     // 判断图片是否在可见区域
//     function imageInView(el) {
//         var imageRect = el.getBoundingClientRect(),
//             winH = window.innerHeight || document.documentElement.clientHeight;

//         return imageRect.top >= 0 && imageRect.left >= 0 && imageRect.top <= winH;
//     }

//     // 加载图片
//     function loadImage(el, fn) {
//         var image = new Image(),
//             src = el.getAttribute('data-src');

//         image.src = src;
//         image.onload = function() {
//             el.src = src;
//             fn && fn();
//         }
//     }

//     // 获取元素
//     function $$(cls) {
//         return document.querySelectorAll ? document.querySelectorAll(cls) : (function() {
//             var children = document.body.children,
//                 clsWithoutDot = cls.slice(1),
//                 length = children.length,
//                 collects = [],
//                 i = 0;

//             while(i < length) {
//                 if(children[i].className.indexOf(clsWithoutDot) > 0 ) {
//                     collections.push(children[i]);
//                 }
//                 i++;
//             }

//             return collects;
//         }())
//     };

//     // 事件绑定
//     function addEventListener(evt, fn) {
//       window.addEventListener ? this.addEventListener(evt, fn, false) : (window.attachEvent) ? this.attachEvent('on' + evt, fn) : this['on' + evt] = fn;
//     }

//     scrollFunc();
//     addEventListener('scroll', scrollFunc);

// }())

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

        // 主函数
        function scrollFunc() {
            Array.prototype.slice.call(self).forEach(function(item) {
                !!imageInView(item) && loadImage(item);
            })
        }

        // 判断图片是否在可见区域
        function imageInView(el) {
            var imageRect = el.getBoundingClientRect(),
                winH = window.innerHeight || document.documentElement.clientHeight;

            return imageRect.top >= 0 && imageRect.left >= 0 && (imageRect.top + settings.threshold) <= winH;
        }

        // 加载图片
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
