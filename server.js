import express from "express"
import cors from 'cors'
import connectCloudinary from "./src/config/cloudinary.js";
import 'dotenv/config'
import connectDB from "./src/config/mongodb.js";
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
import flowerRouter from "./src/routes/flowerRoute.js";
import accessoryRouter from "./src/routes/accessoryRoute.js";
import Stripe from "stripe";
import orderModel from "./src/models/orderModel.js";
import orderRouter from "./src/routes/orderRoute.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


// app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()
connectDB()

// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));


// Initializing Routers
app.use("/api/song", songRouter )
app.use('/api/album', albumRouter)
app.use('/api/flower', flowerRouter)
app.use('/api/accessory', accessoryRouter)
app.use('/api/orders', orderRouter)


app.get("/", (req, res) => res.send("API Working"))

app.listen(port, () => console.log(`Server started on ${port}`))


app.post('/create-checkout-session', async (req, res) => {
    try {
      let productArr = req.body.cart
      console.log("Creating Checkout Session", productArr)
    let arrangedData = productArr.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
              name: product.name,
          },
          unit_amount: +product.basePrice * 100,
      },
      quantity: product.quantity
      

    }))
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: arrangedData,
      mode: 'payment',
    return_url: `https://mile-high.vercel.app/return?session_id={CHECKOUT_SESSION_ID}`,
  });
  const totalPrice = () => {
    let counter = 0
    productArr.forEach(item =>{
      counter += item.quantity * item.basePrice
    })
    return counter
  }
  const newOrder = {    
    products: req.body.cart,
    totalPrice: totalPrice(),
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    address: req.body.user.address,
    city: req.body.user.city,
    state: req.body.user.state,
    stateid: req.body.user.stateid,
    phone: req.body.user.phone,
    transactionId: session.id,
    zip: req.body.user.zip,
    uid: req.body.cart[0].uid
  }
  
  const order = orderModel(newOrder);
  await order.save();
  res.send({clientSecret: session.client_secret});
  
    } catch (error) {
      console.log(error)
      res.send(error)
    }
});

app.get('/session-status', async (req, res) => {
    try {
      console.log("Checking session status on", req.query.session_id)
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    await orderModel.findOneAndUpdate({transactionId:req.query.session_id}, {paymentStatus:session.status})
    console.log("Status", session.status)
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
    } catch (error) {
      console.log(error)
    }
  });
  
  app.post('/webhook/shipstation', (req, res) => {
    const event = req.body;
  
    // Log the event for debugging
    console.log('Received webhook event:', event);
  
    // Handle the event (e.g., send a notification, update a database, etc.)
    if (event && event.resource_type === 'SHIP_NOTIFY') {
      const shipment = event.resource;
      console.log('Shipment status updated:', shipment);
      // Add your custom logic here (e.g., send an email or SMS notification)
    }
  
    // Respond to ShipStation
    res.status(200).send('Webhook received');
  });