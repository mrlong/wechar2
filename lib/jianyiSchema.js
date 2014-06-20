/*
 *
 *  建议功能 作者：龙仕云 2014-6-20
 *
 *
 */


var db=require('./db');
var Schema=require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

/*

{
    "_id" : ObjectId("53440212fa0d540b4b145456"),
    "builddate" : "2014-6-32 12:23",
    "content" : "bēi  hú  bǐng  liáng",
    "qq" : "比喻度量宽广恢弘。",
}

*/
var jinayiSchema = new Schema({
  builddate   :{type:Date},          //时间 
  content:{type:String},             //建议
  qq   :{type:String}                //QQQ            
});

var Jinayi = db.model('jinayi',jinayiSchema);


/**
 * 增加
 * Callback:
 * 回调函数参数列表：
 * - err, 数据库错误
 * @param {Function} callback 
 */
exports.add=function(content,qq,callback){
  var newjy = new Jinayi();
  newjy.builddate = new Date;
  newjy.content = content;
  newjy.qq = qq;
  newjy.save(function(err){
    callback(err);
  
  });
};