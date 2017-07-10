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
                setToken: function (tkn) {
                    if (!token && typeof tkn === 'string') {
                        token = tkn;
                    }
                }
            }
        })();
    };
})(typeof window === 'undefined' ? module.export : window);
