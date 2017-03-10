/**
 * Created by baozhong on 16/9/6.
 */
var Order =require("../models").Order

exports.addOrder=function (data) {
    return Order.create(data)
    
}
exports.getAllOrderCount=function () {
    return Order.count().exec()
}
exports.getOrderByTopicId=function (id) {
    return Order.findOne({"_id":id}).exec()
}

exports.getOrderByOperatorName=function (operatorname,pageindex) {
    return Order.find({"operator.name":operatorname}).sort({"create_at":"-1"}).skip(pageindex).limit(10).exec()
}

exports.getMyRepairedOrderByOperatorName=function (operatorname,pageindex) {
    return Order.find({"repairor":operatorname}).or([{"stateCode":"维修完成"},{"stateCode":"维修完成"}]).sort({"report_at_at":"-1"}).skip(pageindex).limit(10).exec()
}

exports.getMyRepairingOrderByOperatorName=function (operatorname,pageindex) {
    return Order.find({"repairor":operatorname,"stateCode":"维修中"}).sort({"update_at":"-1"}).skip(pageindex).limit(10).exec()
}

exports.getAllAcceptableOrders=function (pageindex) {
    return Order.find({"stateCode":"待维修"}).sort({"create_at":"-1"}).skip(pageindex).limit(10).exec()
}


exports.getAllOrders=function (pageindex) {
    return Order.find().sort({"create_at":"-1"}).skip(pageindex).limit(10).exec()
}
exports.updateGrapeTime=function (order,name) {

    return order.update({"repairor":name,"stateCode":"维修中",update_at:Date.now()}).exec()
}
exports.updateReport=function (order,repaireMethod) {

    return order.update({"stateCode":"维修完成","repaireMethod":repaireMethod,report_at:Date.now()}).exec()
}

exports.updateScore=function (order,score) {

    return order.update({"stateCode":"评价完成","score":score}).exec()
}
exports.delete=function (order) {
    return order.remove()
}
exports.getOrderByTimeSpan=function (date) {
    return Order.find().where('create_at').gt(date)
}