/**
 * Created by baozhong on 2017/2/27.
 */
var Reason =require("../models").Reason

exports.addReason=function (data) {
    return Reason.create(data)
}   

exports.getAllReason=function () {
    return Reason.find().exec();
}
exports.delete=function (data) {
    return  Reason.remove(data)
}

exports.getReasonByContent=function (data) {
    return Reason.find(data).exec();
}