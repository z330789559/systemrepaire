/**
 * Created by baozhong on 2017/2/28.
 */
var Models=require("../../lib/core");
var $User=Models.$User

exports.get=function*() {
    var pageIndex=1
    if(this.querystring){
        pageIndex= this.querystring.match(/^pageIndex=(\d+)/)[1]
    }

    var result={
        status:"success",
        error:""
    }

    var users=$User.getUsers(pageIndex-1);
    yield this.render("user",{
        users:users}
    )
}