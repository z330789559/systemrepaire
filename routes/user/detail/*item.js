/**
 * Created by baozhong on 2017/2/28.
 */

var Models=require("../../../lib/core");
var $User=Models.$User
exports.get=function* (item) {
    var user=yield $User.getUserById(item)
    if(user){
        $User.delete(user)
    }
    this.redirect("/user/user-list")
}