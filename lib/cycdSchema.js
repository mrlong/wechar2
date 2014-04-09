//
// 查找词语
//
var db=require('./db');
var Schema=require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

/*

{
    "_id" : ObjectId("53440212fa0d540b4b145456"),
    "cy" : "陂湖禀量",
    "pinyin" : "bēi  hú  bǐng  liáng",
    "js" : "比喻度量宽广恢弘。",
    "cz" : "《后汉书·黄宪传》：“叔度汪汪若千顷陂，澄之不清，淆之不浊，不可量也。”",
    "sl" : ""
}

*/
var cycdSchema = new Schema({
  cy   :{type:String,index: true},    //语句
  pinyin:{type:String},               //拼音
  js   :{type:String},                //解释            
  cz :{type:String},                  //出自
  sl :{type:String}                   //示例

});

var Cycd = db.model('cycd',cycdSchema);


/**
 * 查找
 * Callback:
 * 回调函数参数列表：
 * - err, 数据库错误
 * - doc, 内容
 * @param {Function} callback 
 */
exports.CyFind=function(cy,callback){
  Cycd.findOne({'cy':cy},function (err, doc) {
    //debugger;
    if(!err && doc){
      return callback(false,doc);
    }
    else{
      return callback(true,null);
    }
  });
};

exports.CyFindByid=function(id,callback){
  Cycd.findOne({'_id':id},function (err,doc){
    if(!err && doc){
      return callback(false,doc);
    }
    else{
      return callback(true,null);
    }
  });
}