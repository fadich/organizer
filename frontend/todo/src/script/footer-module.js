;(function FooterModule(exports) {
    "use strict";


    var $selector = $('footer');
    var $doc = $(document);
    var template = '';

    $doc.on('buildApp', function (ev) {
        $.get('template/footer', function (response) {
            template = response;
            $doc.trigger('buildFooter');
        });
    });

    $doc.on('buildFooter', function (ev) {
        $selector.html(template);
    });

    function build() {

    }

    exports._rFooter = function () {
        return (function () {
            return {
                build: build
            };
        })();
    };

})(typeof window === 'undefined' ? module.exports : window);
