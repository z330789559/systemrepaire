/**
 * Created by baozhong on 2017/3/8.
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

        var orders=yield $Order.getAllOrdersApi((pageIndex-1) * 10)
    var scoreshow=yield $Comment.getCommentStatus();
    if(scoreshow.length==0){
        scorestatus="1"
    }else{
        scorestatus=scoreshow[0].scoreshow
    }
    result.scorestatus=scorestatus;
    result.orders=orders;
        result.orders=orders;
        return  this.body=result

}