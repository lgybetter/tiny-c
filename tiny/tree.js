const utils = require('./utils')
const Node = require('./node')

class Tree {
  constructor (data) {
    this.root = new Node(data)
  }
  
  insert (tree) {
    this.root.next.push(tree)
  }
}

module.exports = Tree