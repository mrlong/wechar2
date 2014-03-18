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

var tpl = ejs.compile(fs.readFileSync(path.join(__dirname, 'views/detail.html'), 'utf-8'));
app.use('/detail', function (req, res) {
  var id = req.query.id || '';
  var info = alpha.access(alpha.getKey(id));
  if (info) {
    res.writeHead(200);
    res.end(tpl(info));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

app.use('/', function (req, res) {
  console.log('111');
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
  console.log('111');
  server.emit('connection', socket);
});
