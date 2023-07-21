
import { cartModel } from "../../../database/models/cart.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { couponModel } from './../../../database/models/coupon.model.js';
import { productModel } from './../../../database/models/product.model.js';
import { AppError } from './../../utils/AppError.js';


function calcTotalPrice(cart){
  let totalPrice = 0;
   cart.cartItems.foreach(elm=>{
    totalPrice += elm.quantity * elm.price
   })
   isCartExist.totalPrice = totalPrice
}
export const addTProductToCart =catchAsyncError(async (req, res,next) => {
  let product = await productModel.findById(req.body.product).select('price')
  if(!product) return next(new AppError('product not found',404))
  req.body.price=product.price

  let isCartExist = await cartModel.findOne({user:req.user._id})
  if(!isCartExist){
    let cart = new cartModel({
      user:req.user._id,
      cartItems:[req.body],
    })
    calcTotalPrice(cart)
    await result.save();
    return  res.json({ message: "success", cart });
  }
  let item = isCartExist.cartItems.find((elm)=>elm.product == req.body.product)
   if(item){
    item.quantity +=1
   }else{
    isCartExist.cartItems.push(req.body)
   }
   calcTotalPrice(isCartExist)
   if(isCartExist.discount){
   isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100

   }
 await isCartExist.save()
  res.json({message:"success",cart:isCartExist})
})


export const removeProductFromCart =catchAsyncError(async (req, res,next) => {

  let result = await cartModel
  .findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
  !result && next(new AppError(`item not found`,404))
  calcTotalPrice(result)
  if(result.discount){
    result.totalPriceAfterDiscount = result.totalPrice - (result.totalPrice * result.discount) / 100
    }
  result && res.status(200).json({message:'success',result})
}) 


export const updateQuantity =catchAsyncError(async (req, res,next) => {
  let product = await productModel.findById(req.params.id).select('price')
  if(!product) return next(new AppError('product not found',404))
  
  let isCartExist = await cartModel.findOne({user:req.user._id})
  let item = isCartExist.cartItems.find((elm)=>elm.product == req.params.id)
   if(item){
    item.quantity = req.body.quantity
   }
   calcTotalPrice(isCartExist)
   if(isCartExist.discount){
    isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100
    }
 await isCartExist.save()
  res.json({message:"success",cart:isCartExist})
})

 
export const applyCoupon =catchAsyncError(async (req, res,next) => {
  let coupon = await couponModel.findOne({code:req.body.code,expires:{$gt:Date.now()}})

  cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
  cart.discount = coupon.discount
  await cart.save()
  res.status(201).json({message:"success",cart})
})


export const getLoggedUserCart =catchAsyncError(async (req, res,next) => {


  let cartItems = await cartModel.findOne({user:req.user._id}).populate('cartItems.product')

  res.status(201).json({message:"success",cart:cartItems})
})

//question
// export const clearUserCart =catchAsyncError(async (req, res,next) => {
  
//   let cartItems = await cartModel.findByIddDelete({user:req.user._id})
//   !cartItems && next(new AppError(`Document not found`,404))
//     cartItems && res.status(200).json({message:'success',cartItems})
//   // res.status(201).json({message:"success",cart:cartItems})
// })


