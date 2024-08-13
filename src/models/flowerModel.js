import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema({   

    name: { type: String, required: true },
    desc: { type: String, required: true },
    title: { type: String, required: true },
    prices: { type: Array, required: true},
    price: { type: String, required: false },
    image: { type: String, required: true },
    category: { type: String, required: true}
})

const flowerModel = mongoose.models.flower || mongoose.model("flower", flowerSchema);

export default flowerModel;