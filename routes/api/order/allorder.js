/**
 * Created by baozhong on 2017/3/8.
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

        var orders=yield $Order.getAllOrdersApi((pageIndex-1) * 10)
        result.orders=orders;
        return yield this.body=result

}