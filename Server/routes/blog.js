import express from "express";
import multer from "multer";
import {
  getAllBlogs,
  addBlog, // existing admin add
  requestBlog, // new user submit
  approveBlog,
  rejectBlog,
  getPendingBlogs,
  updateBlog,
  deleteBlog,
  toggleBlogHide,
  getBlogById,
} from "../controllers/blogController.js";
import { noStore, publicCache } from "../middleware/cacheControl.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const approvedBlogsCache = (req, res, next) => {
  if (req.query.status === "approved") {
    return publicCache({ sMaxAge: 180, staleWhileRevalidate: 1800 })(
      req,
      res,
      next
    );
  }

  return noStore(req, res, next);
};

// 🧑‍💻 User
router.post("/submit", noStore, upload.single("image"), requestBlog);

// ✅ Admin
router.get("/all", approvedBlogsCache, getAllBlogs);
router.post("/add", noStore, upload.single("image"), addBlog); // existing
router.get("/pending", noStore, getPendingBlogs);
router.put("/approve/:id", noStore, approveBlog);
router.put("/reject/:id", noStore, rejectBlog);
router.put("/update/:id", noStore, upload.single("image"), updateBlog);
router.delete("/delete/:id", noStore, deleteBlog);
router.put("/hide-toggle/:id", noStore, toggleBlogHide);
router.get("/:id", publicCache({ sMaxAge: 300, staleWhileRevalidate: 3600 }), getBlogById);

export default router;
