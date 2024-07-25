import express from 'express'
import {addAccessory, listAccessory, removeAccessory} from '../controllers/accessoryController.js'
import upload from '../middleware/multer.js'

const AccessoryRouter = express.Router()

AccessoryRouter.post('/add', upload.single('image'), addAccessory)
AccessoryRouter.get('/list', listAccessory)
AccessoryRouter.post('/remove', removeAccessory)

export default AccessoryRouter