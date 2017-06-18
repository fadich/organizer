;(function HeaderModule(exports) {
    "use strict";


    var $selector = $('header');
    var $doc = $(document);
    var template = '';

    $doc.on('buildApp', function (ev) {
        $.get('template/header', function (response) {
            template = response;
            $doc.trigger('buildHeader');
        });
    });

    $doc.on('buildHeader', function (ev) {
        $selector.html(template);
    });

    function build() {
        return function () {}
    }

    exports._rHeader = build();

})(typeof window === 'undefined' ? module.exports : window);
