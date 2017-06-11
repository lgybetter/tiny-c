const utils = require('./utils')
const Node = require('./node')

class Tiny {

  constructor(tokenArr = []) {
    this.tokenArr = tokenArr
    this.tokenIndex = 0
    this.token = tokenArr[0]
    this.end = false
    this.root = new Node('progam')
    this.text = ''
  }

  __getTree() {
    return this.root
  }

  __priintTree(root, tabCount) {
    this.text += `${root.data}`
    if (root.next.length) {
      this.text += ':'
    }
    root.next.forEach(_tree => {
      this.text += '\n'
      if (_tree.next.length <= 0) {
        if (_tree.data === ';') {
          --tabCount
        }
        for (let i = 0; i < tabCount; i++) {
          this.text += ' '
        }
      }
      for (let i = 0; i < tabCount && _tree.next.length; i++) {
        this.text += ' '
      }
      if (_tree.next.length > 0) {
        ++tabCount
      }
      this.__priintTree(_tree, tabCount)
    })
  }

  __nextToken() {
    if (this.tokenIndex + 1 === this.tokenArr.length) {
      this.token = null
      return
    }
    this.token = this.tokenArr[++this.tokenIndex]
  }

  __match() {
    this.__nextToken()
  }

  __progam() {
    this.root.next.push(this.__stmtSequence())
    this.__priintTree(this.root, 1)
    return this.text
  }

  __stmtSequence() {
    let root = new Node('stmtSequence')
    root.next.push(this.__statement())
    while (this.token === ';') {
      root.next.push(new Node(this.token))
      this.__match()
      if (this.token != null) {
        root.next.push(this.__statement())
      } else {
        return root
      }
    }
  }

  __statement() {
    let root = new Node('statement')
    if (this.token === 'if') {
      root.next.push(this.__ifStmt())
    } else if (this.token === 'repeat') {
      root.next.push(this.__reqeatStmt())
    } else if (utils.isIdentifier(this.token)) {
      root.next.push(this.__assignStmt())
    } else if (this.token === 'read') {
      root.next.push(this.__readStmt())
    } else if (this.token === 'write') {
      root.next.push(this.__writeStmt())
    } else if (this.token === 'while') {
      root.next.push(this.__whileStmt())
    } else if (this.token === 'do') {
      root.next.push(this.__doWhileStmt())
    } else if (this.token === 'for') {
      root.next.push(this.__forStmt())
    } else {
      throw new Error('wrong')
    }
    return root
  }

  __whileStmt() {
    let root = new Node('whileStmt')
    root.next.push(new Node(this.token))
    this.__match()
    root.next.push(this.__exp())
    if (this.token === 'do') {
      root.next.push(new Node(this.token))
      root.next.push(this.__stmtSequence())
      if (this.token === 'endwhile') {
        root.next.push(new Node(this.token))
      } else {
        throw new Error('wrong')
      }
    } else {
      throw new Error('wrong')
    }
    return root
  }

  __doWhileStmt() {
    let root = new Node('doWhileStmt')
    root.next.push(new Node(this.token))
    this.__match()
    root.next.push(this.__stmtSequence())
    if (this.token === 'while') {
      root.next.push(new Node(this.token))
      root.next.push(this.__exp())
    } else {
      throw new Error('wrong')
    }
    return root
  }

  __forStmt() {
    let root = new Node('forStmt')
    root.next.push(new Node(this.token))
    this.__match()
    if (utils.isIdentifier(this.token)) {
      root.next.push(new Node(this.token))
      this.__match()
      if (this.token === ':=') {
        root.next.push(new Node(this.token))
        this.__match()
        root.next.push(this.__simpleExp())
        if (this.token === 'to' || this.token === 'downto') {
          root.next.push(new Node(this.token))
          this.__match()
          root.next.push(this.__simpleExp())
          if (this.token === 'do') {
            root.next.push(new Node(this.token))
            this.__match()
            root.next.push(this.__stmtSequence())
            if (this.token === 'enddo') {
              root.next.push(new Node(this.token))
              this.__match()
            } else {
              throw new Error('wrong')
            }
          } else {
            throw new Error('wrong')
          }
        } else {
          throw new Error('wrong')
        }
      } else {
        throw new Error('wrong')
      }
    } else {
      throw new Error('wrong')
    }
    return root
  }

  __ifStmt() {
    let root = new Node('ifStmt')
    root.next.push(new Node(this.token))
    this.__match()
    root.next.push(this.__exp())
    if (this.token === 'then') {
      root.next.push(new Node(this.token))
      this.__match()
      root.next.push(this.__stmtSequence())
    } else {
      throw new Error('wrong')
    }
    if (this.token === 'else') {
      root.next.push(new Node(this.token))
      this.__match()
      root.next.push(this.__stmtSequence())
    }
    if (this.token === 'end') {
      root.next.push(new Node(this.token))
      this.__match()
    } else {
      throw new Error('wrong')
    }
    return root
  }

  __reqeatStmt() {
    let root = new Node('reqeatStmt')
    root.next.push(new Node(this.token))
    this.__match()
    root.next.push(this.__stmtSequence())
    if (this.token === 'until') {
      root.next.push(new Node(this.token))
      this.__match()
      root.next.push(this.__exp())
    } else {
      throw new Error('wrong')
    }
    return root
  }

  __assignStmt() {
    let root = new Node('assignStmt')
    root.next.push(new Node(this.token))
    this.__match()
    if (this.token === ':=') {
      root.next.push(new Node(this.token))
      this.__match()
      root.next.push(this.__exp())
    } else {
      throw new Error('wrong')
    }
    return root;
  }

  __readStmt() {
    let root = new Node('readStmt')
    root.next.push(new Node(this.token))
    this.__match()
    if (utils.isIdentifier(this.token)) {
      root.next.push(new Node(this.token))
      this.__match()
    } else {
      throw new Error('wrong')
    }
    return root
  }

  __writeStmt() {
    let root = new Node('writeStmt')
    root.next.push(new Node(this.token))
    this.__match()
    root.next.push(this.__exp())
    return root
  }

  __exp() {
    let root = new Node('exp')
    if (this.token === '(' || utils.isNumber(this.token) || utils.isIdentifier(this.token)) {
      root.next.push(this.__simpleExp())
    } else {
      throw new Error('wrong')
    }
    if (this.token === '<' || this.token === '=') {
      root.next.push(this.__comparisonOp())
      root.next.push(this.__simpleExp())
    }
    return root
  }

  __simpleExp() {
    let root = new Node('simpleExp')
    root.next.push(this.__term())
    if (this.token === '+' || this.token === '-') {
      root.next.push(new Node(this.token))
      this.__match()
      root.next.push(this.__term())
    }
    return root;
  }

  __comparisonOp() {
    let root = new Node('comparisonOp')
    root.next.push(this.token)
    this.__match()
    return root
  }


  __term() {
    let root = new Node('term')
    let factorRoot = this.__factor()
    root.next.push(factorRoot)
    while (this.token === '*' || this.token === '/') {
      root.next.push(new Node(this.token))
      this.__match()
      root.next.push(this.__factor())
    }
    return root
  }

  __factor() {
    let root = new Node('factor')
    if (this.token === '(') {
      root.next.push(new Node('('))
      this.__match()
      root.next.push(this.__exp())
      if (this.token === ')') {
        root.next.push(new Node(')'))
        this.__match()
      } else {
        throw new Error('wrong')
      }
    } else if (utils.isNumber(this.token) || utils.isIdentifier(this.token)) {
      root.next.push(new Node(this.token))
      this.__match()
    } else {
      throw new Error('wrong')
    }
    return root
  }
}

module.exports = Tiny