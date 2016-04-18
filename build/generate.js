"use strict";

const NwBuilder = require('nw-builder');
const join = require('path').join;
const argv = exports.argv = process.argv.slice(2);

function onArg ( args, callback ) {
  args.forEach(arg => {
    let index = argv.indexOf(arg);
    if ( index !== -1 ) {
      callback(argv[++index]);
    }
  });
}

var platforms = ['win', 'osx', 'linux'];
var buildDir = './build/release';
var cacheDir = './build/.nw-cache';

onArg(['--platform'], ( value ) => platforms = value);
onArg(['-p', '--platforms'], ( value ) => platforms = value.slice(','));
onArg(['-b', '--buildDir'], ( value ) => buildDir = value);
onArg(['-c', '--cacheDir'], ( value ) => cacheDir = value);

new NwBuilder({
  version: 'v0.14.1',
  files: [
    join(__dirname, '..', 'app', '*'),
    join(__dirname, '..', 'app', '**', '*')
  ],
  platforms, buildDir, cacheDir,
  buildType: 'versioned',
  macCredits: join(__dirname, 'resources', 'credits.html'),
  macIcns: join(__dirname, 'resources', 'icon.icns'),
  zip: false,
  macPlist: { mac_bundle_id: 'xLayer' },
  winIco: join(__dirname, 'resources', 'icon.ico')
})
.build()
.catch(err => {
  console.error(err.message ? err.message : err);
});
