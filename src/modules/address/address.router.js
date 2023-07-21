import express from "express";
// import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as addresses from "./address.controller.js";
// import { createReviewSchema, deleteReviewSchema, getReviewSchema, updateReviewSchema } from "./review.validation.js";



const AddressRouter = express.Router();
AddressRouter

.route("/")
  .patch(protectedRoutes,allowedTo('user'),addresses.addAddress)
  .get(protectedRoutes,allowedTo('user'),addresses.getUserAddress)
  .delete(protectedRoutes,allowedTo('user'),addresses.removeAddress)
export default AddressRouter;
