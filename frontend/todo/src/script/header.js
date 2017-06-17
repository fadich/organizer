;(function HeaderModule(exports) {

    var $selector = $('header');
    var $body = $('body');
    var template = '';

    $body.on('buildApp', function (ev) {
        $.get('template/header', function (response) {
            template = response;
            $body.trigger('buildHeader');
        });
    });

    $body.on('buildHeader', function (ev) {
        $selector.html(template);
    });

    function build() {
        return function () {}
    }

    exports.header = build();

})(typeof window === 'undefined' ? module.exports : window);
