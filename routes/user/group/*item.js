/**
 * Created by baozhong on 2017/3/10.
 */
var Models=require("../../../lib/core");
var $Group=Models.$Group
exports.get=function* (item) {
    var group=yield $Group.getById(item)
    if(group){
        $Group.delete(group)
    }
    this.redirect("/user/grouplist")
}