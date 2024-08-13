import orderModel from '../models/orderModel.js'

const listOrders = async(req, res) => {
    try {
        const allOrders = await orderModel.find({})
        res.json({success:true, orders: allOrders})
    } catch (error) {
        res.json({success:false})

    }

}
export { listOrders }