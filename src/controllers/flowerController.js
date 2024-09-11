import { v2 as cloudinary } from "cloudinary";
import flowerModel from "../models/flowerModel.js";

const addFlower = async (req, res) => {
  console.log(req.body)
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const images= req.body.images
    const prices = req.body.prices;
    const category = req.body.category;
    const title = req.body.title
    const flowerData = {
      name,
      desc,
      category,
      prices,
      images,
      title
    };

    const flower = flowerModel(flowerData);
    await flower.save();

    res.json({ success: true, message: "Flower Added" });
  } catch (error) {
    res.json({ success: false });
    console.log(error);
  }
};

const listFlower = async (req, res) => {
  try {
    const allFlower = await flowerModel.find({});
    res.json({ success: true, flowers: allFlower });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeFlower = async (req, res) => {
  try {
    await flowerModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Flower Removed" });
  } catch (error) {
    res.json({ success: false });
  }
};
const updateFlower = async (req, res) => {
    console.log(req.body)
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const prices = req.body.prices;
    const category = req.body.category;
    const images= req.body.images
    
    let flowerData = {
        name,
        desc,
        category,
        prices,
        images
      };    
    await flowerModel.findByIdAndUpdate(req.body.id, flowerData);

    res.json({ success: true, message: "Flower Updated" });
  } catch (error) {
    res.json({ success: false });
  }
};

export { addFlower, listFlower, removeFlower, updateFlower };
