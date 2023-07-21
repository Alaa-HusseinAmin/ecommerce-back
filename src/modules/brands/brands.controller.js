import slugify from "slugify";
import { brandModel } from "../../../database/models/brand.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import * as factory from "../handlers/factor.handler.js";

  

export const createBrand =catchAsyncError(async (req, res,next) => {
  req.body.logo = req.file.filename
  req.body.slug=slugify(req.body.name)
  let result = new brandModel(req.body);
  await result.save();
  res.json({ message: "success", result });
})

export const getAllBrands =catchAsyncError(async (req, res,next) => {

  let apiFeatures = new ApiFeatures(brandModel.find(),req.query)
  .pagination(req).filter().sort().search().fields()

  //execute query
  let result = await apiFeatures.mongooseQuery
  res.status(200).json({ message: "success", page:apiFeatures.page, result });
}) 

export const Brand =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  let result = await brandModel.findById(id);
  !result && next(new AppError(`brand not found`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const updateBrand =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  req.body.logo = req.file.filename
  req.body.slug=slugify(req.body.name)
  let result = await brandModel.findByIdAndUpdate(id,{name,slug:slugify(name)},
  {new:true});
  !result && next(new AppError(`brand not found`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const deleteBrand =factory.deleteOne(brandModel)