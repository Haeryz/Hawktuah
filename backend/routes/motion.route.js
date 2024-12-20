import express from "express";
import { createMotion, getMotion } from "../controllers/motion.controller.js";

const router = express.Router();

router.route("/")
  .post(createMotion)
  .get(getMotion);

router.route("/:id")
  .get(getMotion);

export default router;
