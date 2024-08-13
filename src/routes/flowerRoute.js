import express from 'express';
import { addFlower, listFlower, removeFlower, updateFlower } from '../controllers/flowerController.js'
import upload from '../middleware/multer.js';

const flowerRouter = express.Router()

flowerRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), addFlower);
flowerRouter.get('/list', listFlower)
flowerRouter.post('/remove', removeFlower)
flowerRouter.post('/update', upload.fields([{ name: 'image', maxCount: 1 }]), updateFlower);


export default flowerRouter;