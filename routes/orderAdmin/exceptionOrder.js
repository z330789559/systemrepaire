/**
 * Created by baozhong on 2017/5/9.
 */
var models=require("../../lib/core")
var moment=require("moment")
var $Order=models.$Order;
exports.get=function*() {
    var orders=yield $Order.findUnpushMessage();
    _orders=orders.map(function (item) {
        return [item.title,item.operator.name,moment(item.create_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"),
            item.operator.group,item.reasonCode]
    })
    return yield  this.render("exception_orders",{
        orders:_orders
    })
}

