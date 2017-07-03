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

        formHandling();
    });

    $doc.on('buildList', function (ev) {
        var $list = $('#todo-list-group');
        var items = _rItemListService().getItems();
        var template = '';
        var itemTemplate = '';

        // Request item list form.
        $.ajax({
            type: 'GET',
            url: 'template/item-list-form',
            async: false,
            success : function(response) {
                template += _rBaseComponent().bindValues(response);
            }
        });

        $.ajax({
            type: 'GET',
            url: 'template/item-list',
            async: false,
            success: function (response) {
                itemTemplate = response;
            }
        });

        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            if (item.status > 1) {
                template += _rBaseComponent().bindValues(itemTemplate, {
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    statusClass: item.getStatusClass(),
                    textClass: item.getTextClass(),
                    options: item.getOptions()
                });
            }
        }

        _rBaseComponent().render($list, template);
        $doc.trigger('buildListForm');
    });

    function build() {

    }

    function formHandling() {
        var $form = $('#todo-item-form');
        var $submit = $('#new-item-submit');
        var $formGroup = $form.find('.form-group');
        var $formHide = $form.find('#todo-item-form-hide');

        $form.submit(function (ev) {

            ev.preventDefault();
        });

        $submit.on('click', function (ev) {
            var hidden = $formGroup.attr('hidden') === 'hidden';

            if (!hidden) {

                return;
            }

            $formGroup.slideDown();
        });

        $formHide.click(function () {
            $formGroup.slideUp();
        });
    }

    exports._rMain = function () {
        return (function () {
            return {
                build: build
            };
        })();
    };

})(typeof window === 'undefined' ? module.exports : window);
