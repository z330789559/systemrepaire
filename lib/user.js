/**
 * Created by baozhong on 16/9/6.
 */
var User =require('../models').User

exports.addUser=function (data) {
    return User.create(data)
}
exports.updateStatusBusy=function (user) {
    return user.update({"status":1})
}
exports.updateStatusIdel=function (user) {
    return user.update({"status":0})
}

exports.getUserById=function (id) {
    return User.findById(id).exec();
}
exports.findIdelUser=function () {
    return User.find({"status":0,"account_type":"维修员"}).select('name').exec();
}
exports.getUserByName=function (name) {
    return User.findOne({name:name}).exec()
}
exports.getUsers=function (pageIndex) {
    return User.find().skip(pageIndex *10).limit(10).exec();
}
exports.delete=function (user) {

    return user.remove();
}
exports.getUserCount=function () {
    return User.count().exec();
}