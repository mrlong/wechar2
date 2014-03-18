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
var voice = require('./module/voice');
var video = require('./module/video');
var event = require('./module/event');
var link = require('./module/link');

//常规回复
var List = require('wechat').List;
List.add('view', [
  ['没有找到相关回复信息。输入模块名，方法名，事件名等都能获取到相关内容。\n回复{a}可以查看近期的活动', function (info, req, res) {
    res.nowait('暂无活动');
  }]
]);

var mywechat = wechat(config.token, 
  wechat.text(text)      //文本
    .image(image)        //图片
    .location(location)  //位置
    .voice(voice)        //声音
    .video(video)        //视频
    .link(link)      
    .event(event));      //事件
  
  
//};
module.exports = mywechat;

