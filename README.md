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