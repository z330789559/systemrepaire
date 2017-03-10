/**
 * Created by baozhong on 16/9/6.
 */
var models=require("../lib/core")

var $Topic=models.$Topic

exports.get=function* () {
    var tab=this.query.tab;
    var p=this.query.p||1;
    yield this.render('index',{
        topics: $Topic.getTopicsByTab(tab,p)
    })
}