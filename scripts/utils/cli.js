'use strict'

const argv = process.argv.slice(2)

exports.onArg = ( args, callback ) => {
  if ( !Array.isArray(args) ) args = [args]
  return argv.some((arg, i) => {
    if ( args.includes(arg) ) {
      if ( callback ) {
        callback.call(global, argv[i + 1])
      }
      return true
    }
  })
}

exports.define = factory => {
  var __default = null
  const _tasks = {}

  function task ( name, ...args ) {
    if ( typeof args[0] === 'function' ) {
      if ( !__default ) __default = name
      _tasks[name] = args[0]
    } else {
      let callback = _tasks[name]
      if ( !callback ) {
        console.error(`\nUnknown task: ${ name }\n`)
        console.log(`Known tasks: ${ Object.keys(_tasks).join(', ') }\n`)
        process.exit(1)
      }
      callback.apply(global, args)
    }
  }

  task.default = ( name ) => {
    __default = name
    if ( arguments.length > 1 ) {
      task(...arguments)
    }
  }

  factory.call(global, task)
  task(argv[0] || __default)
}
