;(function MainModule(exports) {
    "use strict";


    var $selector = $('main');
    var $doc = $(document);
    var template = '';
    var socket = io();
    var client = Date.now();

    $doc.on('buildApp', function (ev) {
        $.get('template/main', function (response) {
            template = response;
            $doc.trigger('buildMain');
        });
    });

    $doc.on('buildMain', function (ev) {
        $selector.html(template);
        $doc.trigger('buildList');

        newItemEffect();
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
                    checked: +item.status === 2 ? "checked" : ""
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

        function saveItem(item) {
            $doc.trigger('buildListForm');
            formHandling();

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
                item: item,
                client: client
            });
        }
    }

    function listHandling() {
        var $deleteButton = $('.r-btn-delete-item');
        var $postponeButton = $('.r-btn-postpone-item');
        var $restoreButton = $('.r-btn-restore-item');

        $deleteButton.click(function (ev) {
            var $this = $(this);
            var item = getItemInfo($this);

            if (!item) {
                console.error("Item not found.");
                return;
            }

            if (confirm("Delete item \"" + item.title + "\"?")) {
                _rPreloader().show();
                socket.emit('delete-item', {
                    item: item,
                    client: client
                });
            }
        });

        $postponeButton.click(function (ev) {
            var $this = $(this);
            var item = getItemInfo($this);

            if (!item) {
                console.error("Item not found.");
                return;
            }

            _rPreloader().show();
            socket.emit('postpone-item', {
                item: item,
                client: client
            });
        });

        $restoreButton.click(function (ev) {
            var $this = $(this);
            var item = getItemInfo($this);

            if (!item) {
                console.error("Item not found.");
                return;
            }

            _rPreloader().show();
            socket.emit('restore-item', {
                item: item,
                client: client
            });
        });

        $('.r-new-item-border').hover(function (ev) {
            var $this = $(this);
            var itemId = +$this.data('id');
            var lsItems = JSON.parse(localStorage.getItem('r-new-item'));
            var index = lsItems.indexOf(itemId);

            if (index > -1) {
                lsItems.splice(index, 1);
                localStorage.setItem('r-new-item', JSON.stringify(lsItems));
            }


            $this.removeClass('r-new-item-border');
        });

        $('.r-item-checkbox').change(function (ev) {
            var $this = $(this);
            var checked = $this.is(":checked");
            var item = getItemInfo($this);

            if (!item) {
                console.error("Item not found.");
                return;
            }

            if (checked) {
                _rPreloader().show();
                socket.emit('done-item', {
                     item: item,
                     client: client
                });

                return;
            }

            if (confirm('Restore "' + item.title + '"?')) {
                _rPreloader().show();
                socket.emit('restore-item', {
                    item: item,
                    client: client
                });
            } else {
                this.checked = true;
            }
        });

        function getItemInfo(selector) {
            var $item = selector.closest('.r-item');
            var itemId = $item.data('id');
            var item = _rItemListService().getItem(itemId);

            return item;
        }
    }

    function newItemEffect(newItemId) {
        var lsItems = JSON.parse(localStorage.getItem('r-new-item'));
        var items = Array.isArray(lsItems) ? lsItems : [];

        if (items.indexOf(newItemId) === -1) {
            items.push(newItemId);
            localStorage.setItem('r-new-item', JSON.stringify(items));
        }

        for (var num in items) {
            var itemId = items[num];

            if (itemId) {
                $('li[data-id="' + itemId + '"]').addClass('r-new-item-border');
            }
        }
    }

    function updatingItem(res) {
        _rItemListService().editItem(res.item);

        $doc.trigger('buildListItems');
        $doc.trigger('buildHeader');

        if (res.client !== client) {
            newItemEffect(res.item.id);
        }

        listHandling();

        _rPreloader().hide();
    }

    socket.on('new-item', function (res) {
        _rItemListService().newItem(res.item);

        $doc.trigger('buildListItems');
        $doc.trigger('buildHeader');

        if (res.client !== client) {
            newItemEffect(res.item.id);
        }

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

    socket.on('postpone-item', function (res) {
        updatingItem(res);
    });

    socket.on('restore-item', function (res) {
        updatingItem(res);
    });

    socket.on('done-item', function (res) {
        updatingItem(res);
    });

    exports._rMain = function () {
        return (function () {
            return {
                build: build
            };
        })();
    };

})(typeof window === 'undefined' ? module.exports : window);
