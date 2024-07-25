import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true }
})

const flowerModel = mongoose.models.flower || mongoose.model("flower", flowerSchema);

export default flowerModel;