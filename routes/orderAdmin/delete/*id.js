/**
 * Created by baozhong on 2017/3/10.
 */
var Models=require("../../../lib/core");
var $Order=Models.$Order
exports.get=function* (id) {
    var order=yield $Order.getOrderByTopicId(id)
    if(order){
        $Order.delete(order)
    }
    this.redirect("/orderAdmin/allOrder")
}