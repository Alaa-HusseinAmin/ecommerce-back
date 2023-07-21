import express from "express";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createBrandSchema, deleteBrandSchema, getBrandSchema, updateBrandSchema } from "./brand.validation.js";
import * as brand from "./brands.controller.js";



const BrandRouter = express.Router();
BrandRouter.route("/").post(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brand'),validation(createBrandSchema),brand.createBrand).get(brand.getAllBrands);
BrandRouter
  .route("/:id")

  .delete(validation(protectedRoutes,allowedTo('admin'),deleteBrandSchema),brand.deleteBrand)
  .put(validation(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brand'),updateBrandSchema),brand.updateBrand);
BrandRouter.route("/:id").get(validation(getBrandSchema),brand.Brand);
export default BrandRouter;
