'use strict'

require('nwjs-builder')
  .commands.nwbuild('assets', {
    version: require('../package.json').engines.nwjs,
    platforms: 'win32,win64,osx64,linux32,linux64',
    outputDir:'build',
    outputFormat: 'DIR',
    withFFmpeg: true,
    sideBySide: true,
    winIco: 'assets/images/icon.ico',
    macIcns: 'assets/images/icon.icns'
  })
