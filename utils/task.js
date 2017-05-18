/**
 * Created by baozhong on 2017/5/8.
 */

var models=require("../lib/core")
var Jpush=models.$Jpush
var Order=models.$Order;
var User=models.$User;
var moment=require("moment")
function exeGenerator(fn,params) {
    var result=fn.next(params)
    if(!result.done) exeGenerator(fn,result.value)
}

module.exports=function (options) {
    //每隔30秒查看又没有空闲的机修
    var cacheRestore=options.cacheRestore
    var fun_task=function() {
        var usernames= User.findIdelUser()
        usernames.then(function (data) {
            var _usernames= data.map(function (item) {
                return item.name
            })
            var keys= cacheRestore.keys();
            keys.forEach(function (key) {
                var order=  cacheRestore.get(key)
                if(Date.now()-order.startTime >17000){
                    console.log("30s推送的订单："+key)
                    Jpush.sendMessage(order.message,_usernames.join(","),key)
                }
            })
        })

    }
    setInterval(function () {
      fun_task()
    },30 * 1000)
    //90秒内没人接单
    var repost_task=function() {
        var time=moment(Date.now()).subtract("90","seconds").toDate();
        console.log("当前任务时间"+time)
           Order.findUnprocessOrder(time)
            .then(function (data) {
                console.log("当前人物订单数据"+JSON.stringify(data))
                 var orders=data;
                var usernames=  User.findIdelUser()
                    .then(function (users) {
                        var _usernames= users.map(function (item) {
                            return item.name
                        })
                        orders.forEach(function (item) {
                            console.log("90s推送的订单："+item._id)
                            Jpush.sendMessage(item.operator.group+"组的"+item.operator.name+"报修设备"+item.title,_usernames.join(","),item._id)
                        })
                    })

            },function (error) {
               console.log(error)
            });

    }

    setInterval(function () {
        repost_task()
    },90000)
   return function *(next) {
       return yield *next
   }
}