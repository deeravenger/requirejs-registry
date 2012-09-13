About
=====
Plugin "Registry" for RequireJS is wrapper for require.config().

Features
========
You can set config for files and directories.
Interface of "Registry" include get- and set- methods.

How to
======
Add section path to config

```javascript
require.config({
    paths: {
        registry: 'external/require/registry'
    }
});
```

Module by default init with requirejs.config() section (dir or file)

```javascript
requirejs.config({
      config: {
	'testFolder': {
  	    'test': 12345
         }
      }
});
```

And in module (/testFolder/init.js) you can write

```javascript
define( [ 'registry!.' ], function( registry ) {
    function init() {
        registry.set( 'abc', 111 );
        console.log( registry.get( 'abc' ) );
        
        // From requirejs.config()
        console.log( registry.get( 'test' ) );
    };

    return {
        init: init
    };
});
```

You can use other path, for example, [ 'registry!./otherPath/trtr' ] for access to config of other module.

Callbacks
=======
You can set callback function for Get- and Set- method for any var.

Use registry.clb( varName, type, func ) method.

```javascript
define( [ 'registry!.' ], function( registry ) {
    function init() {
        registry.set( 'test', 'param' );

        registry.clb( 'test', 'get', function( name, value ) {
            console.log( 'Getting var '+name+' with value ' + value );
        } );
        registry.clb( 'test', 'set', function( name, oldVal, newVal ) {
            console.log( 'Replace var '+name+' with val ' + oldVal + ' next val ' + newVal );
        } );

        registry.get( 'test' );       // output in console "Getting var test with val param"
        registry.set( 'test', 321 );  // Output in console "Replace var test with val param next val 321 "
    };

    return {
        init: init
    };
});
```
