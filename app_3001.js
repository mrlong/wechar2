///////////////////////////////////////////////////////////////////////////////
//
// 作者: mrlong 2014-3-18
//
//  学习应用wechat 的API接口
//
//
//
///////////////////////////////////////////////////////////////////////////////

var fs = require('fs');
var path = require('path');
var http = require('http');
var connect = require('connect');
var wechat = require('wechat');
var config = require('./config');
var ejs = require('ejs');
var routes = require('./routes');
var Xhzd = require('./lib/xhzdSchema');  //字典库操作，以后要移出掉。

var worker = require('pm').createWorker();

var app = connect();
connect.logger.format('home', ':remote-addr :response-time - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :res[content-length]');
app.use(connect.logger({
  format: 'home',
  stream: fs.createWriteStream(__dirname + '/logs/access.log')
}));

app.use(connect.query());
app.use(connect.static(__dirname + '/assets', { maxAge: 86400000 }));
app.use(connect.cookieParser());
app.use(connect.session({secret: config.secret}));
app.use('/wechat', routes);

/////////////这地方什么移到别的地方？？？？？？？？？？
var tpl = ejs.compile(fs.readFileSync(path.join(__dirname, 'views/pinyin.html'), 'utf-8'));
app.use('/pinyin', function (req, res) {
  var id = req.query.id || '';
  Xhzd.ZiFindByid(id,function(err,doc){
    if(!err && doc){
      res.writeHead(200);
      res.end(tpl(doc));
    }
    else{
      res.writeHead(404);
      res.end('Not Found');
    }
  });  
});
////////////////////////////////////////////

app.use('/', function (req, res) {
  res.writeHead(200);
  res.end('hello node api');
});

/**
 * Error handler
 */
app.use(function (err, req, res) {
  console.log(err.message);
  console.log(err.stack);
  res.statusCode = err.status || 500;
  res.end(err.message);
});

var server = http.createServer(app);
server.listen(3003);

worker.ready(function (socket) {
  server.emit('connection', socket);
});
