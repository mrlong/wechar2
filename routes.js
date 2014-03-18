//
// 作者：龙仕云  2014-4-18
//
//  路由功能
//
var wechat = require('wechat');
var config = require('./config');
var text = require('./module/text');
var image = require('./module/image');
var location = require('./module/location');

module.exports = function(app) {

  //常规回复
  var List = require('wechat').List;
  List.add('view', [
    ['没有找到相关API。输入模块名，方法名，事件名等都能获取到相关内容。\n回复{a}可以查看近期的NodeParty活动', function (info, req, res) {
      res.nowait('暂无活动');
    }]
  ]);

  var mywechat = wechat(config.token, 
      wechat.text(text)
      .image(image)
      .location(location)
      .voice(function (message, req, res) {
    console.log(message);
    res.reply('心情不好，不想搭理你。');
  }).event(function (message, req, res) {
    console.log(message);
    if (message.Event === 'subscribe') {
      // 用户添加时候的消息
      res.reply('谢谢添加Node.js公共帐号:)\n回复Node.js API相关关键词，将会得到相关描述。如：module, setTimeout等');
    } else if (message.Event === 'unsubscribe') {
      res.reply('Bye!');
    } else {
      res.reply('暂未支持! Coming soon!');
    }
  }));
  
  app.use('/wechat', mywechat);
};
