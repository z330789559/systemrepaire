/**
 * Created by baozhong on 16/9/6.
 */
var Models =require('../../lib/core')
var $Group=Models.$Group

exports.get=function* () {
   var groups= yield $Group.getAllGroup();
    yield this.render("/userGroup",{
        groups:groups
    })
}
