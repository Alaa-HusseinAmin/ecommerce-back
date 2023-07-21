import express from "express";
// import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as Cart from "./cart.controller.js";
// import { createRCartSchema, deleteCartSchema, getCartSchema, updateCartSchema } from "./cart.validation.js";


const CartRouter = express.Router();
CartRouter
.route("/")
.post(protectedRoutes,allowedTo('user'),Cart.addTProductToCart)
.get(protectedRoutes,allowedTo('user'),Cart.getLoggedUserCart)
// .delete(protectedRoutes,allowedTo('user'),Cart.clearUserCart)

CartRouter.post('/applyCoupon',protectedRoutes,allowedTo('user'),Cart.applyCoupon)


CartRouter
   
.route("/:id")
.delete(protectedRoutes,allowedTo('admin','user'),Cart.removeProductFromCart)
.put(protectedRoutes,allowedTo('user'),Cart.updateQuantity)

export default CartRouter;


