;(function BaseModule(exports) {
    "use strict";


    var baseComponent = {
        render: function (selector, template, bindValues) {
            if (bindValues) {
                template = this.bindValues(template, bindValues);
            }
            selector.html(template);
        },
        bindValues: function (template, values) {
            for (var value in values) {
                // Replace all.
                template = template.split('::' + value).join(values[value]);
            }

            return template;
        }
    };

    exports._rBaseComponent = function () {
        return (function () {
            return baseComponent
        })();
    };

})(typeof window === 'undefined' ? module.export : window);