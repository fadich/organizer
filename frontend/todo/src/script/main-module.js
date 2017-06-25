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
        $doc.trigger('buildList');
    });

    $doc.on('buildList', function (ev) {
        var $list = $('#todo-list-group');
        var items = _rItemListService().getItems();
        var complete = false;
        var template = '<li class="list-group-item" id="todo-list-form"></li>';

        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            $.get('template/item-list', function (response) {
                template += _rBaseComponent().bindValues(response, {
                    content: item.content,
                    title: item.title,
                    statusClass: item.getStatusClass()
                });
                complete = true;
            });
        }

        var completeInt = setInterval(function () {
            if (complete) {
                _rBaseComponent().render($list, template);
                $doc.trigger('buildListForm');
                clearInterval(completeInt);
            }
        }, 100);
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
