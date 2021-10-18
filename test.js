var mp = require('./index.js');
var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
app.use(express.static(__dirname + '/public'));
httpServer.listen(80);

async function start(params) {
	var ModuleProvider = new mp.Provider(app, express);
	await ModuleProvider.init();
	console.log('isPackageInstalled = ', ModuleProvider.isPackageInstalled({ module: 'bootstrap' }));
	console.log('isPackageInstalled = ', ModuleProvider.isPackageInstalled({ module: 'jquery' }));
	ModuleProvider.addPackage({ module: 'bootstrap', path: '/dist', requestPath: '/bootstrap' });
	ModuleProvider.addPackage({ module: 'jquery', path: '/dist' });
	//console.log(mp.modules);
}

app.get('/', function(req, res) {
	// console.log('app.get / ', req)
	res.sendFile(__dirname + '/public/index.html');
});
start();
