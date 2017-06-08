const utils = require('./utils')
const Tiny = require('./tiny')

let code = `if a<2 then a:=2 else a:=3 end;a := 5;`

console.log(utils.split(code))
new Tiny(utils.split(code)).__stmtSequence()