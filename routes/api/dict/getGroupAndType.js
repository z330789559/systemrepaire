/**
 * Created by baozhong on 2017/3/7.
 */
var Models =require('../../../lib/core')
var $Group=Models.$Group
var $type=Models.$Type

exports.get=function* () {
    var groups=yield $Group.getAllGroup();
    var types=  $type.accountTypes;
   var _groups= groups.map(function (item) {
      return item.content
    })
    return this.body={
        groups:_groups,
        types:types
    }
}
