const utils = require('./utils')
const Tiny = require('./tiny')

let code = `a := 2; c := 3;`

exports.start = (code) => {
  return new Tiny(utils.split(code)).__progam()
}
