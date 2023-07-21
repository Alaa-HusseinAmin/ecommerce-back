import express from "express";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import SubCategoryRouter from "../subcategory/subcategory.router.js";
import * as Category from "./category.controller.js";
import { createCategorySchema, deleteCategorySchema, getCategorySchema, updateCategorySchema } from "./category.validation.js";
const categoryRouter = express.Router();

  
categoryRouter.use('/:categoryId/subcategories',SubCategoryRouter)
categoryRouter
.route("/")
.post(protectedRoutes,allowedTo('admin'),uploadSingleFile('image','category'),validation(createCategorySchema),Category.createCategory)
.get(Category.getAllCategories);


categoryRouter
.route("/:id") 
.delete(protectedRoutes,allowedTo('admin'),validation(deleteCategorySchema),Category.deleteCategory)
.put(protectedRoutes,allowedTo('admin'),uploadSingleFile('image','category'),validation(updateCategorySchema),Category.updateCategory);
categoryRouter.route("/:id").get(validation(getCategorySchema),Category.category);
export default categoryRouter;
