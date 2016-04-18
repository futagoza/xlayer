var fs = require('fs');
var utils = require('./utils');
var onArg = utils.onArg;

var file = utils.buildPath('app/package.json');
var xlayer = JSON.parse(fs.readFileSync(file));
var semver = xlayer.version.split('.');
var bumped = false;

function bump ( i ) {
  semver[i] = parseInt(semver[i], 10) + 1;
  bumped = true;
}

onArg(['-m', '--major'], ()=> bump(0));
onArg(['-r', '--release', '--minor'], ()=> bump(1));
onArg(['-p', '--patch'], ()=> bump(2));
if ( !bumped ) bump(2);

xlayer.version = semver.join('.');
fs.writeFileSync(file, JSON.stringify(xlayer, null, '  '));

console.log('Bumped version to ' + semver);
