/**
 * Created by baozhong on 16/9/6.
 */
var Topic =require("../models").Topic

var cache=require('co-cache')({
    expire:10000
})
exports.addTopic=function (data) {
    return Topic.create(data)
}

exports.getTopicById=function (id) {
    return Topic.findByIdAndUpdate(id,{$inc:{pv:1}}).exec()
}

exports.getTopicsByTab=function getTopicsByTab(tab,p) {
    var query = {};
    if (tab) {
        query.tab = tab
    }
    return Topic.find(query).skip((p - 1) * 10).sort('-updated_at').limit(10).select("-content").exec();
}


exports.getTopicByName=function (name) {
    return Topic.find({'user.name':name}).sort('-updated_at').exec()
}

exports.incCommentById=function (id) {
   return Topic.findByIdAndUpdate(id,{$inc:{comment:1}}).exec() 
}

exports.getNoReplyTopics =function getNoReplyTopic() {
    return Topic.find({comment:0}).sort('-updated_at').limit(5).select('title').exec()
}

exports.getTopicsCount=function getTopicsCount(tab) {
    var query = {}
    if (tab) {
        query.tab = tab
    }
    return Topic.count(query).exec()
}