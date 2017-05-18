/**
 * Created by baozhong on 2017/3/7.
 */
var Models =require('../../../lib/core')
var $Order=Models.$Order
var $User=Models.$User
var $Comment=Models.$Comment;
exports.get=function* () {
    var _id=this.querystring.match(/^_id=(\w+)&?/)[1];
    var result={
        status:"success",
        error:""
    }
    if(this.session && this.session.user &&_id){
       var order= yield  $Order.getOrderByTopicId(_id)
        if(!order){
            result.status="fail";
            result.error=" 订单不存在"
        }else{
            if(order.repairor){
                result.status="fail";
                result.error="单子已经被抢"
                return  this.body=result
            }else {
                try{
                    result.status="success"
                    result.order= yield $Order.updateGrapeTime(order,this.session.user.name,_id);
                    var user=yield $User.getUserByName(this.session.user.name)
                    yield $User.updateStatusBusy(user)
                    return  this.body=result
                }catch (e){
                    result.status="fail";
                    result.error="用户未登录或者单子已经被抢"
                }
            }

        }

    }else{
        result.status="fail";
        result.error="用户未登录或者单子已经被抢"
    }
    return  this.body=result
}