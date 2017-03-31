/**
 * Created by baozhong on 2017/3/21.
 */
var JPush=require("jpush-sdk")
var cfg=require('../utils/config')
var client=JPush.buildClient(cfg.APPKEY, cfg.MASTERSECRET)

module.exports.sendMessage=function (message) {
    client.push().setPlatform(JPush.ALL)
        .setAudience(JPush.ALL)
        .setNotification(message, JPush.ios('ios alert', 'happy', 5))
        .send(function(err, res) {
            if (err) {
                console.log(err.message)
            } else {
                console.log('Sendno: ' + res.sendno)
                console.log('Msg_id: ' + res.msg_id)
            }
        });
}