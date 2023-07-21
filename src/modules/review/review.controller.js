import { reviewModel } from "../../../database/models/review.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import * as factory from "../handlers/factor.handler.js";

  

export const createReview =catchAsyncError(async (req, res,next) => {
  req.body.user = req.user._id
  let isReview = await reviewModel.findOne({user: req.user._id, product: req.body.product})
  if(isReview) return next(new AppError('You created a review before',409))
  let result = new reviewModel(req.body);
  await result.save();
  res.json({ message: "success", result });
})

export const getAllReviews =catchAsyncError(async (req, res,next) => {

  let apiFeatures = new ApiFeatures(reviewModel.find(),req.query)
  .pagination(req).filter().sort().search().fields()

  //execute query
  let result = await apiFeatures.mongooseQuery
  res.status(200).json({ message: "success", page:apiFeatures.page, result });
}) 

export const review =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  let result = await reviewModel.findById(id);
  !result && next(new AppError(`Review not found`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const updateReview =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  let result = await reviewModel.findOneAndUpdate({_id:id,user:req.user._id},req.body,{new:true})
  !result && next(new AppError(`Review not found or you are not authorized to preform this action`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const deleteReview =factory.deleteOne(reviewModel)