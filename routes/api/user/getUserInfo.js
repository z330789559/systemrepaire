/**
 * Created by baozhong on 2017/3/7.
 */

var Models=require("../../../lib/core");
var $User=Models.$User


exports.get=function* () {

    var result={
        status:"Fail",
        code:"",
        error:""
    }
    if(!this.session || !this.session.user){
        result.status.error="用户未登录"
        result.code="101"
        return yield this.body=result;
    }
      var name=this.session.user.name;
       var user=   yield $User.getUserByName(name);
       result.status='success';
         result.user=user
       yield this.body=result;
}