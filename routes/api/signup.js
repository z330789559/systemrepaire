/**
 * Created by baozhong on 2017/2/9.
 */
var models=require("../../lib/core")

var $User=models.$User;
exports.get=function* () {
    console.log('sd')
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
    var userExist=yield $User.getUserByName(data.name)
    var result={}
    if(userExist){
        result.error="用户名已经存在";
        result.status="fail"
    } else{

    yield  $User.addUser(data);

    this.session.user = {
        name: data.name,
        account_type: data.account_type
    }
        result.error="";
        result.status="success"
}
    yield this.body=result;
};