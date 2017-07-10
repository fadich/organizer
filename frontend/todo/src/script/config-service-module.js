;(function configService(exports) {
    "use strict";


    var token = null;

    exports._rConfigService = function () {
        return (function () {

            return {
                getAPIUrl: function () {
                    return "/get-items/";
                },
                getToken: function () {
                    return token;
                },
                setToken: function (tk) {
                    if (!token && typeof tk === 'string') {
                        token = tk;
                    }
                }
            }
        })();
    };
})(typeof window === 'undefined' ? module.export : window);
