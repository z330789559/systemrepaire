/**
 * Created by baozhong on 2017/2/15.
 */
var models=require("../../lib/core")
var $Jpush=models.$Jpush
var $Order=models.$Order;
var $Reason=models.$Reason;
exports.post=function* () {
    var data=this.request.body;
    var result={}
    data.operator={}
    data.operator.name=this.session.user.name;
    data.operator.group=this.session.user.group||1;
    try{
        yield  $Order.addOrder(data);
        yield    $Jpush.sendMessage(data.operator.group+"组的"+data.operator.name+"报修设备"+data.title)
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