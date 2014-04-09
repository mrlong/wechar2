//
// 作者：龙仕云  2014-3-18
// 文本信息推送器 
//

var config = require('../config');
var Util = require('../lib/util');
var Xhzd = require('../lib/xhzdSchema');
var Pinyin = require('../lib/pinyin');
var Shpz = require('../lib/shpzSchema');
var Cycd = require('../lib/cycdSchema');

module.exports = function(message, req, res, next){
  //console.log(message);
  
  var input = (message.Content || '').trim();
  var content = '';

  //中文
  if (Util.isChinese(input) === true){
    //新华字典
    if (input.length === 1){
      Xhzd.ZiFind(input,function(err,doc){
        if(!err && doc){
          content = [];
          var blank = '';
          for (var i=0;i<doc.pinyin.length;i++){blank = blank + ' ';}
          content.push({
            title: input,
            description: '【拼音】:' + doc.pinyin +  '   【五笔】:' + doc.wubi + '\n' +
                         '【笔划】:' + doc.bihua + blank +'  【部首】:' + doc.bushou + '\n' +
                         '【注解】:\n' + doc.jijie.replace(/<br>/ig, '\n').replace(/<\/br>/ig, '\n').trim(),
            //picurl: config.domain + '/qrcode.jpg',
            url: config.domain + '/pinyin?id=' + doc._id
          });
          res.reply(content);
        }
        else{
          Shpz.add(input,message.FromUserName,function(err){
            if(!err){
              content = '字库内没有找到:' + input  + '(' + Pinyin.pinyin(input) + ')。'+'\n' +
                        '我们已将你的查字录入生癖字库，不断完美我们的字库。';  
            }
            else{
              content = '字库内没有找到:' + input  + '(' + Pinyin.pinyin(input) + ')。' ;
            };
            res.reply(content);
          });
        };
      });
    }
    //新华词典
    else {
      Cycd.CyFind(input,function(err,doc){
        if(!err && doc){
          content = [];
          var blank = '';
          content.push({
            title: input,
            description: '【拼音】:' + doc.pinyin + '\n' +
                         '【解释】:\n' + doc.js  + '\n'  +
                         '【出自】:\n' + doc.cz  + '\n'  +
                         '【示例】:\n' + doc.sl,
            url: config.domain + '/cycd?id=' + doc._id
          });
          res.reply(content);
        }
        else{
          content = Pinyin.pinyin(input) + '\n亲！词典库内查不到:' + input + '\n 〖本应用提供单字及四字词语查功能〗';
          res.reply(content);
        }      
      });
      
    }
  }
  else{

    content = '暂不支持英汉字典。';
    res.reply(content);
  };

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
  
};