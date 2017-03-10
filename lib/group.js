/**
 * Created by baozhong on 2017/2/27.
 */
var Group =require("../models").Group

exports.addGroup=function (data) {
    return Group.create(data)
}   
exports.getById=function (_id) {
    return Group.findOne({"_id":_id}).exec();
}
exports.getAllGroup=function () {
    return Group.find().sort('-updated_at').limit(10).exec();
}

exports.getGroupCount=function () {
    return Group.count().exec()
}
exports.delete=function (group) {
    return group.remove();
}