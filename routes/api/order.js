/**
 * Created by baozhong on 2017/2/15.
 */
var models=require("../../lib/core")

var $Order=models.$Order;
var $Reason=models.$Reason;
exports.post=function* () {
    let data=this.request.body;
    let result={}
    data.operator={}
    data.operator.name=this.session.user.name;
    data.operator.group=this.session.user.group||1;
    try{
    yield  $Order.addOrder(data);
    }catch(e){
        result.error="保存失败";
        result.status="fail"
    }
    result.error="保存成功";
    result.status="success";
    yield this.body=result;
}
exports.get=function () {
    
}