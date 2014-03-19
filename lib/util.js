
//
//是否是汉字
//
exports.isChinese =function(str){  
  var entryVal=str;  
  var entryLen=entryVal.length;  
  var cnChar=entryVal.match(/[^\x00-\x80]/g);  
  if(cnChar!=null&&cnChar.length>0) 
    return true;  
  else 
    return false;  
};

