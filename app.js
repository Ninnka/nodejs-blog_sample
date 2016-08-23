var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
// var logger = require('morgan')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var fs = require('fs')

var routes = require('./routes/index')
var settings = require('./settings')
var flash = require('connect-flash')
var users = require('./routes/users')

var accessLog = fs.createWriteStream('access.log', {flags: 'a'})
var errorLog = fs.createWriteStream('error.log', {flags: 'a'})
var app = express()

app.set('port', process.env.PORT || 3000)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(flash())

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

/*
app.use(logger('dev'))
app.use(logger({
  stream: accessLog
}));*/
app.use(morgan('combined'))
app.use(morgan('combined', {
  stream: accessLog
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(multer({
//   dest: __dirname + '/public/images',
//   rename: function (fieldname, filename) {
//     return fieldname + '_' + filename + '_' + Date.now()
//   }
// }))
// var storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null, './public/images')
//   },
//   filename: funtion(req, file, cb){
//     cb(null, file.originalname)
//   }
// });
// var upload = multer({
//   storage: storage
// });


app.use(cookieParser())
app.use(express.static('public/stylesheets'))
app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + ']' + req.url + '\n'
  errorLog.write(meta + err.stack + '\n')
  next()
})

var session = require('express-session')
// 存储session所需模块
var MongoStore = require('connect-mongo')(session)

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db, // cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  }),
  resave: false,
  saveUninitialized: false
}))

routes(app)

app.listen(app.get('port'), function () {
  console.log('Express server listening on ' + app.get('port'))
})

module.exports = app
