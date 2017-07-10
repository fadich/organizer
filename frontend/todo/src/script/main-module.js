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
        listHandling();
    });

    $doc.on('buildList', function (ev) {
        $doc.trigger('buildListForm');
    });

    $doc.on('buildListForm', function (ev) {
        var $list = $('#todo-list-group');
        var listTemplate = '';

        // Request item list form.
        $.ajax({
            type: 'GET',
            url: 'template/item-list-form',
            async: false,
            success : function(response) {
                listTemplate += _rBaseComponent().bindValues(response);
            }
        });

        _rBaseComponent().render($list, listTemplate);
        $doc.trigger('buildListItems');
    });

    $doc.on('buildListItems', function (ev) {
        var $listItems = $('#list-items');
        var listTemplate = "";
        var itemTemplate = '';
        var items = _rItemListService().getItems();

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
                listTemplate += _rBaseComponent().bindValues(itemTemplate, {
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    statusClass: item.getStatusClass(),
                    textClass: item.getTextClass(),
                    options: item.getOptions(),
                    checked: item.status === 2 ? "checked" : ""
                });
            }
        }

        _rBaseComponent().render($listItems, listTemplate);
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
        var $fieldContent = $form.find('#item-body');

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
            $submit.removeAttr('disabled');
        });

        $form.on('keyup', function (ev) {
            var form = getForm();

            if (form.title.length >= 3 && form.content.length >= 3) {
                $submit.removeAttr('disabled');
            } else {
                $submit.attr('disabled', 'disabled');
            }
        });

        function getForm() {
            var id = $fieldId.val();
            var title = $fieldTitle.val();
            var content = $fieldContent.val();

            return {
                id: id,
                title: title,
                content: content
            };
        }

        function resetForm() {
            $fieldId.val('');
            $fieldTitle.val('');
            $fieldContent.val('');
        }

        function saveItem(item) {
            resetForm();
            $formHide.click();

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

    function listHandling() {
        var $deleteButton = $('.r-btn-delete-item');

        $deleteButton.click(function (ev) {
            var $this = $(this);
            var $item = $this.closest('.r-item');
            var itemId = $item.data('id');
            var item = _rItemListService().getItem(itemId);

            if (!item) {
                console.error("Item #" + itemId + " not found.");
                return;
            }

            if (confirm("Delete item \"" + item.title + "\"?")) {
                socket.emit('delete-item', {
                    item: item
                });
            }
        });

        $('.r-new-item-border').hover(function (ev) {
            var $this = $(this);

            $this.removeClass('r-new-item-border');
        });
    }

    function newItemBorder(itemId) {
        var $listItem = $('li[data-id="' + itemId + '"]');
        console.log($listItem);

        $listItem.addClass('r-new-item-border');
    }

    socket.on('new-item', function (res) {
        // (function () {
        // })();

        _rItemListService().newItem(res.item);

        $doc.trigger('buildListItems');
        $doc.trigger('buildHeader');
        newItemBorder(res.item.id);
        listHandling();

        _rPreloader().hide();
    });

    socket.on('delete-item', function (res) {
        _rItemListService().deleteItem(res.item.id);

        $doc.trigger('buildListItems');
        $doc.trigger('buildHeader');
        listHandling();

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
