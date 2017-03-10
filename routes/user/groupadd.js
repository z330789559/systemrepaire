/**
 * Created by baozhong on 16/9/6.
 */
var Models =require('../../lib/core')
var $Group=Models.$Group

exports.get=function* () {
    yield this.render('/userAddGroup')
}
exports.post=function* () {
    var data=this.request.body;
      yield $Group.addGroup(data)

    this.flash={sucess:"发布成功"}
    this.redirect('/user/grouplist')
}