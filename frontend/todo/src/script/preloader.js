;(function PreloaderModule(exports) {

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

    exports.preloader = behaviours();

})(typeof window === 'undefined' ? module.exports : window);
