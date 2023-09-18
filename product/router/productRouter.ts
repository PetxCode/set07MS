import express from "express";
import {
  createProduct,
  viewProduct,
  viewProducts,
} from "../controller/storeController";
import { verified } from "../utils/verified";

const router = express.Router();

router.route("/create-product").post(verified, createProduct);
router.route("/all-view-products").get(viewProducts);
router.route("/:productID/view-product").get(viewProduct);

export default router;
