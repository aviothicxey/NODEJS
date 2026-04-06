const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware");

router.post("/single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  return res.status(200).json({
    message: "File uploaded successfully",
    file: {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
    },
  });
});

module.exports = router;
