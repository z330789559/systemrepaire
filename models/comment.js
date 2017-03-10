/**
 * Created by baozhong on 16/9/6.
 */

var mongoose= require("mongoose")

var Schema=mongoose.Schema;

var ObjectId=Schema.ObjectId

var CommentSchema= new Schema({

    user:{
        name:{type:String,required:true},
        email:{type:String,required:true}
    },
    content:{type:String,required:true},

    create_at:{
        type:Date,
        default:Date.now
    },
    update_at:{
        type:Date,
        default:Date.now
    }
})

CommentSchema.index({topic_id:1,update_at:-1})

module.exports=mongoose.model("Comment",CommentSchema)