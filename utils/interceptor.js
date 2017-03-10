/**
 * Created by baozhong on 2017/2/27.
 */
module.exports=function (options) {
    return function* (next) {
        var body = this.body;
        var request= this.request;
        if( this.request.url.indexOf("/api")>-1){
            return  yield *next;
        }else{
        if(request.url.indexOf("index")>-1 && !(this.session && this.session.user && this.session.user.account_type==3)){
            return  this.redirect("/signin")
        }

        if((request.url.indexOf("api")>-1||request.url.indexOf("unauthor")>-1||
            request.url.indexOf("signin")>-1||request.url.indexOf("logout")>-1 ||request.url.indexOf("signup")>-1)){
          return  yield *next;
        }
        if(this.session && this.session.user && this.session.user.account_type=="管理员"){
            return yield *next;
        }
          this.redirect("/unauthor")
        }
    }
}


