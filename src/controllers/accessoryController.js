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
        const thumbUpload = await req.files.map(file => {
            const images = newImage(file.buffer)
            const imagesUpload =  cloudinary.uploader.upload(images.path, { resource_type: "image"})
            return images.save
        })
        const thumb = await Promise.all

        const accessoryData = {
            name,
            desc,
            title,
            tag,
            price,
            sizes,
            image: imageUpload.secure_url,
            thumb: thumbUpload.secure_url
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
