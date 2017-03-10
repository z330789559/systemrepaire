/**
 * Created by baozhong on 2017/2/27.
 */

var Models=require("../lib/core");
var $Reason=Models.$Reason

exports.get=function*() {
    yield this.render("reasonAdd")
}

exports.post=function*() {
    var data=this.request.body;;

   var reason= yield $Reason.getReasonByContent(data)
    if(!reason || reason.length==0 ){
        this.flash={success:"创建成功"}
        $Reason.addReason(data)
    }else{
        this.flash={success:"添加失败，已存在"}
    }

   this.redirect("/reason")
}