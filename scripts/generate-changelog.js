var conventionalChangelog = require('conventional-changelog');
var fs = require('fs');
var join = require('path').join;

var file = join(process.cwd(), 'CHANGELOG.md');

conventionalChangelog({
  //preset: 'angular',
  releaseCount: 1
})
.pipe(fs.createWriteStream(file));
