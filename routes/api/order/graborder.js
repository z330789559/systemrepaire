/**
 * Created by baozhong on 2017/3/7.
 */
var Models =require('../../../lib/core')
var $Order=Models.$Order

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
            try{
                result.status="success"
                $Order.updateGrapeTime(order,this.session.user.name,_id);
                return yield this.body=result
            }catch (e){
                result.status="fail";
                result.error="用户未登录或者单子已经被抢"
            }
        }

    }else{
        result.status="fail";
        result.error="用户未登录或者单子已经被抢"
    }
   return result
}