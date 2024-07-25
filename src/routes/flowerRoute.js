import express from 'express';
import { addFlower, listFlower, removeFlower } from '../controllers/flowerController.js'
import upload from '../middleware/multer.js';

const flowerRouter = express.Router()

flowerRouter.post('/add', upload.single([{ name: 'image', maxCount: 1 }]), addFlower);
flowerRouter.get('/list', listFlower)
flowerRouter.post('/remove', removeFlower)


export default flowerRouter;