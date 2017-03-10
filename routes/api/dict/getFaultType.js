/**
 * Created by baozhong on 2017/3/7.
 */
var Models =require('../../../lib/core')
var $Reason=Models.$Reason

exports.get=function* () {
    var faultTypes= yield  $Reason.getAllReason()
    var reasons= faultTypes.map(function (item) {
        return item.content
    })
    return this.body={
        faultTypes:reasons
    }
}