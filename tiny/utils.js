/**
 * 分割程序代码为token
 * @param {String} text - 待分割的程序代码
 * @return {Array} - 分割完的token
 */
exports.split = text => {
  const regSplit = (str, returnArr) => {
    let rex = /[A-Za-z0-9_][A-Za-z0-9_]*|\+|-|\*|\/|<|>|:=|=|;|\(|\)|\{|\}|\$|~|`|!|@|#|%|\^|&|,|\?|\||\s+/
    let result = str.match(rex)
    if(result) {
      returnArr.push(result[0])
    }
    if(str.length) {
      str = str.substring(result[0].length)
      return regSplit(str, returnArr)
    } else {
      let _returnArr = []
      returnArr.forEach(item => {
        if(item !== ' ') {
          _returnArr.push(item)
        }
      })
      return _returnArr
    }
  }
  return regSplit(text, [])
}

/**
 * 读取文件程序
 * @param {String} path - 文件路径
 * @return {Promise} - 文件的代码程序
 */
exports.readCode = path => {
  console.log('读取文件')
}

/**
 * 输出分析结果到文件
 * @param {String} path - 文件路径
 * @param {Object} result - 分析结果
 * @return {Promise} - 文件是否写入成功
 */
exports.writeCode = (path, result) => {
  console.log('输出文件')
}

/**
 * 判断是否符合数字
 * @param {String} token - 判断的字符串
 * @return {Boolean}
 */
exports.isNumber = token => {
  return /[0-9]/.test(token)
}

/**
 * 判断是否是标识符
 * @param {String} token - 判断的字符串
 * @return {Boolean}
 */
exports.isIdentifier = token => {
  return /^[a-z]|^[A-z]|^\_/.test(token)
}