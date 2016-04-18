var NwBuilder = require('nw-builder');
var join = require('path').join;
var argv = process.argv.slice(2);

var platforms = ['win', 'osx', 'linux'];
var buildDir = './build/release';
var cacheDir = './build/.nw-cache';

if ( argv.indexOf('-p') !== -1 ) {
  platforms = argv[argv.indexOf('-p') + 1].slice(',');
}

if ( argv.indexOf('-b') !== -1 ) {
  buildDir = argv[argv.indexOf('-b') + 1];
}

if ( argv.indexOf('-c') !== -1 ) {
  cacheDir = argv[argv.indexOf('-c') + 1];
}

var nw = new NwBuilder({
  version: 'v0.14.1',
  files: join(__dirname, '..', 'app', '**/*'),
  platforms: platforms,
  buildDir: buildDir,
  cacheDir: cacheDir,
  buildType: 'versioned',
  macCredits: join(__dirname, '..', 'build', 'resources', 'credits.html'),
  macIcns: join(__dirname, '..', 'build', 'resources', 'icon.icns'),
  zip: false,
  macPlist: { mac_bundle_id: 'xLayer' },
  winIco: join(__dirname, '..', 'build', 'resources', 'icon.ico')
});

nw.build().catch(function(err){
  console.error(err.message ? err.message : err);
});
