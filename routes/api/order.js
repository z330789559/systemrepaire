/**
 * Created by baozhong on 2017/2/15.
 */
var models=require("../../lib/core")
var $Jpush=models.$Jpush
var $Order=models.$Order;
var $User=models.$User;
var $Comment=models.$Comment;
exports.post=function* () {
    var data=this.request.body;
    var cacheRestore=this.cacheRestore;
    var result={}
    data.operator={}
    data.operator.name=this.session.user.name;
    data.operator.group=this.session.user.group||1;
    try{
         var _orderid=yield  $Order.addOrder(data);
           orderid=_orderid&&_orderid._id?_orderid._id.toString():null;
        if(orderid){
              var usernames=yield $User.findIdelUser()
           var _usernames= usernames.map(function (item) {
               return item.name
           })
            if(_usernames.length >0){  //有空闲人员就参与与维修
              $Jpush.sendMessage(data.operator.group+"组的"+data.operator.name+"报修设备"+data.title,_usernames.join(","),orderid)
            }else{
                 cacheRestore.put(orderid,{"orderid":orderid,"startTime":Date.now(),"message":data.operator.group+"组的"+data.operator.name+"报修设备"+data.title},2*60*1000,function (orderid) {
                     $Order.getOrderByTopicId(orderid).then(function (ordermodel) {
                         $Order.updatePushstate(ordermodel)
                     })

                 })
        }
        }else{
            result.error="保存失败";
            result.status="fail"
           return yield this.body=result;
        }
    }catch(e){
        result.error="保存失败";
        result.status="fail"
        return yield this.body=result;
    }
    result.error="保存成功";
    result.status="success";
    return yield this.body=result;
}
exports.get=function* () {
    var orderid=this.querystring.match(/orderid=([0-9a-z]+)/)&&this.querystring.match(/orderid=([0-9a-z]+)/)[1]||null
        var order= yield $Order.getOrderByTopicId(orderid)
         var scoreshow=yield $Comment.getCommentStatus();
    if(scoreshow.length==0){
        scorestatus="1"
    }else{
        scorestatus=scoreshow[0].scoreshow
    }
    order["scorestatus"]=scorestatus;
     return yield this.body=order;
}
