/**
 * Created by baozhong on 2017/5/10.
 */
var models=require("../../lib/core")
var $Comment=models.$Comment

exports.get=function* () {
    var scoreshow=yield $Comment.getCommentStatus();
    if(scoreshow.length==0){
        scoreshow=[{"scoreshow":"1"}];
    }
     yield  this.body={"scoreStatus":scoreshow[0].scoreshow}

}
