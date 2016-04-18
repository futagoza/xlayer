var NwBuilder = require('nw-builder');
var utils = require('./utils');
var buildPath = utils.buildPath;
var onArg = utils.onArg;

var platforms = ['win', 'osx', 'linux'];
var buildDir = './build/release';
var cacheDir = './build/.nw-cache';

onArg('--platform', ( data ) => platforms = [data.next]);
onArg(['-p', '--platforms'], ( data ) => platforms = data.next.slice(','));
onArg(['-b', '--buildDir'], ( data ) => buildDir = data.next);
onArg(['-c', '--cacheDir'], ( data ) => buildDir = data.next);

var nw = new NwBuilder({
  version: 'v0.14.1',
  files: buildPath('app/**/*'),
  platforms: platforms,
  buildDir: buildDir,
  cacheDir: cacheDir,
  buildType: 'versioned',
  macCredits: buildPath('build/resources/credits.html'),
  macIcns: buildPath('build/resources/icon.icns'),
  zip: false,
  macPlist: { mac_bundle_id: 'xLayer' },
  winIco: buildPath('build/resources/icon.ico')
});

nw.build().catch(function(err){
  console.error(err.message ? err.message : err);
});
