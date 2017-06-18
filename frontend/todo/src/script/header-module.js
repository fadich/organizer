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
        var isDisabled = function (statuses) {
            if (!_rItemListService().count.apply(null, arguments)) {
                return "r-disabled";
            }

            return "";
        };

        _rBaseComponent().render($selector, template, {
            all: _rItemListService().count(4, 3, 2),
            active: _rItemListService().count(4),
            postponed: _rItemListService().count(3),
            done: _rItemListService().count(2),
            disabledAll: isDisabled(2, 3, 4),
            disabledActive: isDisabled(4),
            disabledPostponed: isDisabled(3),
            disabledDone: isDisabled(2)
        });
    });

    function build() {
        $doc.trigger('buildHeader');
    }

    exports._rHeader = function () {
        return (function () {
            return {
                build: build
            };
        })();
    };

})(typeof window === 'undefined' ? module.exports : window);
