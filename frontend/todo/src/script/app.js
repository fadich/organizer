;(function AppModule() {
    console.log('Building app...');

    var appBuild = setInterval(function () {
        if (modulesReady()) {
            $('body').trigger('buildApp');
            preloader().hide();
            clearInterval(appBuild);
        }
    }, 100);

    var modulesReady = function () {
        if (typeof header === 'undefined') {
            return false;
        }
        if (typeof main === 'undefined') {
            return false;
        }
        if (typeof footer === 'undefined') {
            return false;
        }
        if (typeof preloader === 'undefined') {
            return false;
        }

        return true;
    }
})();