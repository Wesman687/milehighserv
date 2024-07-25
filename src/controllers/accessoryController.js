import { v2 as cloudinary } from 'cloudinary'
import accessoryModel from '../models/accessoryModel.js';


const addAccessory = async(req, res) => {
    
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const title = req.body.title;
        const price = req.body.price;
        const imageFile = req.files.image[0];
        const imageFile1 = req.files.image[1];
        const imageFile2 = req.files.image[2];
        const imageFile3 = req.files.image[3];
        const imageFile4 = req.files.image[4];
        const imageFile5 = req.files.image[5];
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUpload1 = await cloudinary.uploader.upload(imageFile1.path, { resource_type: "image" });
        const imageUpload2 = await cloudinary.uploader.upload(imageFile2.path, { resource_type: "image" });
        const imageUpload3 = await cloudinary.uploader.upload(imageFile3.path, { resource_type: "image" });
        const imageUpload4 = await cloudinary.uploader.upload(imageFile4.path, { resource_type: "image" });
        const imageUpload5 = await cloudinary.uploader.upload(imageFile5.path, { resource_type: "image" });

        const accessoryData = {
            name,
            desc,
            title,
            price,
            image: imageUpload.secure_url,
            image1: imageUpload1.secure_url,
            image1: imageUpload2.secure_url,
            image1: imageUpload3.secure_url,
            image1: imageUpload4.secure_url,
            image1: imageUpload5.secure_url,
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
        const allFlower = await flowerModel.find({})
        res.json({success:true, flowers: allFlower})
    } catch (error) {
        res.json({success:false})

    }

}
const removeAccessory = async(req,res) => {

}

export {addAccessory, listAccessory, removeAccessory}
