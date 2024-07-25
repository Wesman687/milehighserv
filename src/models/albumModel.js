import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true},
    desc: {type: String, required: true},
    bgColour: {type: String, required: true},
    image: {type: String, required: true}
})

const almbumModel = mongoose.models.album || mongoose.model("album", albumSchema)

export default almbumModel