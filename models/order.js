/**
 * Created by baozhong on 16/9/6.
 */

var mongoose= require("mongoose")

var Schema=mongoose.Schema;


var OrderSchema= new Schema({
    /**
     *  设备编号
     */
    title:{type:String,required:true},
    /**
     * 预防措施
     */
    info:{type:String,required:false},
    /**
     * 订单状态
     */
    stateCode:{type:String,required:false},
    /**
     * 故障原因
     */
    reasonCode:{type:String,required:false},

    repaireMethod:{type:String,required:false},
    /**
     * 提报人姓名和组别
     */
    operator:{
        name:{type:String,required:true},
        group:{type:String,required:true}
    },
    repairor:{type:String,required:false},
    /**
     * 评论得分
     */
    score:{type:Number,default:6},
    scoreDescription:{type:String},
    create_at:{
        type:Date,
        default:Date.now
    },
    update_at:{
        type:Date
    },
    report_at:{
        type:Date
    }
})

OrderSchema.index({update_at:-1})
OrderSchema.index({operator:-1})
OrderSchema.index({repairor:-1})

module.exports=mongoose.model("Order",OrderSchema)