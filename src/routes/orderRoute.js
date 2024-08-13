import express from 'express';
import { listOrders } from '../controllers/orderController.js';

const orderRouter = express.Router()

orderRouter.get('/list', listOrders)


export default orderRouter;