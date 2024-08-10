import express from 'express'
import {addAccessory, listAccessory, removeAccessory} from '../controllers/accessoryController.js'
import upload from '../middleware/multer.js'

const accessoryRouter = express.Router()

accessoryRouter.post('/add', upload.fields([{ name: 'image', maxCount: 6 }]), addAccessory)
accessoryRouter.get('/list', listAccessory)
accessoryRouter.post('/remove', removeAccessory)

export default accessoryRouter