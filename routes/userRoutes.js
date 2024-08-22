import express from "express";
import {
  createAUser,
  getUser,
  userLogIn,
} from "../controllers/userController.js";
import verifyUser from "../utils/verifyUser.js";

const userRoutes = express.Router();

// ALL POST
userRoutes.post("/signup", createAUser);
userRoutes.post("/signin", userLogIn);

// ALL GET
userRoutes.get("/getUser",verifyUser, getUser);

export default userRoutes;
