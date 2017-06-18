;(function BaseModule(exports) {
    "use strict";


    var baseComponent = {
        render: function (selector, template, bindValues) {
            for (var value in bindValues) {
                template = template.replace('::' + value, bindValues[value]);
            }

            selector.html(template);
        }
    };

    exports._rBaseComponent = function () {
        return (function () {
            return baseComponent
        })();
    };

})(typeof window === 'undefined' ? module.export : window);