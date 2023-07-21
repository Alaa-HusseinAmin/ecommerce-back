import express from "express";
// import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as Coupon from "./coupon.controller.js";
// import { createReviewSchema, deleteReviewSchema, getReviewSchema, updateReviewSchema } from "./review.validation.js";



const CouponRouter = express.Router();
CouponRouter
.route("/")
.post(protectedRoutes,allowedTo('admin'),Coupon.createCoupon)
.get(Coupon.getAllCoupons);


CouponRouter
  .route("/:id")
  .delete(protectedRoutes,allowedTo('admin','user'),Coupon.deleteCoupon)
  .put(protectedRoutes,allowedTo('user'),Coupon.updateCoupon);
CouponRouter.route("/:id").get(Coupon.coupon);
export default CouponRouter;


