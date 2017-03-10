/**
 * Created by baozhong on 2017/2/27.
 */
var models=require("../../lib/core")

var $Order=models.$Order;

exports.get=function*() {
    var pageIndex=1
    if(this.querystring){
        pageIndex= this.querystring.match(/^pageIndex=(\d+)/)[1]
    }
    var orders=yield $Order.getAllOrders((pageIndex-1) * 10)
    yield  this.render("orders",{
        orders:orders
    })
}