/**
 * Created by baozhong on 2017/2/8.
 */
var  fetch =require('node-fetch')
module.export=(...args)=>{
    return fetch.apply(null, args).then(function (res) {
        return res.text()
    })
}