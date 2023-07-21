import { userModel } from '../../../database/models/user.model.js';
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

  

export const addAddress =catchAsyncError(async (req, res,next) => {
  
  let result = await userModel
  .findByIdAndUpdate(req.user._id,{$addToSet:{address:req.body}},{new:true})
  !result && next(new AppError(`Address not found`,401))
  result && res.status(200).json({message:'success',result:result.addresses})
}) 

export const removeAddress =catchAsyncError(async (req, res,next) => {

  let result = await userModel
  .findByIdAndUpdate(req.user._id,{$pull:{address:{_id:req.body.address}}},{new:true})
  !result && next(new AppError(`Address not found`,401))
  result && res.status(200).json({message:'success',result:result.addresses})
}) 

export const getUserAddress =catchAsyncError(async (req, res,next) => {

  let result = await userModel.findOne({_id:req.user._id})
  !result && next(new AppError(`Address not found`,401))
  result && res.status(200).json({message:'success',result:result.addresses})
}) 
  