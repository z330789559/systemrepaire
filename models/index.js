/**
 * Created by baozhong on 16/9/6.
 */
var mongoose=require('mongoose')

var config=require("config-lite").mongodb;

mongoose.connect(config.url,function (err) {
   if(err) {
       console.error('connect to %s error : ',config.url,err.message)
       process.exit(1)
   }
})

exports.User=require("./user")

exports.Comment=require("./comment")

exports.Topic=require("./topic")

exports.Order=require("./order")

exports.Group=require("./group")

exports.Reason=require("./Reason")