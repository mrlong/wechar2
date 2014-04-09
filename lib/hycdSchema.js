//
// 查找汉语词典
//
var db=require('./db');
var Schema=require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

/*

{
    "_id" : ObjectId("5345338efa0d540b4b154df6"),
    "hy" : "一国三公",
    "js" : "春秋时晋献公命士蒍为重耳和夷吾筑城，士蒍敬守君命，但为免除后患，只得草率完工，赋诗：『孤裘尨茸，一国三公，吾谁适从。』典出左传˙僖公五年。后比喻政令出于多门，事权不统一，使人无所适从。唐˙刘子元˙上萧至忠论史书：『十羊九牧，其命难行，一国三公，适从安在？』"
}

*/
var hycdSchema = new Schema({
  hy   :{type:String,index: true},    //语句
  js   :{type:String}                 //解释            

});

var Hycd = db.model('hycd',hycdSchema);


/**
 * 查找
 * Callback:
 * 回调函数参数列表：
 * - err, 数据库错误
 * - doc, 内容
 * @param {Function} callback 
 */
exports.HyFind=function(hy,callback){
  Hycd.findOne({'hy':hy},function (err, doc) {
    //debugger;
    if(!err && doc){
      return callback(false,doc);
    }
    else{
      return callback(true,null);
    }
  });
};

exports.HyFindByid=function(id,callback){
  Hycd.findOne({'_id':id},function (err,doc){
    if(!err && doc){
      return callback(false,doc);
    }
    else{
      return callback(true,null);
    }
  });
}