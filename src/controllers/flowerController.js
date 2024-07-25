import { v2 as cloudinary } from 'cloudinary'
import flowerModel from '../models/flowerModel.js';

const addFlower = async (req, res) => {

    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const title = req.body.title;
        const price = req.body.price;
        const imageFile = req.files.image[0];
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const flowerData = {
            name,
            desc,
            title,
            price,
            image: imageUpload.secure_url,
        };

        const flower = flowerModel(flowerData);
        await flower.save();

        res.json({ success: true, message: "Flower Added" });

    } catch (error) {

        res.json({ success: false });
        console.log(error)

    }

}

const listFlower = async (req, res) => {
    try {
        const allFlower = await flowerModel.find({})
        res.json({success:true, flowers: allFlower})
    } catch (error) {
        res.json({success:false})

    }
}

const removeFlower = async (req, res) => {

    try {
        await flowerModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message:"Flower Removed"})
    } catch(error){

        res.json({ success: false})

    }
}



export { addFlower, listFlower, removeFlower }