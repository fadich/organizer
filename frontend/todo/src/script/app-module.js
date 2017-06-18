;(function AppModule(exports) {
    "use strict";


    var $doc = $(document);

    var build = function () {
        if (typeof _rPreloader !== 'undefined') {
            _rPreloader().show();
        }

        var appBuildInterval = setInterval(function () {
            if (modulesReady()) {
                $doc.trigger('buildApp');
                _rPreloader().hide();
                clearInterval(appBuildInterval);
            }
        }, 100);
    };

    var rebuild = function () {
        $doc.trigger('rebuild');
    };

    var modulesReady = function () {
        if (typeof _rBaseComponent === 'undefined') {
            return false;
        }
        if (typeof _rHeader === 'undefined') {
            return false;
        }
        if (typeof _rMain === 'undefined') {
            return false;
        }
        if (typeof _rFooter === 'undefined') {
            return false;
        }
        if (typeof _rPreloader === 'undefined') {
            return false;
        }
        if (typeof _rItemListService === 'undefined') {
            return false;
        }
        if (typeof _rConfigService === 'undefined') {
            return false;
        }

        return true;
    };

    $doc.ready(function () {
        rebuild();
    });

    $doc.on('rebuild', function () {
        build();
    });

    exports._rApp = function () {
        return (function () {
            return {
                build: rebuild
            };
        })();
    };

})(typeof window === 'undefined' ? module.export : window);