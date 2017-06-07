class Tiny {
  
  constructor (tokenArr=[]) {
    this.tokenArr = tokenArr
    this.tokenIndex = 0
    this.token = tokenArr[0]
  }

  __nextToken() {
    this.token = this.tokenArr[this.tokenIndex++]
  }

  __match() {
    console.log(this.token)
    //token save to tree
    console.log(token)
    //token next
    this.__nextToken()
  }

  __progam () {
    this.__stmtSequence()  
  }

  __stmtSequence () {
    this.__statement()
    if (this.token === ';') {
      this.__match()
    } else {
      throw new Error('wrong')
    }
    while (this.token === ';') {
      this.__statement()
    }
  }

  __statement () {
    if (this.token === 'if') {
      this.__ifStmt()
    } else if (this.token === 'repeat') {
      this.__reqeatStmt()
    } else if (this.token === 'identifier') {
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
    if (this.token === 'if') {
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
    } else {
      throw new Error('wrong')
    }
  }

  __reqeatStmt () {
    if (this.token === 'repeat') {
      this.__match()
      this.__stmtSequence()
      if (this.token === 'until') {
        this.__match()
        this.__exp()
      } else {
        throw new Error('wrong')
      }
    } else {
      throw new Error('wrong')
    }
  }

  __assignStmt () {
    if (this.token === 'identifier') {
      this.__match()
      if (this.token === ':=') {
        this.__match()
        this.__exp()
      } else {
        throw new Error('wrong')
      }
    } else {
      throw new Error('wrong')
    }
  }

  __readStmt () {
    if (this.token === 'read') {
      this.__match()
      if (this.token === 'identifier') {
        this.__match()
      } else {
        throw new Error('wrong')
      }
    } else {
      throw new Error('wrong')
    }
  }

  __writeStmt () {
    if (this.token === 'write') {
      this.__match()
      this.__exp()
    } else {
      throw new Error('wrong')
    }
  }

  __exp () {
    if (this.token === '(') {
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
    if (this.token === '(') {
      this.__term()
    } else {
      throw new Error('wrong')
    }
    if (this.token === '+' || this.token === '-') {
      this.__addOp()
      this.__term()
    }
  }

  __comparisonOp () {
    if (this.token === '<') {
      this.__match()
    } else if (this.token === '=') {
      this.__match()
    } else {
      throw new Error('wrong')
    }    
  }

  __addOp () {
    if (this.token === '+') {
      this.__match()
    } else if (this.token === '-') {
      this.__match()
    } else {
      throw new Error('wrong')
    }
  }

  __term () {
    if (this.token === '(') {
      this.__factor()
    } else {
      throw new Error('wrong')
    }
    while (this.token === '*' || this.token === '/') {
      this.__mulOp()
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
    } else if (utils.isNumber(this.token)) {
      this.__match()
    } else if (utils.isIdentifier(this.token)) {
      this.__match()
    } else {
      throw new Error('wrong')
    } 
  }

  __mulOp () {
    if (this.token === '*') {
      this.__match()
    } else if (this.token === '/') {
      this.__match()
    } else {
      throw new Error('wrong')
    }
  }

}