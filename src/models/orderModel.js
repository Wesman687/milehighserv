import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [],
    totalPrice: {type:Number, required:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    stateid: {type: String, required: true},
    phone: {type: String, required: true},
    transactionId:{type:String, required:true},
    shippingState:{type: String, required: false},
    orderId: {type: String, required: false},
    orderNumber:{type: String, required:false},
    zip:{type: String, required:true},
    paymentStatus:{type:String, default:"Pending"},
    createdAt:{type:Date, default:new Date()},
    uid:{type:String, required:true}
})

const orderModel = mongoose.model("order", orderSchema)

export default orderModel;
