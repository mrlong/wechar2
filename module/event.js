///////////////////////////////////////////////////////////////////////////////
//
// 作者：龙仕云  2014－3－18
//
// 事件
//
///////////////////////////////////////////////////////////////////////////////

// message为事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'event',
  // Event: 'LOCATION',
  // Latitude: '23.137466',
  // Longitude: '113.352425',
  // Precision: '119.385040',
  // MsgId: '5837397520665436492' }
var User = require('../lib/userSchema');

module.exports = function(event, req, res, next){
	console.log(event);
  if (event.Event === 'subscribe') {
  	//写入库内的人员信息
    //这个接口必须在认证之后才能用
    //User.add(event.FromUserName,function(err){});

    // 用户添加时候的消息
  	res.reply('谢谢添加字典公众账号，查生癖字，查字解释，字的祥细注解。应用尽用，新华字典有的都有。:)\n请输入一个字，将会得到相关描述。');
    
  } else if (event.Event === 'unsubscribe') {
    //这个接口必须在认证之后才能用
  	//User.leave(event.FromUserName,function(err){});
    res.reply('Bye! 谢谢你的关注下次再来。');
  } else {
  	res.reply('暂未支持! Coming soon!');
  }
};
