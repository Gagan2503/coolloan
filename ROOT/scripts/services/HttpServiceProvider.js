(function (module) {
    mifosX.services = _.extend(module, {
        HttpServiceProvider: function () {
            var requestInterceptors = {};
            var baseUrl = 'https://localhost:8443';

            this.addRequestInterceptor = function (id, interceptorFn) {
                requestInterceptors[id] = interceptorFn;
            };   

            this.removeRequestInterceptor = function (id) {
                delete requestInterceptors[id];
            };

            this.$get = ['$http', function (http) {
                var HttpService = function (customBaseUrl) {
                    var getConfig = function (config) {
                        return _.reduce(_.values(requestInterceptors), function (c, i) {
                            console.log(c);
                            return c;
                            
                        }, config);
                    };

                    var self = this;
                    _.each(['get', 'delete', 'head'], function (method) {
                        self[method] = function (url) {
                            var config = getConfig({
                                method: method.toUpperCase(),
                                url: customBaseUrl || baseUrl + url 
                            });
                            return http(config);
                        };
                    });
                    _.each(['post', 'put'], function (method) {
                        self[method] = function (url, data) {
                            var config = getConfig({
                                method: method.toUpperCase(),
                                url: customBaseUrl || baseUrl + url,
                                data: data
                            });
                            if (config.headers && config.headers.Authorization) {
                                config.headers.Authorization = "Basic " + 'bWlmb3M6cGFzc3dvcmQ='; // Replace yourAccessToken with the actual access token
                            }
                            console.log(config);
                            return http(config);
                        };
                    });
                    this.setAuthorization = function (key, isOauth) {
                        console.log(key, isOauth);
                        http.defaults.headers.common.Authorization = "Basic " + 'bWlmb3M6cGFzc3dvcmQ=';

                        if (isOauth) {
                            http.defaults.headers.common.Authorization = "Basic " + key;
                        } else {
                            http.defaults.headers.common.Authorization = "Basic " + key;
                        }
                    };

                    this.cancelAuthorization = function () {
                        delete http.defaults.headers.common.Authorization;
                        delete http.defaults.headers.common['Fineract-Platform-TFA-Token'];
                    };

                    this.setTwoFactorAccessToken = function (token) {
                        http.defaults.headers.common['Fineract-Platform-TFA-Token'] = token;
                    };
                };

                return new HttpService();
            }];
        }
    });

    mifosX.ng.services.config(function ($provide) {
        $provide.provider('HttpService', mifosX.services.HttpServiceProvider);
    }).run(function ($log) {
        $log.info("HttpService initialized");
    });
}(mifosX.services || {}));
