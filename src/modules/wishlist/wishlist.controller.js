import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { userModel } from './../../../database/models/user.model.js';

  

export const addToWishlist =catchAsyncError(async (req, res,next) => {
  const {product} = req.body;
  let result = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:product}},{new:true})
  !result && next(new AppError(`Wishlist not found`,401))
  result && res.status(200).json({message:'success',result:result.wishlist})
}) 

export const removeFromWishlist =catchAsyncError(async (req, res,next) => {
  const {product} = req.body;
  let result = await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishlist:product}},{new:true})
  !result && next(new AppError(`Wishlist not found`,401))
  result && res.status(200).json({message:'success',result:result.wishlist})
}) 

export const getUserWishlist =catchAsyncError(async (req, res,next) => {
  
  let result = await userModel.findOne({_id:req.user._id}).populate('wishlist')
  !result && next(new AppError(`Wishlist not found`,401))
  result && res.status(200).json({message:'success',result:result.wishlist})
}) 
  