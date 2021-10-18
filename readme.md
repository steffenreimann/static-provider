# Module Provider

With this module you can use npm installed modules like bootstrap on your website on an very Simple way. 

```batch 
npm install moduleprovider
```

### Init Module in you node File

```js
async function start(params) {
    var express = require('express');
    var app = express();
    var httpServer = require('http').createServer(app);

    var mp = require('ModuleProvider');

	var ModuleProvider = new mp.Provider(app, express);

	await ModuleProvider.init();
	console.log('isPackageInstalled = ', ModuleProvider.isPackageInstalled({ module: 'bootstrap' }));
	console.log('isPackageInstalled = ', ModuleProvider.isPackageInstalled({ module: 'jquery' }));
	ModuleProvider.addPackage({ module: 'bootstrap', path: '/dist', requestPath: '/bootstrap' });
	ModuleProvider.addPackage({ module: 'jquery', path: '/dist' });
}
```


### Request Files in HTML File 

```html
<link rel="stylesheet" href="/bootstrap/css/bootstrap.css">
<script type="text/javascript" src="/jquery.slim.js"></script>
<script type="text/javascript" src="/bootstrap/js/bootstrap.bundle.js"></script>
```