//
// 推广应用入口
//
//


//1.文本信息进来时
// input 是用户录入文本
// content 是返回的值，要这个内容插值。
// fn(err,conent)
exports.textmessage=function(input,content,fn){
  content.push({title:'===将本应用推荐给我的好友===',url:'http://xhzd.mrlong.cn'});
  if(fn){fn(null,content)};  
};