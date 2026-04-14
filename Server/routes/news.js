import express from "express";
import {
  addNews,
  getAllNews,
  getAllNewsSimple,
  updateNews,
  deleteNews,
  getVisibleNews,
  getHiddenNews,
  toggleHideNews,
} from "../controllers/newsController.js";
import multer from "multer";
import streamifier from "streamifier";
import { noStore, publicCache } from "../middleware/cacheControl.js";

const router = express.Router();

// Multer config to store in memory for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route
router.post("/add", noStore, upload.single("image"), addNews);
router.get("/", publicCache({ sMaxAge: 180, staleWhileRevalidate: 1800 }), getAllNews);
router.get("/all", noStore, getAllNewsSimple);
router.put("/update/:id", noStore, upload.single("image"), updateNews);
router.delete("/delete/:id", noStore, deleteNews);
router.put("/hide-toggle/:id", noStore, toggleHideNews);
router.get("/visible", publicCache({ sMaxAge: 180, staleWhileRevalidate: 1800 }), getVisibleNews);
router.get("/hidden", noStore, getHiddenNews);

export default router;
