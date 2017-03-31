/**
 * Created by baozhong on 2017/3/13.
 */
var models=require("../../lib/core")
var moment=require("moment")
var $Order=models.$Order;
var funUtils=require("../../utils/funUtils").funUtils
var hashCode = function(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
var getMill=function (time) {
    var timeArr=time&& time.split(":")
    return   timeArr[0] * 3600 +  timeArr[1] *60 +timeArr[2]*1
}
exports.get=function*() {
    var pre_time=moment(Date.now()).subtract("1","months").toDate();

    var orders=yield $Order.getOrderByTimeSpan(pre_time)

    _orders=orders.map(function (item) {
        return [item.title,item.operator.name,moment(item.create_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"),
            item.operator.group,item.reasonCode,item.repaireMethod||"",item.score==6?"未评分":item.score,item.repairor||"",item.update_at?moment(item.update_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):"",
            item.report_at?moment(item.report_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):"",item.report_at?moment.utc(moment(item.create_at,"DD/MM/YYYY HH:mm:ss").diff(moment(item.report_at,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"):0]
    })
    _result= _orders.map(function (item) {
        return {"duration":item[10]?getMill(item[10]):0,"update":item[8],"repairor":item[7]}
    })

    _result=_result.filter(function (item) {
        return item["repairor"]!=""
    })
    var dest = funUtils(_result,"repairor","duration");
    var $result= dest.map(function (item) {
        var value=0
        var count=0;
        item.data&&item.data.forEach(function (_item) {
            value+=_item.duration*1
            if(_item.update !=""){
                count++
            }
        })
        var h= Math.floor(value/3600) ,
            m=  Math.floor((value % 3600)/60),
            s= Math.floor((value % 3600) % 60)

        item.totalDuration=[h,m,s].join(":")
        item.count=count;
        return item
    })
    return yield this.render("ordersCountByRepaire",{
        result:$result
    })
}
exports.post=function*() {
   var data= this.request.body
    var start=new Date(data.start),
        end=new Date(data.end);

    var orders=yield $Order.getOrderByTime(start,end);

    _orders=orders.map(function (item) {
        return [item.title,item.operator.name,moment(item.create_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"),
            item.operator.group,item.reasonCode,item.repaireMethod||"",item.score==6?"未评分":item.score,item.repairor||"",item.update_at?moment(item.update_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):"",
            item.report_at?moment(item.report_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):"",item.report_at?moment.utc(moment(item.create_at,"DD/MM/YYYY HH:mm:ss").diff(moment(item.report_at,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"):0]
    })
    _result= _orders.map(function (item) {
        return {"duration":item[10]?getMill(item[10]):0,"update":item[8],"repairor":item[7]}
    })
    _result=_result.filter(function (item) {
        return item["repairor"]!=""
    })

    var dest = funUtils(_result,"repairor","duration");
    var $result= dest.map(function (item) {
        var value=0
        var count=0;
        item.data&&item.data.forEach(function (_item) {
            value+=_item.duration*1
            if(_item.update !=""){
                count++
            }
        })
        var h= Math.floor(value/3600) ,
            m=  Math.floor((value % 3600)/60),
            s= Math.floor((value % 3600) % 60)

        item.totalDuration=[h,m,s].join(":")
        item.count=count;
        return item
    })
    return yield this.render("ordersCountByRepaire",{
        result:$result
    })
}