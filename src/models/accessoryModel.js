import mongoose from "mongoose";
const subSchema = new mongoose.Schema({
  image1: {type:String, required: false},
  image2: {type:String, required: false},
  image3: {type:String, required: false},
  image4: {type:String, required: false},
  image5: {type:String, required: false},
});
const accessorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    tag: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    sizes: { type: String, required: false},
    thumb: { type: subSchema, required: false },
})



const accessoryModel = mongoose.models.accessory || mongoose.model("accessory", accessorySchema);

export default accessoryModel;


