/**
 * Created by baozhong on 2017/3/21.
 */
var JPush=require("jpush-sdk")
var cfg=require('../utils/config')
var client=JPush.buildClient(cfg.APPKEY, cfg.MASTERSECRET)

module.exports.sendMessage=function (message,usernames,orderid) {
    client.push().setPlatform(JPush.ALL)
        .setAudience(JPush.alias(usernames))
        .setNotification(message,  JPush.android(message, '抢单啦',7, {'orderid':orderid}))
        // .setMessage("要强的订单","抢单啦",null,{orderid:orderid})
        .send(function(err, res) {
            if (err) {
                console.log(err.message)
            } else {
                console.log('Sendno: ' + res.sendno)
                console.log('Msg_id: ' + res.msg_id)
            }
        });
}