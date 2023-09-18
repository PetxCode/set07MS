import express from "express";
import {
  createUser,
  getAllUser,
  getUser,
  signInUser,
  verifyUser,
} from "../controller/authController";
import VarifyHolder from "../utils/VarifyHolder";
import { createAccount, signInAccount } from "../utils/verification";

const router = express.Router();

router.route("/").get(getAllUser);
router.route("/register").post(VarifyHolder(createAccount), createUser);
router.route("/sign-in").post(VarifyHolder(signInAccount), signInUser);

router.route("/:userID/verified").get(verifyUser);
router.route("/:userID/user").get(getUser);

export default router;
