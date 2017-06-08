const utils = require('./utils')

class Tiny {
  
  constructor (tokenArr=[]) {
    this.tokenArr = tokenArr
    this.tokenIndex = 0
    this.token = tokenArr[0]
    this.end = false
  }

  __nextToken() {
    if(this.tokenIndex + 1 === this.tokenArr.length) {
      console.log('程序分析结束')
      process.exit(0)
    }
    this.token = this.tokenArr[++this.tokenIndex]
  }

  __match() {
    //token save to tree
    console.log(this.token)
    //token next
    this.__nextToken()
  }

  __progam () {
    this.__stmtSequence()  
  }

  __stmtSequence () {
    this.__statement()
    while (this.token === ';') {
      this.__match()
      this.__statement()
    }
  }

  __statement () {
    if (this.token === 'if') {
      this.__ifStmt()
    } else if (this.token === 'repeat') {
      this.__reqeatStmt()
    } else if (utils.isIdentifier(this.token)) {
      this.__assignStmt()
    } else if (this.token === 'read') {
      this.__readStmt()
    } else if (this.token === 'write') {
      this.__writeStmt()
    } else {
      throw new Error('wrong')
    }
  }

  __ifStmt () {
    this.__match()
    this.__exp()
    if(this.token === 'then') {
      this.__match()
      this.__stmtSequence()
    } else {
      throw new Error('wrong')
    }
    if (this.token === 'else') {
      this.__match()
      this.__stmtSequence()
    }
    if (this.token === 'end') {
      this.__match()
    } else {
      throw new Error('wrong')
    }
  }

  __reqeatStmt () {
    this.__match()
    this.__stmtSequence()
    if (this.token === 'until') {
      this.__match()
      this.__exp()
    } else {
      throw new Error('wrong')
    }
  }

  __assignStmt () {
    this.__match()
    if (this.token === ':=') {
      this.__match()
      this.__exp()
    } else {
      throw new Error('wrong')
    }
  }

  __readStmt () {
    this.__match()
    if (utils.isIdentifier(this.token)) {
      this.__match()
    } else {
      throw new Error('wrong')
    }
  }

  __writeStmt () {
    this.__match()
    this.__exp()
  }

  __exp () {
    if (this.token === '(' || utils.isNumber(this.token) || utils.isIdentifier(this.token)) {
      this.__simpleExp()
    } else {
      throw new Error('wrong')
    }
    if (this.token === '<' || this.token === '=') {
      this.__comparisonOp()
      this.__simpleExp()
    }
  }

  __simpleExp () {
    this.__term()
    if (this.token === '+' || this.token === '-') {
      this.__match()
      this.__term()
    }
  }

  __comparisonOp () {
    if (this.token === '<' || this.token === '=') {
      this.__match()
    } else {
      throw new Error('wrong')
    }    
  }


  __term () {
    this.__factor()
    while (this.token === '*' || this.token === '/') {
      this.__match()
      this.__factor()
    }
  }

  __factor () {
    if (this.token === '(') {
      this.__match()
      this.__exp()
      if (this.token === ')') {
        this.__match()
      } else {
        throw new Error('wrong')
      }
    } else if (utils.isNumber(this.token) || utils.isIdentifier(this.token)) {
      this.__match()
    } else {
      throw new Error('wrong')
    }
  }

}

module.exports = Tiny