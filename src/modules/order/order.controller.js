
import Stripe from 'stripe';
import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from '../../../database/models/product.model.js';
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from './../../utils/AppError.js';
const stripe = new Stripe(process.env.STRIPE_KEY)




export const createCashOrder = catchAsyncError(async(req,res,next)=>{
  // 1) get cart (cartId)
  const cart = await cartModel.findById(req.params.id)
  //2) cal totaL price
  const totalOrderPrice = cart.totalPriceAfterDiscount ?
  cart.totalPriceAfterDiscount : cart.totalPrice
  //3) create order
  const order = new orderModel({
    user: req.user._id,
    cartItems:cart.cartItems,
    totalOrderPrice,
    shippingAddress:req.body.shippingAddress,
  })
await order.save()
//4) increment sold & decrement quantity
if(order){
  let options=cart.cartItems.map(item=>({
    updateOne:{
      filter:{_id:item.product},
      update:{$inc:{quantity: -item.quantity,sold:item.quantity}}
    }
  }))
   await productModel.bulkWrite(options)
//5) clear user cart
await cartModel.findByIdAndDelete(req.params.id)
return res.status(201).json({message:"success",order})

}else{
  return next(new AppError('error in cart id',404))
}
})


export const getSpecificOrder = catchAsyncError(async(req,res,next)=>{

  let order = await orderModel.findOne({user:req.user._id}).populate('cartItems.product')
  res.status(200).json({message:"success",order})
})

export const getAllOrders = catchAsyncError(async(req,res,next)=>{

  let orders = await orderModel.find({}).populate('cartItems.product')
  res.status(200).json({message:"success",orders})
})


export const createCheckOutSession = catchAsyncError(async(req,res,next)=>{
const cart = await cartModel.findById(req.params.id)

const totalOrderPrice = cart.totalPriceAfterDiscount ?
cart.totalPriceAfterDiscount : cart.totalPrice

let session = await stripe.checkout.sessions.create({
  line_items:[
    {
      price_date:{
        currency:'egp',
        unit_amount:totalOrderPrice * 100,
        product_date:{
          name:req.user.name
        }
      },
      quantity:1
    }
  ],
  mode:"payment",
  success_url:"https://app.netlify.com/teams/lola888hussein/integrations",
  cancel_url:"https://app.netlify.com/teams/lola888hussein/integrations",
  customer_email:req.user.email,
  client_reference_id:req.params.id,
  metadata:req.body.shippingAddress
})
res.json({message:"success",session})
})

