const Gallery = require("../models/Gallery");

exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: " Server error" });
  }
};

exports.addGalleryItem = async (req, res) => {
  const { title, imageUrl, description } = req.body;
  try {
    const newItem = new Gallery({ title, imageUrl, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Failed to add gallery item" });
  }
};
