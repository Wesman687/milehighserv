import express from 'express';
import { getNumber, listOrders, updateNumber, updateOrderId } from '../controllers/orderController.js';

const orderRouter = express.Router()

orderRouter.get('/list', listOrders)
orderRouter.post('/updateorderid', updateOrderId)
orderRouter.post('/updatenumber', updateNumber)
orderRouter.get('/ordernumber', getNumber)

export default orderRouter;