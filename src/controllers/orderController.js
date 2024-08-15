import orderModel from '../models/orderModel.js'
import numberModel from '../models/orderNumberModel.js'

const listOrders = async(req, res) => {
    try {
        const allOrders = await orderModel.find({})
        res.json({success:true, orders: allOrders})
    } catch (error) {
        res.json({success:false})

    }

}
const updateOrderId = async (req, res) => {
    
    try {
      const orderId = req.body.orderId;
      const orderNumber = req.body.orderNumber
      const payload = {
        orderId,
        orderNumber
      }      
      await orderModel.findByIdAndUpdate(req.body.id, payload);
  
      res.json({ success: true, message: "Order Updated" });
    } catch (error) {
      res.json({ success: false });
    }
  };
  const updateNumber = async (req, res) => {
    let number
    try {
        number = await numberModel.find('66bd67c2778d2b57dec72c8b');
        await orderModel.findByIdAndUpdate(req.body.id, {shippingState: Shipping})
        res.json({ success: true, orderNumber: number });
      } catch (error) {
        res.json({ success: false });
      }
    const orderNumber = number.orderNumber + 1
    const id = number.id
    const payload = {
        orderNumber: orderNumber
    }

    await numberModel.findByIdAndUpdate(id, payload)
  }

  const getNumber = async (req, res) => {
    try {
        const number = await numberModel.find();
        res.json({ success: true, number });
    } catch (error) {
        res.json({ success: false });
    }
  }
export { listOrders, updateOrderId, updateNumber, getNumber}