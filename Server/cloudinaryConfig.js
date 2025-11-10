// src/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
require("dotenv").config(); // ✅ Load .env if not already loaded globally

// Validate required env variables (optional but professional)
if (
  !process.env.CLOUD_NAME ||
  !process.env.CLOUD_API_KEY ||
  !process.env.CLOUD_SECRET_KEY
) {
  throw new Error("❌ Cloudinary config variables are missing in .env");
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

export default cloudinary;
