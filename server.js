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


app.get("/", (req, res) => res.send("API Working"))

app.listen(port, () => console.log(`Server started on ${port}`))


app.post('/create-checkout-session', async (req, res) => {
  
    let productArr = req.body.cart
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
    return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
  });
  const totalQuantity = () => {  
    let counter = 0
    productArr.forEach(item => {
      counter += item.quantity
    })
    return counter
  }
  const newOrder = {    
    products: req.body.cart,
    total: totalQuantity(),
    transactionId: session.id,
    uid: req.body.cart[0].uid
  }
  
  const order = orderModel(newOrder);
  await order.save();
  res.send({clientSecret: session.client_secret});
});

  app.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    await orderModel.findOneAndUpdate({transactionId:req.query.session_id}, {paymentStatus:session.status})
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  });
  