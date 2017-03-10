/**
 * Created by baozhong on 2017/3/9.
 */
/**
 * Created by baozhong on 2017/3/7.
 */
var Models =require('../../../lib/core')
var $Order=Models.$Order
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
        var orders=yield $Order.getMyRepairedOrderByOperatorName(this.session.user.name,(pageIndex-1) * 10)
        result.orders=orders;
        return yield this.body=result
    }else{
        result.status="fail";
        result.error="用户未登录"
    }

}