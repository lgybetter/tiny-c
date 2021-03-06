const Express = require('express')
const router = Express.Router()
const Tiny = require('./tiny')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
let app = new Express()

app.use(Express.static(path.join(`${__dirname}`, 'public')))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors());
app.use(bodyParser.json());

router.post('/tiny', (req, res, next) => {
  if(req.body.code) {
    try {
      let result = Tiny.start(req.body.code)
      res.json(result)
    } catch (err) {
      res.json(err.message)
    }    
  } else {
    res.status(400)
  }
})

app.use(router)

app.listen(3001, '0.0.0.0', () => {
  console.log('server is running at 127.0.0.0:3001')
})
