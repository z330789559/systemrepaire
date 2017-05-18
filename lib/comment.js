/**
 * Created by baozhong on 16/9/6.
 */
var Comment =require("../models").Comment

exports.addCommentStatus=function (data) {
    return Comment.create(data)
    
}

exports.getCommentStatus=function () {
    return Comment.find().exec()
}

exports.updateCommentStatus=function (comment,scoreshow) {
    return comment.update({"scoreshow":scoreshow})
}