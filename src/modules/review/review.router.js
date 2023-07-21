import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as Review from "./review.controller.js";
import { createReviewSchema, deleteReviewSchema, getReviewSchema, updateReviewSchema } from "./review.validation.js";



const ReviewRouter = express.Router();
ReviewRouter.route("/").post(protectedRoutes,allowedTo('user'),validation(createReviewSchema),Review.createReview).get(Review.getAllReviews);
ReviewRouter
  .route("/:id")

  .delete(protectedRoutes,allowedTo('admin','user'),validation(deleteReviewSchema),Review.deleteReview)
  .put(protectedRoutes,allowedTo('user'),validation (updateReviewSchema),Review.updateReview);
ReviewRouter.route("/:id").get(validation(getReviewSchema),Review.review);
export default ReviewRouter;
