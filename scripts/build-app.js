'use strict'

const { onArg } = require('./utils/cli')
const { isFile, join } = require('./utils/fs')
const { rollup } = require('rollup')
const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')

const PRODUCTION = onArg('PRODUCTION')
const DEBUG_BUILD = !PRODUCTION && onArg('DEBUG')

const resolve = ( path ) => {
  path = join(__dirname, '..', 'src', 'app', path)
  if ( isFile(path) ) return path
}

rollup({
  entry: `bootstrap/${ PRODUCTION ? 'production' : 'development' }.js`,
  plugins: [
    json(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: ["stage-0"],
      compact: PRODUCTION ? true : 'auto',
      minified: PRODUCTION,
      comments: DEBUG_BUILD
    }),
    {
      resolveId ( importee ) {
        if ( /\0/.test(importee) ) return null
        return resolve(importee) || resolve(importee + '.js') || resolve(importee + '/index.js')
      }
    }
  ]
})
.then(bundle => {
  bundle.write({
    sourceMap: DEBUG_BUILD,
    banner: 'if (typeof global === \'undefined\') global = this;',
    dest: 'assets/js/xlayer.js',
    format: 'iife',
    moduleName: 'xlayer'
  })
})
.catch(err => {
  console.log()
  if ( err.file && err.loc ) {
    let loc = err.loc
    console.log(`File: ${ err.file }`)
    console.log(`Location: Line ${ loc.line }, Column ${ loc.column }`)
  }
  console.log(err.stack)
})
