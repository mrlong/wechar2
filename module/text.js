//
// 作者：龙仕云  2014-3-18
// 文本信息推送器 
//

var Util = require('../lib/util');
var Pinyin = require('../lib/pinyin');

module.exports = function(message, req, res, next){
  console.log(message);
  var input = (message.Content || '').trim();
  var content = '';

  if (Util.isChinese(input) === true){
    content = Pinyin.pinyin(input);
  }

/*
  if (input === '大王') {
    return res.reply("不要叫我大王，要叫我mrlong大人啊……");
  }
  if (input.length < 2) {
    return res.reply('内容太少，请多输入一点:)');
  }
    
  res.wait('view');
    
  var from = message.FromUserName;
  if (!Array.isArray(content)) {
    if (from === 'oPKu7jgOibOA-De4u8J2RuNKpZRw') {
      content = '主人你好：\n' + content;
    }
    if (from === 'oPKu7jpSY1tD1xoyXtECiM3VXzdU') {
      content = '女王大人:\n' + content;
    }
  }
*/
  console.log(content);
  res.reply(content);
};