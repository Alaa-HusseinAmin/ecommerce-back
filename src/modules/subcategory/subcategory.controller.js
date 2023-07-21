import slugify from "slugify";
import { subcategoryModel } from "../../../database/models/subcategory.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import * as factory from "../handlers/factor.handler.js";

  

export const createSubCategory =catchAsyncError(async (req, res,next) => {
  const { name,category } = req.body;
  let result = new subcategoryModel({ name,category,slug: slugify(name) });
  await result.save();
  res.json({ message: "success", result });
})

export const getAllSubCategories =catchAsyncError(async (req, res,next) => {
  let filter = {}
  if(req.params.categoryId){
    filter={category:req.params.categoryId}
  }
  let result = await subcategoryModel.find(filter);
  res.json({ message: "success", result });
}) 

export const SubCategory =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  let result = await subcategoryModel.findById(id);
  !result && next(new AppError(`subcategory not found`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const updateSubCategory =catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  const { name,category } = req.body;
  let result = await subcategoryModel.findByIdAndUpdate(id, {
    name,
    category,
    slug: slugify(name),
  },
  {new:true});
  !result && next(new AppError(`subcategory not found`,404))
  result && res.status(200).json({message:'success',result})
}) 

export const deleteSubCategory =factory.deleteOne(subcategoryModel)

// export const deleteSubCategory =catchAsyncError(async (req, res,next) => {
//   const { id } = req.params;
//   let result = await subcategoryModel.findByIdAndDelete(id);
//   !result && next(new AppError(`subcategory not found`,404))
//   result && res.status(200).json({message:'success',result})
// }) 