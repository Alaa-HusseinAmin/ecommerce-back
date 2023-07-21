import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import * as factory from "../handlers/factor.handler.js";
import { userModel } from './../../../database/models/user.model.js';

  

export const createUser =catchAsyncError(async (req, res,next) => {
  let user = await userModel.findOne({email:req.body.email})
  if(user) return next(new AppError(`account already exist`,409))

  let result = new userModel(req.body);
  await result.save();
  res.json({ message: "success", result });
})

export const getAllUsers =catchAsyncError(async (req, res,next) => {

  let apiFeatures = new ApiFeatures(userModel.find(),req.query)
  .pagination(req).filter().sort().search().fields()

  //execute query
  let result = await apiFeatures.mongooseQuery
  res.status(200).json({ message: "success", page:apiFeatures.page, result });
}) 

export const User =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  let result = await userModel.findById(id);
  !result && next(new AppError(`user not found`,404))
  result && res.status(200).json({message:'success',result})
}) 


export const updateUser =catchAsyncError(async (req, res,next) => {
  let {id}=req.params
  let result = await userModel.findByIdAndUpdate(id,req.body,
  {new:true});
  !result && next(new AppError(`user not found`,404))
  result && res.status(200).json({message:'success',result})
}) 


export const changeUserPassword =catchAsyncError(async (req, res,next) => {
  let {id}=req.params
  req.body.passwordChangedAt=Date.now()
  let result = await userModel.findByIdAndUpdate(id,req.body,
  {new:true});
  !result && next(new AppError(`user not found`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const deleteUser =factory.deleteOne(userModel)  