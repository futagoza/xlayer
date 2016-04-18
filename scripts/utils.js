var join = require('path').join;
var argv = exports.argv = process.argv.slice(2);

exports.setArgv = function ( args ) {

  if ( !Array.isArray(args) ) throw new TypeError('Expecting an array');

  argv = args;

};

exports.onArg = function ( arg, callback ) {

  if ( Array.isArray(arg) ) {
    return arg.forEach(a => exports.onArg(a, callback));
  }

  var index = argv.indexOf(arg);
  if ( index === -1 ) return;

  callback({ arg, index, next: argv[index + 1] });

};

exports.buildPath = function ( base, path ) {

  if ( arguments.length === 1 ) {
    path = base;
    base = [__dirname, '..'];
  }
  else if ( !Array.isArray(base) ) {
    throw new TypeError('Expecting an array');
  }

  if ( !Array.isArray(path) ) path = path.split('/');

  return join.apply(null, base.concat(path));

};
