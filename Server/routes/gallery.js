import { Router } from "express";
const router = Router();
import {
  getGallery,
  addGalleryItem,
} from "../controllers/galleryController.js";

router.get("/", getGallery);

router.post("/", addGalleryItem);

export default router;
