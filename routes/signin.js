/**
 * Created by baozhong on 16/9/6.
 */
var models=require("../lib/core")
var fetch=require("../utils/fetch_proxy")

var $User=models.$User;

exports.get=function* () {
    yield this.render('signin');
    // yield this.body={result:false};
}

exports.post=function* () {
    var data=this.request.body;
    var userInfo=yield $User.getUserByName(data.name)

    if(!userInfo ||(userInfo.password!=data.password)){
        this.flash={error:"登录名或者密码错误"};
        return this.redirect("back");
    }

    this.session.user={
        name:userInfo.name,
        account_type:userInfo.account_type
    }

    this.flash={success:"登录成功"}
    this.redirect('/use/'+userInfo.name)
}