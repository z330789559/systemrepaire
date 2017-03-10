/**
 * Created by baozhong on 16/9/6.
 */
var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var TopicSchema= new Schema({
    user:{
        name:{type:String,required:true},
        email:{type:String,required:true}
    },
    title:{type:String,required:true},
    content:{type:String,required:true},
    tab:{type:String,required:true},
    pv:{type:Number,default:0},
    comment:{type:Number,default:0},
    create_at:{
        type:Date,
        default:Date.now
    },
    update_at:{
        type:Date,
        default:Date.now
    }
})
TopicSchema.index({tab:1,update_at:-1})

TopicSchema.index({'user.name':1,update_at:-1})

module.exports=mongoose.model("Topic",TopicSchema);