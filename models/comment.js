/**
 * Created by baozhong on 16/9/6.
 */

var mongoose= require("mongoose")

var Schema=mongoose.Schema;

var CommentSchema= new Schema({
    scoreshow:{default:"1",type:String}

})

module.exports=mongoose.model("Comment",CommentSchema)