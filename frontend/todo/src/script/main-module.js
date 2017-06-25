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
        var template = '';

        // Request item list form.
        $.ajax({
            type: 'GET',
            url: 'template/item-list-form',
            async: false,
            success : function(response) {
                template += _rBaseComponent().bindValues(response, {});
            }
        });

        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            $.ajax({
                type: 'GET',
                url: 'template/item-list',
                async: false,
                success : function(response) {
                    template += _rBaseComponent().bindValues(response, {
                        id: item.id,
                        title: item.title,
                        content: item.content,
                        statusClass: item.getStatusClass(),
                        textClass: item.getTextClass(),
                        options: item.getOptions()
                    });
                }
            });
        }

        _rBaseComponent().render($list, template);
        $doc.trigger('buildListForm');
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
