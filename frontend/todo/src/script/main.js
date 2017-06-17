;(function MainModule(exports) {

    var $selector = $('main');
    var $body = $('body');
    var template = '';

    $body.on('buildApp', function (ev) {
        $.get('template/main', function (response) {
            template = response;
            $body.trigger('buildMain');
        });
    });

    $body.on('buildMain', function (ev) {
        $selector.html(template);
    });

    function build() {
        return function () {}
    }

    exports.main = build();

})(typeof window === 'undefined' ? module.exports : window);
