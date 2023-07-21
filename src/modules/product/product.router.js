import express from "express";
import { uploadMixOfFiles } from "../../middleware/fileUpload.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as product from "./product.controller.js";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./product.validation.js";
let ProductRouter = express.Router();
let fieldArray=[{name:"imgCover",maxCount:1},{name:"images",maxCount:10}]


ProductRouter 
.route("/")
.post(protectedRoutes,allowedTo('admin','user'),uploadMixOfFiles(fieldArray,"product"),validation(createProductSchema),product.createProduct)
.get(product.getAllProducts);

ProductRouter
.route("/:id")
.delete(protectedRoutes,allowedTo('admin'),validation(deleteProductSchema),product.deleteProduct)
.put(protectedRoutes,allowedTo('admin'),validation(updateProductSchema),product.updateProduct);
ProductRouter.route("/:id").get(validation(getProductSchema),product.Product);
export default ProductRouter;
