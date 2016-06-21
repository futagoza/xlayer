'use strict'

const { lstatSync, statSync, Stats } = require('fs')
const { join, dirname, basename, extname } = require('path')

exports.remove = require('rimraf').sync
exports.join =  join

exports.resolve = ( ...args ) => {
  return join(__dirname, '..', ...args)
}

exports.stat = path => {
  var stats = null
  try {
    stats = lstatSync(path)
    stats.exists = () => true
  }
  catch ( e ) {
    if (e.code != 'ENOENT') throw err
    stats = new Stats
    stats.exists = () => false
  }
  stats.path = path
  stats.dirname = () => dirname(path)
  stats.basename = () => basename(path)
  stats.extname = () => extname(path)
  return stats
}

exports.exists = ( path ) => {
  return exports.stat(path).exists()
}

exports.isFile = ( path ) => {
  return exports.stat(path).isFile()
}
