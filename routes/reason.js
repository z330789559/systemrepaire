/**
 * Created by baozhong on 2017/2/27.
 */

var Models =require('../lib/core')
var $Reason=Models.$Reason

exports.get=function* () {
  var  reasons= yield $Reason.getAllReason();
    yield this.render("reason",{
      reasons: reasons
    })
}