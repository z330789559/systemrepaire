/**
 * Created by baozhong on 16/9/6.
 */
var models=require("../lib/core")
var $Group=models.$Group
var $User=models.$User;
exports.get=function* () {
    var groups=yield  $Group.getAllGroup()
    yield this.render('signup',{
        groups:groups
    })
}

exports.post=function* () {
    var data=this.request.body;
    var userExist=yield $User.getUserByName(data.name)
    if(userExist){
        this.flash={error:"用户名已经存在"};
        return this.redirect("/")
    }
    yield  $User.addUser(data);

    this.session.user={
        name:data.name,
        email:data.email
    }
    this.flash={success:"注册成功"}
    return this.redirect("/")
};