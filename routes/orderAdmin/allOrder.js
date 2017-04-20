/**
 * Created by baozhong on 2017/2/27.
 */
var models=require("../../lib/core")
 var moment=require("moment")
var $Order=models.$Order;

exports.get=function*() {
    var pageIndex=1,
        end=new Date(),
        start=moment(Date.now()).subtract("1","months").toDate()
    if(this.querystring){
        pageIndex= this.querystring.match(/pageIndex=(\d+)/)&&this.querystring.match(/pageIndex=(\d+)/)[1]||1
        start=this.querystring.match(/start=(\d{4}-\d{2}-\d{2})/)&&this.querystring.match(/start=(\d{4}-\d{2}-\d{2})/)[1]||start
         end=this.querystring.match(/end=(\d{4}-\d{2}-\d{2})/)&&this.querystring.match(/end=(\d{4}-\d{2}-\d{2})/)[1]||end
    }

    var orders=yield $Order.getAllOrders((pageIndex-1) * 10,start,end)

    _orders=orders.map(function (item) {
        return [item.title,item.operator.name,moment(item.create_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"),
            item.operator.group,item.reasonCode,item.repaireMethod||"",item.score==6?"未评分":item.score,item.repairor||"",item.update_at?moment(item.update_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):"",
            item.report_at?moment(item.report_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):"",item.report_at?moment.utc(moment(item.report_at,"DD/MM/YYYY HH:mm:ss").diff(moment(item.create_at,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"):""]
    })
    var dataLength=yield $Order.getAllOrdersCountByTime(start,end)
    yield  this.render("orders",{
        orders:_orders,
        start:start,
        end:end,
        dataLength:dataLength
    })
}