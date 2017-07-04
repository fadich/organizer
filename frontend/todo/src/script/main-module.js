;(function MainModule(exports) {
    "use strict";


    var $selector = $('main');
    var $doc = $(document);
    var template = '';
    var socket = io();

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
        var $submit = $('#item-submit');
        var $formGroup = $form.find('.form-group');
        var $formHide = $form.find('#todo-item-form-hide');
        var $fieldId = $form.find('#item-id');
        var $fieldTitle = $form.find('#item-title');
        var $fieldBody = $form.find('#item-body');

        $form.submit(function (ev) {
            var hidden = $formGroup.css('display') === 'none';

            ev.preventDefault();

            if (hidden) {
                $formGroup.slideDown();
                $form.trigger('keyup');

                return;
            }

            var item = getForm();
            _rPreloader().show();

            saveItem(item);
        });

        $formHide.click(function () {
            $formGroup.slideUp();
            $submit.removeAttr('disabled')
        });

        $form.on('keyup', function (ev) {
            var form = getForm();

            if (form.title.length >= 3 && form.body.length >= 3) {
                $submit.removeAttr('disabled')
            } else {
                $submit.attr('disabled', 'disabled');
            }
        });

        function getForm() {
            var id = $fieldId.val();
            var title = $fieldTitle.val();
            var body = $fieldBody.val();

            return {
                id: id,
                title: title,
                body: body
            };
        }

        function saveItem(item) {
            if (item.id) {
                updateItem(item);

                return;
            }

            createItem(item);
        }

        function updateItem() {
            // TODO: Update item.
            return false;
        }

        function createItem(item) {
            socket.emit('new-item', {
                item: item
            });
        }
    }

    socket.on('new-item', function (item) {
        // (function () {
            _rApp().build();
        // })();

        _rPreloader().hide();
    });

    exports._rMain = function () {
        return (function () {
            return {
                build: build
            };
        })();
    };

})(typeof window === 'undefined' ? module.exports : window);
