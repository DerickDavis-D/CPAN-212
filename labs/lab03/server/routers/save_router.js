import express from "express";
import upload from "../middleware/multer.js"
import axios from "axios";
import fs from "fs";
import path from "path";
import multer from "multer";

const router = express.Router();

// Setup Multer for image uploads
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

router.post("/single", upload.single("file"), (req, res) => {
  console.log("Uploaded File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Save multiple images
router.post("/multiple", upload.array("files", 5), (req, res) => {
  console.log("Uploaded Files:", req.files);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const filePaths = req.files.map(file => `/uploads/${file.filename}`);

  res.json({
    message: "Images uploaded successfully",
    filePaths: filePaths,
  });
});


// Existing route for single image upload
router.post("/single", upload.single("file"), (req, res) => {
  console.log("Uploaded File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

// New route to save dog image from URL
router.post("/dog", async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: "No image URL provided" });
  }
  console.log("Received Dog Image URL:", imageUrl);
  
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    const filename = `dog-${Date.now()}.jpg`;
    const filePath = path.join("public/uploads", filename);

    fs.writeFileSync(filePath, buffer);
     console.log("Dog Image Saved:", filePath);
     
    res.json({ message: "Dog image saved successfully", filePath: `/uploads/${filename}` });
  } catch (error) {
    console.error("Error saving dog image:", error);
    res.status(500).send("Error saving dog image");
  }
});


export default router;
