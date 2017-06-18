;(function PreloaderModule(exports) {
    "use strict";


    var $selector = $('preloader');

    function behaviours() {
        var shows = 0;
        var handle = function () {
            if (shows) {
                $selector.show();
            } else {
                $selector.hide();
            }
        };

        return function () {
            return {
                show: function () {
                    shows++;
                    handle();
                },
                hide: function () {
                    if (shows > 0) {
                        shows--;
                    }
                    handle();
                }
            };
        }
    }

    exports._rPreloader = behaviours();

})(typeof window === 'undefined' ? module.exports : window);
