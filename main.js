/**
 * @license RequireRegistry 0.3 Copyright (c) 2012, Dmitry Kuznetsov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * @see https://github.com/dmkuznetsov/requirejs-registry
 */

define( 'registry', [], function() {
    "use strict";
    var repository = {}, callbacks = {};

    return {
        load: function ( name, req, load, config ) {
            var namespace = name.replace( /\//g, '_' );
            name = name.replace( /\/+$/, '' );

            if ( repository[ namespace ] == undefined ) {
                repository[ namespace ] = {};
                callbacks[ namespace ] = {};
                if ( config.config != undefined && config.config[ name ] != undefined ) {
                    repository[ namespace ] = config.config[ name ];
                };
            };

            var instance = {
                'version': '0.3'
                , 'namespace': namespace
                , 'get': function( name ) {
                    if ( repository[ this.namespace ][ name ] !== undefined &&
                            callbacks[ this.namespace ][ name ] !== undefined &&
                            callbacks[ this.namespace ][ name ][ 'get' ] !== undefined ) {
                        (callbacks[ this.namespace ][ name ][ 'get' ])( name, repository[ this.namespace ][ name ] );
                    };
                    return repository[ this.namespace ][ name ];
                }
                , 'set': function( name, value ) {
                    if ( callbacks[ this.namespace ][ name ] === undefined ) {
                        callbacks[ this.namespace ][ name ] = {};
                    };
                    if ( callbacks[ this.namespace ][ name ][ 'set' ] !== undefined ) {
                        (callbacks[ this.namespace ][ name ][ 'set' ])( name, repository[ this.namespace ][ name ], value );
                    };
                    return repository[ this.namespace ][ name ] = value;
                }
                , 'clb': function( name, event, clbFunc ) {
                    event = event.toLowerCase();
                    if ( repository[ this.namespace ][ name ] === undefined ) {
                        throw new Error( 'Undefined variable '+ name + '!' );
                    } else {
                        if ( 'get' != event && 'set' != event ) {
                            throw new Error( 'Unknown event type! Use "get" or "set".' );
                        };
                        if ( !( clbFunc instanceof Function ) ) {
                            throw new Error( 'Use only function(){} statement!' );
                        };
                        if ( callbacks[ this.namespace ][ name ] === undefined ) {
                            callbacks[ this.namespace ][ name ] = {};
                        };
                        callbacks[ this.namespace ][ name ][ event ] = clbFunc;
                    };
                }
            };
            load( instance );
        }
    };
});