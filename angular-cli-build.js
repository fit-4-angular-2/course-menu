// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
		polyfills: [
			'vendor/core-js/client/core.js',
			'vendor/systemjs/dist/system.src.js',
			'vendor/zone.js/dist/zone.js'
		],
    vendorNpmFiles: [
			'systemjs/dist/system-polyfills.js',
			'systemjs/dist/system.src.js',
			'zone.js/dist/*.+(js|js.map)',
			'core-js/client/core.js',
			'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'angular2-mdl/**/*',
			'web-animations-js/**/*'
    ]
  });
};
