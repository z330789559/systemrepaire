/**
 * Created by baozhong on 16/9/6.
 */

var mongoose= require("mongoose")

var Schema=mongoose.Schema;

var GrouptSchema= new Schema({

    content:{type:String,required:true},

    create_at:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Group",GrouptSchema)