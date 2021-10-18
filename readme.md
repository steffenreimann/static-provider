# Static Provider

With this module you can use npm installed modules like bootstrap on your website on an very Simple way. 

```batch 
npm install static-provider
```

### Init Module in you node File

```js
async function start(params) {
    var express = require('express');
    var app = express();
    var httpServer = require('http').createServer(app);

    var sp = require('static-provider');

	var staticprovider = new sp.Provider(app, express);

	await staticprovider.init();
	console.log('isPackageInstalled = ', staticprovider.isPackageInstalled({ module: 'bootstrap' }));
	console.log('isPackageInstalled = ', staticprovider.isPackageInstalled({ module: 'jquery' }));
	staticprovider.addPackage({ module: 'bootstrap', path: '/dist', requestPath: '/bootstrap' });
	staticprovider.addPackage({ module: 'jquery', path: '/dist' });
}
```


### Request Files in HTML File 

```html
<link rel="stylesheet" href="/bootstrap/css/bootstrap.css">
<script type="text/javascript" src="/jquery.slim.js"></script>
<script type="text/javascript" src="/bootstrap/js/bootstrap.bundle.js"></script>
```