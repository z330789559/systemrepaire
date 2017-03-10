/**
 * Created by baozhong on 16/9/6.
 */
var models=require("../../lib/core")

var $User=models.$User;
exports.get=function* () {
    // yield this.render('signin');
    var result={isLogin:true}
    if(this.session && this.session.user){
        result.isLogin=true;
        this.session.user=null;
    }
    yield this.body=result
}

