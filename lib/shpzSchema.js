////////////////////////////////////////////////////////
//
// 如查不到，是否要加入到列到服务器上。
// 生癖字保存
//
///////////////////////////////////////////////////////

var db=require('./db');
var Schema=require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

var shpzSchema = new Schema({
  zi   :{type:String,index: true},     //字
  py   :{type:String},                 //拼音            
  wubi :{type:String},                 //五笔
  bihua :{type:String},                //笔划
  bushou:{type:String},                //部首
  pinyin:{type:String},                //拼音 
  jijie :{type:String},
  xiangjie:{type:String},
  from:{type:String},                   //谁提的
  bdate:{type:Date,default:Date.now},   //创建时间
  valided:{type:Boolean,default:false}  //是否有效,可以查询之用了
});

var Shpz = db.model('shpz',shpzSchema);


/**
 * 增加
 * Callback:
 * 回调函数参数列表：
 * - err, 数据库错误
 * @param {Function} callback 
 */
exports.add=function(zi,from,callback){
  var newShpz = new Shpz();
  newShpz.zi = zi;
  newShpz.from = from;

  //确定是否存在
  Shpz.findOne({zi:zi},function(err,doc){
    if(!err && !doc){
      newShpz.save(function(err){
        callback(err);
      });    
    }
    else{
      callback(false);
    }
  });
};

/**
 * 取出所有的字
 * Callback:
 * 回调函数参数列表：
 * - err, 数据库错误
 * - docs, 产品列表
 * @param {Function} callback 
 */
exports.getList = function(callback){
  Shpz.find({},null,{},callback);
};