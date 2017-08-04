;(function listItemService(exports) {
    "use strict";


    var $doc = $(document);

    $doc.on('rebuild', function () {
        var items = [];
        var counted = [];
        var ready = false;
        var options = [];

        (function optionsTemplate() {
            var urls = {
                4: 'template/item-options-active',
                3: 'template/item-options-postponed',
                2: 'template/item-options-done'
            };

            for (status in urls) {
                $.ajax({
                    type: 'GET',
                    url: urls[status],
                    async: false,
                    success : function(response) {
                        options[status] = response;
                    }
                });
            }
        })();

        function Item() {
            this.id = 0;
            this.title = '';
            this.content = '';
            this.status = 4;
            this.userId = 0;
            this.createdAt = getTime();
            this.updatedAt = getTime();

            function getTime() {
                return Math.floor(Date.now() / 1000);
            }

            this.getStatusClass = function () {
                switch (this.status) {
                    case 4:
                        return 'r-item-active';
                    case 3:
                        return 'r-item-postponed';
                    case 2:
                        return 'r-item-done';
                    case 1:
                        return 'r-item-deleted';
                }

                return '';
            };

            this.getTextClass = function () {
                switch (this.status) {
                    case 4:
                        return '';
                    case 3:
                        return 'r-text-italic';
                    case 2:
                        return 'r-text-strike';
                    case 1:
                        return '';
                }

                return '';
            };

            this.getOptions = function () {
                return options[this.status];
            };
        }

        Item.addItem = function (data, index) {
            var item = new Item();

            for (var prop in data) {
                item[prop] = data[prop];
            }

            if (index) {
                items[index] = item;
            } else {
                items.push(item);
            }

            return item;
        };

        Item.findItem = function (id) {
            for (var i = items.length - 1; i >= 0; i--) {
                var item = items[i];

                if (+item.id === +id) {
                    return item;
                }
            }

            return false;
        };

        Item.deleteItem = function (id) {
            var item = Item.findItem(id);

            item.status = 1;

            return item;
        };

        function count() {
            counted = [];

            for (var i = items.length - 1; i >= 0; i--) {
                var status = items[i].status;

                counted[status] = counted[status] !== undefined ? counted[status] + 1 : 1;
            }
        }

        var getItemsInterval = setInterval(function () {
            initService();

            clearInterval(getItemsInterval);
        }, 100);

        function initService() {
            $.get(_rConfigService().getAPIUrl(), function (data) {

                for (var i = data.items.length - 1; i >= 0; i--) {
                    var dataItem = data.items[i];
                    Item.addItem(dataItem);
                }

                count();
                _rConfigService().setToken(data.token);

                ready = true;
            });

            var expInterval = setInterval(function () {
                if (!ready) {
                    return;
                }

                exports._rItemListService = function () {
                    return (function () {
                        return {
                            getItems: function () {
                                return items;
                            },
                            getItem: function (itemId) {
                                return Item.findItem(itemId);
                            },
                            newItem: function (item) {
                                var item = Item.addItem(item);
                                count();

                                return item;
                            },
                            editItem: function (item) {
                                var editing = Item.findItem(item.id);

                                if (editing) {
                                    var item = Item.addItem(item, items.indexOf(editing));
                                    count();

                                    return item;
                                }

                                return false;
                            },
                            deleteItem: function (itemId) {
                                var item = Item.deleteItem(itemId);
                                count();

                                return item;

                            },
                            count: (function () {
                                return function (status /**, status */) {
                                    var count = 0;

                                    for (var i = arguments.length - 1; i >= 0; i--) {
                                        if (counted[arguments[i]] !== undefined) {
                                            count += counted[arguments[i]];
                                        }
                                    }

                                    return count;
                                }
                            })()
                        }
                    })();
                };

                ready = false;
                clearInterval(expInterval);
            }, 100);
        }
    });

})(typeof window === 'undefined' ? module.export : window);
