/**
 * Created by baozhong on 2017/5/9.
 */
var models=require("../../lib/core")
var $Comment=models.$Comment

exports.get=function* () {
    var scoreshow=yield $Comment.getCommentStatus();
    if(scoreshow.length==0){
        yield $Comment.addCommentStatus({"scoreshow":"1"});
        scoreshow=[{"scoreshow":"1"}];
    }
    return yield  this.render("scoreshow",{
        scoreshow:scoreshow[0].scoreshow
    })
}

exports.post=function*() {

   var scoreStatus="1";
   var  data=this.request.body;
    scoreStatus=data.scoreshow;
    var scoreshow=yield $Comment.getCommentStatus();
    yield $Comment.updateCommentStatus(scoreshow[0],scoreStatus)
    return   this.redirect("scoreStatus")
}