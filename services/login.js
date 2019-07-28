var request=require('request');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./config/config.properties');


function getFacebookURL(faceObj){
  var url = properties.get("facebook_graph_api_auth");
  var appSecret = properties.get("facebook_app_secret");

  return url.replace("$1",faceObj.token)
                    .replace("$2",faceObj.appID)
                    .replace("$3",appSecret);
}

function performLogin(res,rep){
  executeLoginRequest(function(err,res,body){
    rep.send(body);
  });
}

function executeLoginRequest(res,resp){
  var options = {
    'content-type': 'application/json'
  };

  console.log(res.method);
  console.log(res.body);

  var faceObj = {
    token: res.body.access_token,
    appID: res.body.app_id
  };

  return request.get(getFacebookURL(faceObj),options,function(err,res,body){
    resp.append("content-type","application/json")

    if(res.statusCode != 200){
      resp.status(500);
      var error = {
        error : "something went wrong"
      };

      resp.send(JSON.stringify(error))
      return;
    }

    resp.status(200);
    resp.send(body);
  });
}

exports.facebook = performLogin;
