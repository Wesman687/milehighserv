import mongoose from "mongoose";


const numberSchema = new mongoose.Schema({
    orderNumber: {type: Number, required: true}
})


const numberModel = mongoose.model("number", numberSchema)

export default numberModel;