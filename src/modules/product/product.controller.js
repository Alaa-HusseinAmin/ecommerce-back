import slugify from "slugify";
import { productModel } from "../../../database/models/product.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import * as factory from "../handlers/factor.handler.js";

export const createProduct =catchAsyncError(async (req, res,next) => {
   req.body.slug=slugify(req.body.title)
   req.body.imgCover=req.files.imgCover[0].filename;
   req.body.images=req.files.images.map(obj=>obj.filename)
   console.log(req.files);
  let result = new productModel(req.body);
  await result.save();
  res.status(201).json({ message: "success", result });
})

export const getAllProducts =catchAsyncError(async (req, res,next) => {
  
  let apiFeatures = new ApiFeatures(productModel.find(),req.query)
  .pagination(req).filter().sort().search().fields()

  //execute query
  let result = await apiFeatures.mongooseQuery
  res.status(200).json({ message: "success", page:apiFeatures.page, result });
}) 

export const Product =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  let result = await productModel.findById(id);
  !result && next(new AppError(`product not found`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const updateProduct =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  if(req.body.title) req.body.slug=slugify(req.body.title)
  let result = await productModel.findByIdAndUpdate(id,req.body,{name:true})
  !result && next(new AppError(`product not found`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const deleteProduct =factory.deleteOne(productModel)