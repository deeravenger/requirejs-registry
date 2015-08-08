About
=====

Plugin "Registry" for RequireJS is wrapper for require.config().

Features
========

You can set config for any files or directories.

Interface of "Registry" include get-, set- and has- methods.

Installation
============

```bash

bower install requirejs-registry
```

How to use
==========

Add section path to config

```javascript

require.config({
    paths: {
        registry: 'vendor/requirejs-registry/main'
    }
});
```

Set config values

```javascript

requirejs.config({
    config: {
        'testFolder': {
            'test': 12345
        }
    }
});
```

And in your module just use "reqistry"

```javascript

define(['registry!.'], function(registry) {
    registry.set('abc', 111);
    console.log(registry.get('abc'));

    // From requirejs.config()
    console.log(registry.get('test'));
});
```

Also, you can use other path, for example, ['registry!./otherPath/moduleName'] for access to config of other module.

