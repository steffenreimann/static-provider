const fs = require('fs-extra');
var path = require('path');
var { spawn, exec, execSync } = require('child_process');

/**
 * # Module Provider for Express or other
 * 
 * With this module you can use npm installed modules like bootstrap in your website. 
 *
 *     
 *
 */

/**
* @var globalModulesPath 
* @type {String}
* @description Holds the path to the global modules directory
*/
var globalModulesPath = null;

/**
* @var express 
* @type {Object}
* @description Holds Express Object
*/
var express = null;

/**
* @var app 
* @type {Object}
* @description Holds app Object
*/
var app = null;

/**
* @var modules 
* @type {Array}
* @description Holds all modules
*/
var modules = [];

class Provider {
	/**
    * @constructor 
    * @param {Object} a app
    * @param {Object} e express
    * @method init() - Init Global Module Path
    * @method isPackageInstalled() - get if package is installed
    * @method addPackage() - add package to modules
    * @example var DataStore = new fm.File({ appname: 'easy-nodejs-app-settings-example', file: 'DataStore.json', interval: 5000, data: {}, doLogging: false })
    */
	constructor(a, e) {
		express = e;
		app = a;
		//update = u;
	}

	async init() {
		await getNPMGlobalDir();
	}
	getVersion(name) {
		var version = execSync(`npm view ${name} version `);
		return version.toString().replace('\n', '');
	}
	getVersions(name) {
		var version = execSync(`npm view ${name} versions `);
		return version.toString().replace('\n', '');
	}
	getCurrentPackageVersion(name) {
		var version = execSync(`npm list ${name}`);
		return version.toString().replace('\n', '');
	}
	/** 
    * @method isPackageInstalled
    * @description Check if package is installed
    */
	isPackageInstalled(item) {
		return isPackageInstalled(item);
	}
	install(name, version, global) {
		installModule(name, version, global);
		return;
	}
	/** 
    * @method addPackage
    * @description Add package to modules
    */
	addPackage(item) {
		addModule(item);
	}
}

async function getNPMGlobalDir() {
	return new Promise((resolve, reject) => {
		//console.log('NPM Init');
		exec('npm root -g', (err, stdout, stderr) => {
			//console.log('NPM Init Finnished');
			if (err) {
				//console.log('No Global Modules Dir Found');
			} else {
				//console.log('Global Module Path is = ', stdout);
				globalModulesPath = stdout.toString().replace('\n', '');
			}
			resolve(globalModulesPath);
		});
	});
}

function addModule(item) {
	var res = isPackageInstalled(item);
	if (res.isInstalled) {
		//console.log('Add Module to Express Static = ', res);
		//console.log(res.localPath || res.globalPath);
		try {
			app.use(item.requestPath || '/', express.static(res.localPath || res.globalPath));
			console.log('Module Init ', res);
			modules.push(res);
		} catch (error) {
			console.log('Error = ', error);
		}
	} else {
		console.log('Module not found ', item.module);
	}
}

function installModule(name, version, global) {
	return new Promise((resolve, reject) => {
		var vers = version || 'latest';
		var glob = global || false;
		execSync(`npm install ${glob} ${name}@${vers}`);
		resolve();
	});
}

function isPackageInstalled(item) {
	item.isGlobalInstalled = false;
	item.isLocalInstalled = false;
	item.isInstalled = false;
	item.localPath = null;
	item.globalPath = null;

	try {
		var modulePath = path.dirname(require.resolve(item.module + '/package.json'));
		item.localPath = path.join(modulePath, item.path || '');
		item.isInstalled = true;
		item.isLocalInstalled = true;
	} catch (error) {}

	try {
		var aPath = path.join(globalModulesPath, item.module);

		if (fs.existsSync(aPath)) {
			item.globalPath = path.join(aPath, item.path || '');
			item.isInstalled = true;
			item.isGlobalInstalled = true;
		} else {
			//item.isInstalled = false;
		}
	} catch (error) {}
	return item;
}

module.exports = {
	Provider,
	modules,
	globalModulesPath
};
