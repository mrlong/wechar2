//
// 作者：龙仕云  2014-3-18
// 文本信息推送器 
//
// 
// 修改直接如找不到就到维基去掉了。
//
//
//

var http = require('http');
var config = require('../config');
var Util = require('../lib/util');
var Xhzd = require('../lib/xhzdSchema');
var Pinyin = require('../lib/pinyin');
var Shpz = require('../lib/shpzSchema');
var Cycd = require('../lib/cycdSchema');
var Hycd = require('../lib/hycdSchema');
var wikipedia = require("wikipedia-js");
var tuiguang = require('../tuiguang');

module.exports = function(message, req, res, next){
  //console.log(message);
  
  var input = (message.Content || '').trim();
  var content = '';
  
  //处理类型
  var ftype=0; // = 0 表示中文新字典， =1 表示有道
  if((input.length>2) && (input[0]=='f') && (input[1]=='y') && Util.isChinese(input))
  {
    ftype = 1;
    input = input.substring(2,input.length);
  }
  else if(Util.isChinese(input) === false){
    ftype = 1;
  }
  else if(Util.isChinese(input) === true){
    ftype = 0;
  };
  
  
  //中文
  if (ftype === 0){
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
                         '【注解】:\n' + doc.jijie.replace(/<br>/ig, '\n').replace(/<\/br>/ig, '\n').trim() + '\n\n' +
                         '                    《新华字典》',
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
      //1.找成语词典
      Cycd.CyFind(input,function(err,doc){
        if(!err && doc){
          var content = [];
          content.push({
            title: input,
            description: '【拼音】:' + doc.pinyin + '\n' +
                         '【解释】:\n' + doc.js  + '\n'  +
                         '【出自】:\n' + doc.cz  + '\n'  +
                         '【示例】:\n' + doc.sl  + '\n\n'  +
                         '                    《成语大全》',
            url:encodeURI(config.domain + '/wikipedia?search='+input)
          });
          res.reply(content);
        }
        else{
          //2.找汉语词典
          Hycd.HyFind(input,function(err,doc){
            if(!err && doc){
              var content = [];
              var destxt = 
              content.push(
                // {title:input,description:'维基百科',
                // picurl: config.domain + '/wiki.png'
                // },
                {
                title: input,
                description: '【拼音】:' + Pinyin.pinyin(input) + '\n' +
                             '【解释】:\n' + doc.js.replace('[反]', '【反义】:')
                                                  .replace('[似]', '【类似】:')
                                                  .replace(/<br>/ig, '\n')
                                                  .replace(/<\/br>/ig, '\n').trim() + '\n\n' +
                             '                    《汉语词典》',
                url:encodeURI(config.domain + '/wiki?search='+input)
               
              });
              res.reply(content);
            }              
            else{
              //没有找到时，就直接到维基内查找。
              var content = [];
              var options = {query: input, format: "txt", summaryOnly: true};
              wikipedia.searchArticle(options, function(err, txt){
                if(err || txt==null){
                  content.push({
                    title: (err?'亲！查找维基百科出错,请尝试别的方法。\n':'亲!无法找到你要查的结果，试一下百度。\n')+
                              input+'(' + Pinyin.pinyin(input) + ')',
                    picurl: config.domain + (err?'/error2.jpg':'/warn.jpg')
                  });
                  content.push({title:'1、努力尝试模糊搜索...',url:encodeURI(config.domain + '/wikisearch?search='+input)});
                  content.push({title:'2、用百度试试运气...',url:encodeURI('http://wapbaike.baidu.com/item/'+input)});
                  tuiguang.textmessage(input,content,function(err,data){
                    res.reply(content);
                  });           
                  
                }
                else{
                  //维基找到空的内容，说到维基没有收录到。
                  content.push({
                    title: input+'(' + Pinyin.pinyin(input) + ')',
                    description:txt+ '\n\n'  + 
                    '                    《维基百科》',
                    url:encodeURI('http://zh.m.wikipedia.org/wiki/'+input)
                  }); 
                  res.reply(content);
                }  
              });
              
              //3.没有找到时，有没有相近的拼音
              //相近的拼音去掉，作者
              
            }//end 3
          });
          
        }//else      
      });
      
    }
  }
  ////////////////////// 英汉词典 //////////////////////////////////////////////////////
  else if( ftype === 1 ){
    console.log(input);
    var content = [];
    var myquery = encodeURI(input);
    var myurl = 'http://fanyi.youdao.com/openapi.do?keyfrom=wechat-mrlong&key=120431144&type=data&doctype=json&version=1.1&q=' + myquery;
    var myhtml = '';
    
    var req = http.get(myurl,function(httpres){
      if(httpres.statusCode==200){
        
        httpres.on('data',function(data){
          myhtml += data
        });
        
        httpres.on('end',function(){
          var jdata = JSON.parse(myhtml);
          
          if(!jdata){
            res.reply('有道数据源出错');
            return;
          };
          
          var myfy = ''  //
          if(jdata.basic.phonetic){
            myfy = '【发音】：' + jdata.basic.phonetic;
            //if(jdata.basic.uk-phonetic){
            //  myfy += ' (英式)' + jdata.basic.uk-phonetic;
            //};
            //if(jdata.basic.us-phonetic){
            //  myfy += ' (美式)' + jdata.basic.us-phonetic;
            //};
            myfy += '\n';
          };
          
          var mytran = '【翻译】：';
          for(var i=0;i<jdata.translation.length;i++){
            mytran += '\n' + '   '+ jdata.translation[i];
          };
          
          var myexplains = '【综合解释】：';
          if(jdata.basic && jdata.basic.explains){
            for(var i=0;i<jdata.basic.explains.length;i++){
              myexplains += '\n' + '   ' +jdata.basic.explains[i];
            };
          };
          
          var myweb = '【网络释义】：';
          if(jdata.web){
            for(var i=0;i<jdata.web.length;i++){
              myweb += '\n' + '   ' + jdata.web[i].key + '='+jdata.web[i].value;  
            };
          };
          
          content.push({
            title:input,
            description: myfy + mytran + '\n' + myexplains + '\n' +myweb + '\n\n' + 
                '                    --来源有道数据库--',
            //url:encodeURI(config.domain + '/wiki?search='+input)
            url:encodeURI('http://dict.youdao.com/search?q='+input)
          });
          res.reply(content);
        });
      }
      else{
        content.push({ 
        title:'亲！获取词典出错。' + res.statusCode,
        description:'点击到维基百科试试运气...',
        url:encodeURI(config.domain + '/wiki?search='+input)
        });
        res.reply(content);
      }
    });
    
    req.on('error',function(err){
      content.push({ 
        title:'亲！获取词典出错。',
        description:'点击到维基百科试试运气...',
        url:encodeURI(config.domain + '/wiki?search='+input)
      });
      res.reply(content);
    
    });
        
    
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