define(['Q', 'underscore', 'mifosX'], function (Q) {
    var components = {
        models: [
            'models.698122fe'
        ],
        services: [
            'ResourceFactoryProvider',
            'HttpServiceProvider',
            'AuthenticationService',
            'SessionManager',
            'Paginator',
            'UIConfigService',
            'NotificationResponseHeaderProvider'
        ],
        controllers: [
            'controllers.ed5646d7'
        ],
        filters: [
            'filters.382a9b2e'
        ],
        directives: [
            'directives.64ef3aa0'
        ]
    };

    return function() {
        var defer = Q.defer();
        require(_.reduce(_.keys(components), function (list, group) {
            return list.concat(_.map(components[group], function (name) {
                return group + "/" + name;
            }));
        }, [
            'routes-initialTasks-webstorage-configuration.3ef0116d'
        ]), function(){
            defer.resolve();
        });
        return defer.promise;
    }
});
