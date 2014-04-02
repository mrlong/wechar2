/////////////////////////////////////////////////
//
// 用户信息
//
////////////////////////////////////////////////

/*{
 "subscribe": 1, 
 "openid": "o6_bmjrPTlm6_2sgVt7hMZOPfL2M", 
 "nickname": "Band", 
 "sex": 1, 
 "language": "zh_CN", 
 "city": "广州", 
 "province": "广东", 
 "country": "中国", 
 "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0", 
 "subscribe_time": 1382694957
}*/

var db=require('./db');
var Schema=require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;
var wechat = require('wechat');

var userSchema = new Schema({
  subscribe : {type:Number,default:0}, //=1 表示关注，=0取消关注  
  openid : {type:String},             
  nickname : {type:String},               
  sex :{type:Number,default:0},     //1时是男性，值为2时是女性 0未知  
  language:{type:String},             
  city:{type:String},               //城市
  province :{type:String},          //省份
  country:{type:String},            //国家 
  headimgurl:{type:String},         //头象
  subscribe_time:{type:Date,default:Date.now} //关注时间, 如是取消关注这时变化
});

var User = db.model('user',userSchema);

/*
 * openid 
 * callback 参数 (err);
 */
exports.add=function(openid,callback){
  //确定是否存在
  User.findOne({'openid':openid},function(err,doc){
    if(!err && !doc){
      //新增
      wechat.API.getUser(openid,function(err,user){
        if(!err && user){
          var newUser = new User();
          newUser.subscribe = user.subscribe;
          newUser.openid = user.openid;
          newUser.nickname = user.nickname;
          newUser.sex = user.sex;
          newUser.language = user.language;
          newUser.city = user.city;
          newUser.province = user.province;
          newUser.country = user.country;
          newUser.headimgurl = user.headimgurl;
          newUser.subscribe_time = user.subscribe_time;
          newUser.save(function(err){
            callback(err);
          });      
        }
        else{
          callback(err);
        }
      });
    }
    else if (!err && doc){
      doc.subscribe = 1;
      doc.subscribe_time = Date.now;
      doc.save(function(err){
        callback(err);
      });        
    }
    else{
      callback(err);
    }
  }); 
};

exports.leave = function(openid,callback){
  User.findOne({'openid':openid},function(err,user){
    if(!err && !user){
      user.subscribe = 0;
      user.subscribe_time = Date.now;
      user.save(function(err){
        callback(err);
      }); 
    };
  });
};
