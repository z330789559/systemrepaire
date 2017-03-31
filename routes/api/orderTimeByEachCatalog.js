/**
 * Created by baozhong on 2017/2/27.
 */
var models=require("../../lib/core")
 var moment=require("moment")
var $Order=models.$Order;
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
    var pageIndex=1
    // var indexObj={"key":"",index:0,value:0}
    var index=0
    var _result=[]
    var switchArr=[]
    if(this.querystring){
        pageIndex= this.querystring.match(/^pageIndex=(\d+)/)[1]
    }
    var orders=yield $Order.getAllOrders((pageIndex-1) * 10)

    _orders=orders.map(function (item) {
        return [item.title,item.operator.name,moment(item.create_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"),
            item.operator.group,item.reasonCode,item.repaireMethod||"",item.score==6?"未评分":item.score,item.repairor||"",item.update_at?moment(item.update_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):"",
            item.report_at?moment(item.report_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):"",item.report_at?moment.utc(moment(item.create_at,"DD/MM/YYYY HH:mm:ss").diff(moment(item.report_at,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"):0]
    })
    _result= _orders.map(function (item) {
        return {"duration":item[10]?getMill(item[10]):0,"title":item[0]}
    })
    var map = {},
        dest = [];
    for(var i = 0; i < _result.length; i++){
        var ai = _result[i];
        if(!map[ai.title]){
            dest.push({
                title:ai.title,
                duration:ai.duration,
                data:[ai]
            });
            map[ai.title] = ai;
        }else{
            for(var j = 0; j < dest.length; j++){
                var dj = dest[j];
                if(dj.title == ai.title){
                    dj.data.push(ai);
                    break;
                }
            }
        }
    }
    dest.map(function (item) {
        var value=0
        item.data&&item.data.forEach(function (_item) {
            value+=_item.duration*1
        })
      var h= Math.floor(value/3600) ,
          m=  Math.floor((value % 3600)/60),
          s= Math.floor((value % 3600) % 60)

        item.totalDuration=[h,m,s].join(":")
    })
   return  this.body={
        "result":dest
    }
}

