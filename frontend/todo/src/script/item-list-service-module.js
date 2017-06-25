;(function listItemService(exports) {
    "use strict";


    var $doc = $(document);

    $doc.on('rebuild', function () {
        var items = [];
        var counted = [];
        var ready = false;

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
        }

        function count() {
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
                    var item = new Item();

                    for (var prop in dataItem) {
                        item[prop] = dataItem[prop];
                    }
                    items.push(item);
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
                            newItem: function () {

                            },
                            editItem: function () {

                            },
                            deleteItem: function () {

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
