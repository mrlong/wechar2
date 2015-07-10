
var http = require('http');


/*

查不到数据返回：

{"translation":["Hgtu"],"query":"Hgtu","errorCode":0}


有数据：
{"translation":["你"],
 "basic":{"us-phonetic":"ju","phonetic":"juː","uk-phonetic":"juː",
   "explains":["pron. 你；你们","n. (You)人名；(柬)尤；(东南亚国家华语)猷"]},
   "query":"you",
   "errorCode":0,
   "web":[{"value":["你","你们","假借为\u201C汝\u201D"],"key":"you"},
           {"value":["爱你","醉后决定爱上你","好爱你"],"key":"Love you"},
           {"value":["你知道","你要知道","你了解"],"key":"You Know"}]
}

*/

var myquery = 'Hgtu';
var myurl = 'http://fanyi.youdao.com/openapi.do?keyfrom=wechat-mrlong&key=120431144&type=data&doctype=json&version=1.1&q=' + myquery;
var myhtml = '';
    
var req = http.get(myurl,function(httpres){
  if(httpres.statusCode==200){
        
    httpres.on('data',function(data){
      myhtml += data
    });
        
    httpres.on('end',function(){
      console.log(myhtml);    
      try{
        var jdata = JSON.parse(myhtml);
      }catch (e) {
          res.reply('亲！有道数据源出错');
      };
    });
  }
});