/**
 * Created by baozhong on 2017/3/10.
 */
var Models =require('../../../lib/core')
var $Order=Models.$Order

exports.post=function* () {
    var data=this.request.body;
    var score=data.score
    var _id=data._id
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
                yield $Order.updateScore(order,score,_id);
                return  this.body=result
            }catch (e){
                result.status="fail";
                result.error="发生未知错误"
            }
        }

    }else{
        result.status="fail";
        result.error="用户未登录"
    }
    return result
}