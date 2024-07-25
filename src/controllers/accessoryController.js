import { v2 as cloudinary } from 'cloudinary'
import accessoryModel from '../models/accessoryModel.js';


const addAccessory = async(req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const title = req.body.title;
        const tag = req.body.tag
        const price = req.body.price;
        const sizes = req.body.sizes
        const imageFile = req.files.image[0];
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const accessoryData = {
            name,
            desc,
            title,
            tag,
            price,
            sizes,
            image: imageUpload.secure_url,
        };

        const accessory = accessoryModel(accessoryData);
        await accessory.save();

        res.json({ success: true, message: "Accessory Added" });

    } catch (error) {

        res.json({ success: false });
        console.log(error)

    }

}

const listAccessory = async(req, res) => {
    try {
        const allAccessory = await accessoryModel.find({})
        res.json({success:true, accessories: allAccessory})
    } catch (error) {
        res.json({success:false})

    }

}
const removeAccessory = async(req,res) => {

}

export {addAccessory, listAccessory, removeAccessory}
