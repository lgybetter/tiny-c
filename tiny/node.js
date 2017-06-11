const utils = require('./utils')

class Node  {
  constructor (data) {
    this.data = data
    this.next = []
  }
}

module.exports = Node