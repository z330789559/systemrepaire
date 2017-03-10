/**
 * Created by baozhong on 16/9/6.
 */
var Models =require("../../lib/core");
var $Topic =Models.$Topic;
var $Comment=Models.$Comment;
exports.get=function*(id) {
   yield this.render("topic",{
       topic:$Topic.getTopicById(id),
       comments:$Comment.getCommentByTopicId(id)
   })
}
exports.post=function*(id) {
    var data=this.request.body;
    data.user=this.session.user;
    yield[
        $Comment.addComment(data),
        $Topic.incCommentById(id)
    ]

    this.flash={success:"回复成功"};
    this.redirect(this.query.redirect||'back')
}
