var config=require('../config');
var mongoose=require('mongoose');

module.exports=mongoose.createConnection(config.mongodb.host,config.mongodb.db,config.mongodb.port);