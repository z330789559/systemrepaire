/**
 * Created by baozhong on 16/9/6.
 */
var validator =require('validator');

var crypto= require('crypto');

module.exports={
    "GET /index":{
        "request":{
            "session":checkLogin
        }
    },
    "GET /signin":{
        "request":{
            "session":checkNotLogin
        }
    },

    "POST /signin":{
        "request":{
            "session":checkNotLogin,
            "body":checkSigninBody
        }
    },
    "GET /api/signin":{
        "request":{
            "session":checkApiNotLogin
        }
    },

    "POST /api/signin":{
        "request":{
            "body":checkSigninBody
        }
    },

    "GET  /signup":{
        "request":{
            "session":checkNotLogin
        }
    },
    "POST /api/signup":{
        "request":{
            "body":checkSignupBody
        }
    }, 
    "POST /api/order":{
        "request":{
            "session":checkApiLoginOnly,
            "body":checkApiOrderBody
        }
    },
    "POST /signup":{
        "request":{
            "body":checkSignupBody
        }
    },"GET  /create":{
        "request":{
            "session":checkLogin
        }
    },
    "POST /create":{
        "request":{
            "session":checkLogin,
            "body":checkCreateBody
        }
    },
    "POST /orderCountByReasonCode":{
        "request":{
            "body":checkReasonBody
        }
    },
    "POST /orderTimeByEachCatalog":{
        "request":{
            "body":checkReasonBody
        }
    },
    "POST /topic/:id":{
        "request":{
            "session":checkLogin,
            "body":checkReplayTopic
        }
    }
}
function checkReplayTopic() {
    var body=this.request.body;
    var flash;
    if(!body || !body.topic_id || !validator.isMongoId(body.topic_id)){
        flash={error:"回复的帖子不存在"}
    }else if(!body.content){
        flash ={error:"回复的内容不能为空"}
    }
    if(flash){
        this.flash=falsh;
        this.redirect('back')
        return false;
    }
    body.content=validator.trim(body.content)
    return true
}
function checkCreateBody () {
    var body=this.request.body;
    var flash
    if(!body || !body.title || body.title.length <10){
        flash={error:'请填写合法的标题'}
    }
    else if(!body.tab){
        flash={error:'请选择板块'}
    }else if(!body.content){
        flash={error:'请填写内容'}
    }
    if(flash){
        this.flash=flash
        this.redirect("back")
        return false;
    }
    body.title=validator.trim(body.title)
    body.tab=validator.trim(body.tab)
    body.content=validator.trim(body.content)
    return true
}
function  md5(str) {
    return crypto.createHash('md5').update(str).digest('hex')
}


/***
 * api模块
 */

/**
 * 维修单数据校验
 */
function checkApiOrderBody() {
    let body=this.request.body;
    let result={status:"success"}
    if(!body||!body.title){
        result.status="fail";
        result.error="报修原因必须填写";
        this.body=result;
        return false;
    }else if(!body.reasonCode){
        result.status="fail";
        result.error="报修原因编码必须填写";
        this.body=result;
        return false;
    }

    return true
}
function checkApiNotLogin() {
    if(this.session && this.session.user){
       this.body={isLogin:true,user:this.session.user}
        return false
    }
    return true
}
function checkApiLoginOnly(){
    if(!this.session ||!this.session.user) {
        this.body={error:"用户未登录",status:"fail",code:0};
        return false
    }
    return true
}

function  checkApiLogin() {
    if(this.session && this.session.user){
        this.body={isLogin:true,user:this.session.user}
        return true
    }
    this.body={isLogin:false}
    return false
}

/***
 * api模块结束
 */




function checkNotLogin() {
    if(this.session && this.session.user){
        this.flash={error:'已经登陆'}
        this.redirect('back');
        return false
    }
    return true
}
function    checkLogin() {
    if(!this.session || !this.session.user){
        this.flash={error:'未登录'}
        this.redirect('/signin')
        return false
    }
    return true
}
function checkSigninBody() {
    var body=this.request.body;
    var flash
    var result={status:"success"}
    if(!body||!body.name){
        result={error:"请填写用户名",status:"fail"};
        this.body=result
        return false;
    }else if(!body.password){
        result={error:"请填写用户密码",status:"fail"};
        this.body=result
        return false;
    }

    body.name=validator.trim(body.name)
    body.password=md5(validator.trim(body.password))
    return true
}
function checkReasonBody() {
    var body=this.request.body;
    var flash;
    if(!body ||!body.start){
        flash={error:"请选择开始时间"}
    } else if(!body.end){
        flash={error:"请选择结束时间"}
    }
    if(flash){
        this.flash=flash
        this.redirect('back')
        return false
    }
    body.start=validator.trim(body.start)
    body.end=md5(validator.trim(body.end))
    return true
}
function checkSignupBody() {
    var body=this.request.body;
    var flash;
    if(!body ||!body.name){
        flash={error:"请填写用户名"}
    } else if(!body.password){
        flash={error:"请填写密码"}
    } else if(body.password !=body.re_password){
        flash={error:"两次密码不匹配"}
    }else if(body.signature && body.signature.length >50){
        flash={error:"个性签名不能超过50个字"}
    }
    if(flash){
        this.flash=flash
        this.redirect('back')
        return false
    }
    body.name=validator.trim(body.name)
    body.password=md5(validator.trim(body.password))
    return true
}