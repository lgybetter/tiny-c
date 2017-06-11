const utils = require('./utils')
const Tiny = require('./tiny')

exports.start = (code) => {
  return new Tiny(utils.split(code)).__progam()
}
