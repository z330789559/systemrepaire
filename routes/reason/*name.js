/**
 * Created by baozhong on 2017/2/27.
 */
var models=require("../../lib/core");
var $Reason =models.$Reason;
exports.get=function* (name) {

    $Reason.delete({content:name})
    this.redirect("/reason")
}