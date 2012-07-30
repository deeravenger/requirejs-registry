/**
 * @license RequireRegistry 0.1 Copyright (c) 2012, Dmitry Kuznetsov All Rights Reserved.
 * Available via the MIT or new BSD license.
 */

define( function() {
    "use strict";
    var repository = {};

    return {
        load: function ( name, req, load, config ) {
            var namespace = name.replace( /\//g, '_' );
            name = name.replace( /\/+$/, '' );

            if ( repository[ namespace ] == undefined ) {
                repository[ namespace ] = {};
                if ( config.config[ name ] != undefined ) {
                    repository[ namespace ] = config.config[ name ];
                };
            };

            var instance = {
                'version': '0.1'
                , 'namespace': namespace
                , 'get': function( name ) {
                    if ( !repository[ this.namespace ][ name ] ) {
                        return null;
                    };
                    return repository[ this.namespace ][ name ];
                }
                , 'set': function( name, value ) {
                    return repository[ this.namespace ][ name ] = value;
                }
            };
            load( instance );
        }
    };
});