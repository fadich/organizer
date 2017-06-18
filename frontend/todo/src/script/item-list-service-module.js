;(function listItemService(exports) {
    "use strict";

    var items = [];

    function Item() {
        this.id = 0;
        this.title = '';
        this.content = '';
        this.status = 4;
        this.userId = 0;
        this.createdAt = this.getTime();
        this.updatedAt = this.getTime();

        this.getTime = function () {
            return Math.floor(Date.now() / 1000);
        };
    }

    var getItemsInterval = setInterval(function () {
        initService();

        clearInterval(getItemsInterval);
    }, 100);

    function initService() {
        $.get(_rConfigService().getAPIUrl(), function (data) {

            for (var i = items.length - 1; i >= 0; i--) {
                var dataItem = data.items[i];
                var item = new Item();

                for (var prop in dataItem) {
                    item[prop] = dataItem[prop];
                }
                items.push(item);
            }

            _rConfigService().setToken(data.token);
        });

        exports._rItemListService = function () {
            return (function () {
                return {
                    getItems: function () {

                    },
                    newItem: function () {

                    },
                    editItem: function () {

                    },
                    deleteItem: function () {

                    }
                }
            })();
        };
    }

})(typeof window === 'undefined' ? module.export : window);
