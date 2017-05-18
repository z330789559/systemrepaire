/**
 * Created by baozhong on 2017/3/9.
 */
/**
 * Created by baozhong on 2017/3/7.
 */
var Models =require('../../../lib/core')
var $Order=Models.$Order
var $Comment=Models.$Comment;
exports.get=function* () {
    var pageIndex=1
    if(this.querystring){
        pageIndex= this.querystring.match(/^pageIndex=(\d+)/)[1]
    }

    var result={
        status:"success",
        error:""
    }
    if(this.session && this.session.user){
        var orders=yield $Order.getMyRepairingOrderByOperatorName(this.session.user.name,(pageIndex-1) * 10)
        var scoreshow=yield $Comment.getCommentStatus();
        if(scoreshow.length==0){
            scorestatus="1"
        }else{
            scorestatus=scoreshow[0].scoreshow
        }
        result.scorestatus=scorestatus;
        result.orders=orders;
        return yield this.body=result
    }else{
        result.status="fail";
        result.error="用户未登录"
    }

}