/**
 * Created by baozhong on 16/9/6.
 */
var Models =require('../lib/core')
var $Topic=Models.$Topic

exports.get=function* () {
     yield this.render('create')
}
exports.post=function* () {
    var data=this.request.body;
    data.operator={};
    data.operator.name=this.session.user.name;
    data.operator.group=this.session.user.group;
    var topic=yield $Topic.addTopic(data)

    this.flash={sucess:"发布成功"}
    this.redirect('/topic/'+topic._id)
}