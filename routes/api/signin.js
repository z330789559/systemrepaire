/**
 * Created by baozhong on 16/9/6.
 */
var models=require("../../lib/core")

var $User=models.$User;


exports.get=function* () {
    // yield this.render('signin');
    var result={}
    if(!this.session || !this.session.user){
        result.isLogin=false;
    }else{
        result.isLogin=true
        result.user=this.session.user;
    }
    yield this.body=result
}

exports.post=function* () {
    var data=this.request.body;
    var userInfo=yield $User.getUserByName(data.name)
    var result={}
    if(!userInfo ||(userInfo.password!=data.password)){
        result.error="登录名或者密码错误";
        result.status='fail'
    }else{
        this.session.user={
            name:userInfo.name,
            account_type:userInfo.account_type
        }
        result.error="";
        result.status='success';
        result.user=this.session.user;
    }
      yield this.body=result;
}