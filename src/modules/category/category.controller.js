import slugify from "slugify";
import { categoryModel } from "../../../database/models/category.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import * as factory from "../handlers/factor.handler.js";

export const createCategory = catchAsyncError(async (req, res, next) => {
  console.log(req.file);
  req.body.image = req.file.filename;
  req.body.slug = slugify(req.body.name);

  let result = new categoryModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});

export const getAllCategories = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .pagination(req)
    .filter()
    .sort()
    .search()
    .fields();

  //execute query
  let result = await apiFeatures.mongooseQuery;
  res.status(200).json({ message: "success", page: apiFeatures.page, result });
});

export const category = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await categoryModel.findById(id);
  !result && next(new AppError(`category not found`, 404));
  result && res.status(200).json({ message: "success", result });
});

export const updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.image = req.file.filename;
  req.body.slug = slugify(req.body.name);
  let result = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppError(`category not found`, 404));
  result && res.status(200).json({ message: "success", result });
});

export const deleteCategory = factory.deleteOne(categoryModel);
