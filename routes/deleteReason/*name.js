/**
 * Created by baozhong on 2017/2/27.
 */
var Models=require("../../lib/core");
var $Reason=Models.$Reason

exports.get=function*(data) {
    yield $Reason.delete({content:data})
    this.redirect("/reason")
}
