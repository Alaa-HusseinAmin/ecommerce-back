import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as SubCategory from "./subcategory.controller.js";
import { createSubcategorySchema, deleteSubcategorySchema, getSubcategorySchema, updateSubcategorySchema } from "./subcategory.validation.js";

const SubCategoryRouter = express.Router({mergeParams:true});

SubCategoryRouter.route("/").post(validation(createSubcategorySchema),SubCategory.createSubCategory).get(SubCategory.getAllSubCategories);
SubCategoryRouter
  .route("/:id")
   
  .delete(protectedRoutes,allowedTo('admin'),validation(deleteSubcategorySchema),SubCategory.deleteSubCategory)
  .put(protectedRoutes,allowedTo('admin'),validation(updateSubcategorySchema),SubCategory.updateSubCategory);
SubCategoryRouter.route("/:id").get(validation(getSubcategorySchema),SubCategory.SubCategory);
export default SubCategoryRouter;
