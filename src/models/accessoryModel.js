import mongoose from "mongoose";
const accessorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    title: { type: String, required: true },
    tag: { type: String, required: true },
    price: { type: String, required: true },
    sizes: { type: String, required: false},
    image: { type: String, required: false },
  
})



const accessoryModel = mongoose.models.accessory || mongoose.model("accessory", accessorySchema);

export default accessoryModel;


