import express from 'express'
import {addAccessory, listAccessory, removeAccessory} from '../controllers/accessoryController.js'
import upload from '../middleware/multer.js'

const AccessoryRouter = express.Router()

AccessoryRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), addAccessory)
AccessoryRouter.get('/list', listAccessory)
AccessoryRouter.post('/remove', removeAccessory)

export default AccessoryRouter