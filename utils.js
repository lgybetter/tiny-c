/**
 * 分割程序代码为token
 * @param {String} text - 待分割的程序代码
 * @return {Array} - 分割完的token
 */
exports.split = text => {
  const regSplit = (str, returnArr) => {
    let rex = /[A-Za-z0-9_][A-Za-z0-9_]*|\+|-|\*|\/|<|>|:=|=|;|\(|\)|\{|\}|\$|~|`|!|@|#|%|\^|&|,|\?|\|/
    let result = str.match(rex)
    if(result) {
      returnArr.push(result[0])
    }
    if(str.length) {
      str = str.substring(result[0].length)
      return regSplit(str, returnArr)
    } else {
      return returnArr
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