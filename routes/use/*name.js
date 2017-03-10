/**
 * Created by baozhong on 16/9/6.
 */
var models=require("../../lib/core");
var $User =models.$User;
exports.get=function* (name) {
    yield this.render('userdetail',{
        User:$User.getUserByName(name)
    })
}