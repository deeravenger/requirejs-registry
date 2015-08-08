/**
 * @see https://github.com/dmkuznetsov/requirejs-registry
 */
define(function () {
    'use strict';
    var repository = {};

    return {
        load: function (name, req, load, config) {
            var namespace = name.replace(/\//g, '_');
            name = name.replace(/\/+$/, '');

            if (repository[namespace] === undefined) {
                repository[namespace] = {};
                if (config.config !== undefined && config.config[name] !== undefined) {
                    repository[namespace] = config.config[name];
                }
            }

            var instance = {
                'version': '3.0.0',
                'namespace': namespace,
                'all': function () {
                    return repository[this.namespace];
                },
                'get': function (name) {
                    return repository[this.namespace][name];
                },
                'set': function (name, value) {
                    if (name instanceof Object && value === undefined) {
                        for (var i in name) if (name.hasOwnProperty(i)) {
                            repository[this.namespace][i] = name[i];
                        }
                        return true;
                    }
                    repository[this.namespace][name] = value;
                    return repository[this.namespace][name];
                },
                'has': function (name) {
                    return (typeof(repository[this.namespace][name]) != 'undefined');
                }
            };
            load(instance);
        }
    };
});