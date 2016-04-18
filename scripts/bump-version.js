var fs = require('fs');
var join = require('path').join;
var argv = process.argv.slice(2);

var file = join(__dirname, '..', 'app', 'package.json');
var xlayer = JSON.parse(fs.readFileSync(file));
var semver = xlayer.version.split('.');
var bumped = false;

function bump ( i ) {
  semver[i] = parseInt(semver[i], 10) + 1;
  bumped = true;
}

if ( argv.indexOf('-m') !== -1 ) bump(0);

if ( argv.indexOf('-r') !== -1 ) bump(1);

if ( argv.indexOf('-p') !== -1 ) bump(2);

if ( !bumped ) bump(2);

xlayer.version = semver.join('.');
fs.writeFileSync(file, JSON.stringify(xlayer, null, '  '));

console.log('Bumped version to ' + semver);
