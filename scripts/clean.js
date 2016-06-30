'use strict'

const { define } = require('./utils/cli')
const { remove } = require('./utils/fs')

define(task => {

  task('default', () => {
    task('dist')
    task('app')
  })

  task('app', () => {
    remove('assets/js/xlayer.js')
    remove('assets/js/xlayer.js.map')
  })

  task('dist', () => {
    remove('build')
  })

})
