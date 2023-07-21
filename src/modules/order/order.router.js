import express from "express";
// import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as Order from "./order.controller.js";
// import { addOrderSchema, deleteCartSchema, getOrderSchema, updateCartSchema } from "./cart.validation.js";


const OrderRouter = express.Router();


OrderRouter
.route("/")
.get(protectedRoutes,allowedTo('user'),Order.getSpecificOrder)
OrderRouter.get('/all',protectedRoutes,allowedTo('admin'),Order.getAllOrders)

OrderRouter
   
.route("/:id")
.post(protectedRoutes,allowedTo('user'),Order.createCashOrder)

OrderRouter.post('/checkOut/:id',protectedRoutes,allowedTo('user'),Order.createCheckOutSession)


export default OrderRouter;


