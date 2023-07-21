import express from "express";
// import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as wishlist from "./wishlist.controller.js";
// import { createReviewSchema, deleteReviewSchema, getReviewSchema, updateReviewSchema } from "./review.validation.js";



const wishListRouter = express.Router();
wishListRouter

.route("/")
  .patch(protectedRoutes,allowedTo('user'),wishlist.addToWishlist)
  .get(protectedRoutes,allowedTo('user'),wishlist.getUserWishlist)
  .delete(protectedRoutes,allowedTo('user'),wishlist.removeFromWishlist)
export default wishListRouter;
