;(function AppModule() {
    console.log('Building app...');

    var appBuild = setInterval(function () {
        if (modulesReady()) {
            $('body').trigger('buildApp');
            clearInterval(appBuild);
        }
    }, 100);

    var modulesReady = function () {
        if (typeof header === 'undefined') {
            return false;
        }

        return true;
    }
})();