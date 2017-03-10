/**
 * Created by baozhong on 16/9/6.
 */
var Comment=require("./comment")

var Topic=require("./topic")

var User=require("./user")

var Order=require("./order")

var Group=require("./group")

var Reason=require("./reason")

var Type=require("./package.json")

module.exports={
    get  $User(){
        return User
    },
    get $Comment(){
     return Comment
    },
    get $Topic(){
        return Topic
    },
    get $Order(){
        return Order
    },
    get $Group(){
        return Group
    },
    get $Reason(){
        return Reason
    },
    get $Type(){
        return Type
    }

}
