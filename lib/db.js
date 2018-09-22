var config=require('../config');
var mongoose=require('mongoose');

var url = 'mongodb://' + config.mongodb.username + ':' + config.mongodb.password + "@" + config.mongodb.host + ':'+ config.mongodb.port + '/' + config.mongodb.dbname;

module.exports=mongoose.createConnection(config.mongodb.host,config.mongodb.db,config.mongodb.port,{
    user:config.mongodb.username,
    pass:config.mongodb.password,
});
//module.exports=mongoose.createConnection(url);