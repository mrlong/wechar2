///////////////////////////////////////////////////////////////////////////////
//
// 作者: mrlong 2014-3-18
//
//  学习应用wechat 的API接口
//
// 第三方包：
//  wikipadia-js 使用时，要修改符合本地的路径：
//
//  lib\constants\wikiConstants.js 
//  module.exports.WIKIPEDIA_EN_URL = "http://zh.m.wikipedia.org";
//  module.exports.WIKIPEDIA_EN_URL_WIKI = "http://zh.m.wikipedia.org/wiki/";
//  module.exports.WIKIPEDIA_EN_API_URL = "http://zh.wikipedia.org/w/api.php";
//  module.exports.PROJECT_GUTENBERG_EBOOK_BASE_URL = "http://www.gutenberg.org/ebooks/";
//  module.exports.WORLDCAT_IDENTITY_LINK = "http://www.worldcat.org/identities/";
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
var Cycd = require('./lib/cycdSchema');  //成语词典
var Jinayi = require('./lib/jianyiSchema'); //建议

var wikipedia = require("wikipedia-js");


var worker = require('pm').createWorker();

var app = connect();
connect.logger.format('home', ':remote-addr :response-time - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :res[content-length]');
app.use(connect.logger({
  format: 'home',
  stream: fs.createWriteStream(__dirname + '/logs/access.log')
}));

app.use(connect.bodyParser())
app.use(connect.query());
app.use(connect.static(__dirname + '/assets', { maxAge: 86400000 }));
app.use(connect.cookieParser());
app.use(connect.session({secret: config.secret}));

app.use('/wechat', routes);


/////////////这地方什么移到别的地方？？？？？？？？？？
var tpl_pinyin = ejs.compile(fs.readFileSync(path.join(__dirname, 'views/pinyin.html'), 'utf-8'));
app.use('/pinyin', function (req, res) {
  var id = req.query.id || '';
  Xhzd.ZiFindByid(id,function(err,doc){
    if(!err && doc){
      res.writeHead(200);
      res.end(tpl_pinyin(doc));
    }
    else{
      res.writeHead(404);
      res.end('Not Found');
    }
  });  
});

//成语词典
var tpl_cycd = ejs.compile(fs.readFileSync(path.join(__dirname, 'views/cycd.html'), 'utf-8'));
app.use('/cycd', function (req, res) {
  var id = req.query.id || '';
  Cycd.CyFindByid(id,function(err,doc){
    if(!err && doc){
      res.writeHead(200);
      res.end(tpl_cycd(doc));
    }
    else{
      res.writeHead(404);
      res.end('Not Found');
    }
  });  
});

//维基查找
//wikipedia
var tpl_wiki = ejs.compile(fs.readFileSync(path.join(__dirname, 'views/wikipedia.html'), 'utf-8'));
app.use('/wiki', function (req, res) {
  var search = req.query.search || '';
  var idx    = req.query.idx || '';
  if (idx==''){
    res.writeHead(200);
    res.end(tpl_wiki({'search':search,'content':'请稍候...'}));
  }
  else{
    var options = {query: search, format: "html", summaryOnly: true};
    wikipedia.searchArticle(options, function(err, html){
      if(err){
        res.writeHead(200);
        res.end('查找维基百科出错，请重试。' +err);
      }
      else{
        res.writeHead(200);
        res.end(html);
      }  
    }); 
  };
});

//建议
//jianyi?content="ssssssssss"
var tpl_jianyi = ejs.compile(fs.readFileSync(path.join(__dirname, 'views/jianyi.html'), 'utf-8'));
app.use('/jianyi', function (req,res) {
  var content = req.body.content || ''; 
  var qq = req.body.qq || '';
  
  if(content){
    Jinayi.add(content,qq,function(err){
      res.writeHead(200);
      res.end(tpl_jianyi({msg: err?'保存失败':'谢谢你的建议，我会重视并持续改进。',showform:err?true:false}));
    });
  }
  else {
    res.writeHead(200);
    res.end(tpl_jianyi({msg:'你的建议对我很重要！！！',showform:true}));
  }
});

//使用说明
var tpl_readme = ejs.compile(fs.readFileSync(path.join(__dirname, 'views/readme.html'), 'utf-8'));
app.use('/readme', function (req,res) {
  res.writeHead(200);
  res.end(tpl_readme());
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
