import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as user from "./user.controller.js";
import { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } from "./user.validation.js";

const UserRouter = express.Router();
UserRouter
.route("/").
post(protectedRoutes,allowedTo('admin'),validation(createUserSchema),user.createUser)
.get(validation(getUserSchema),user.getAllUsers);

UserRouter
  .route("/:id")
  .delete(protectedRoutes,allowedTo('admin'),validation(deleteUserSchema),user.deleteUser)
  .put(protectedRoutes,allowedTo('admin'),validation(updateUserSchema),user.updateUser);
UserRouter.route("/:id").get(user.User);
UserRouter.patch('/changeUserPassword/:id',user.changeUserPassword)
export default UserRouter;
