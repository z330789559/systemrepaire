/**
 * Created by baozhong on 16/9/6.
 */
var mongoose= require("mongoose");

var Schema=mongoose.Schema;

var UserSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:false
    },
    signature:{
        type:String
    },
    create_at:{
        type:Date,
        default:Date.now
    },
    update_at:{
        type:Date,
        default:Date.now
    },
    account_type:{
        type:String,
        required:true
    },
    group:{
        type:String,
        required:false
    }
});
UserSchema.index({name:1});

module.exports=mongoose.model("User",UserSchema);