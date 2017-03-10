/**
 * Created by baozhong on 16/9/6.
 */
var app=require("../package")
var Models=require("../../lib/core")

module.exports={
    get $app(){
        return app
    },
    get $User(){
        return Models.$User
    },
    get $Order(){
        return Models.$Order
    }
}