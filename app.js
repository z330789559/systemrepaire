/**
 * Created by baozhong on 16/9/6.
 */
var app = require("koa")();
var cors = require('koa-cors');
var logger = require("koa-logger")

var bodyparser = require("koa-bodyparser")

var staticCache = require("koa-static-cache")

var errorhandler = require("koa-errorhandler")

var session = require("koa-generic-session")

var mongoStore = require("koa-generic-session-mongo")

var flash = require("koa-flash")

var gzip = require("koa-gzip")

var scheme = require("koa-scheme")

var router = require("koa-frouter")

// var routerCache = require("koa-router-cache")
var Interceptor=require("./utils/interceptor")
var render = require("co-ejs")

var config = require("config-lite")

var merge=require("merge-descriptors")

var core=require("./lib/core")

var renderConfig=require(config.renderConf)

merge(renderConfig.locals||{},core,false);

app.keys=[renderConfig.locals.$app.name]

app.use(errorhandler());

app.use(cors());
app.use(bodyparser());

app.use(staticCache(config.staticCacheConf))

app.use(logger())

app.use(session({
    store:new mongoStore(config.mongodb)
}))
app.use(Interceptor())

app.use(flash())

app.use(scheme(config.schemeConf))

// app.use(routerCache(app,config.routerCacheConf))

app.use(gzip())

app.use(render(app,renderConfig))

app.use(router(app,config.routerConf))

// app.listen(config.port,function () {
//     console.log('server listening on :',config.port)
// })
if(module.parent){
    module.exports=app.callback();
}else{
 app.listen(config.port,function () {
    console.log('server listening on :',config.port)
})
}