/**
 * Created by baozhong on 16/9/8.
 */
var app=require('koa')
var cache =require('koa-router-cache')

var count =0;
app.use(cache(app,{
    "/":{
        key:"/",
        evtname:5 *1000
    }
}))
    app.use(function* () {
        this.body= count++;
        if(count ===5){
            count=0;
        }
        this.app.emit(this.url)
    })
app.listen(3000,function () {
    console.log('listening on 3000')
})