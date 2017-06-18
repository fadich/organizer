;(function MainModule(exports) {
    "use strict";


    var $selector = $('main');
    var $doc = $(document);
    var template = '';

    $doc.on('buildApp', function (ev) {
        $.get('template/main', function (response) {
            template = response;
            $doc.trigger('buildMain');
        });
    });

    $doc.on('buildMain', function (ev) {
        $selector.html(template);
    });

    function build() {

    }

    exports._rMain = function () {
        return (function () {
            return {
                build: build
            };
        })();
    };

})(typeof window === 'undefined' ? module.exports : window);
