///////////////////////////////////////////////////////////////////////////////
//
// 作者：龙仕云  2014－3－18
//
// 事件
//
///////////////////////////////////////////////////////////////////////////////

module.exports = function(event, req, res, next){
	console.log(event);
  if (event.Event === 'subscribe') {
  	// 用户添加时候的消息
  	res.reply('谢谢添加龙仕云公共帐号:)\n回复相关关键词，将会得到相关描述。');
  } else if (event.Event === 'unsubscribe') {
  	res.reply('Bye!');
  } else {
  	res.reply('暂未支持! Coming soon!');
  }
};
