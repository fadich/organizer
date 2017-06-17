;(function FooterModule(exports) {

    var $selector = $('footer');
    var $body = $('body');
    var template = '';

    $body.on('buildApp', function (ev) {
        $.get('template/footer', function (response) {
            template = response;
            $body.trigger('buildFooter');
        });
    });

    $body.on('buildFooter', function (ev) {
        $selector.html(template);
    });

    function build() {
        return function () {}
    }

    exports.footer = build();

})(typeof window === 'undefined' ? module.exports : window);
