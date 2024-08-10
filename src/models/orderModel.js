import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [],
    total: {type:Number, required:true},
    transactionId:{type:String, required:true},
    paymentStatus:{type:String, default:"Pending"},
    createdAt:{type:Date, default:new Date()},
    uid:{type:String, required:true}
})

const orderModel = mongoose.model("order", orderSchema)

export default orderModel;