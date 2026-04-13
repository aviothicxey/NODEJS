const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../../uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase();
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const commonImageTypes = ["image/jpeg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
  const allowed = [...commonImageTypes, "application/pdf"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP and PDF files are allowed"));
  }
};

const profileImageFilter = (req, file, cb) => {
  if (commonImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Profile image must be JPG, PNG or WEBP"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const profileImageUpload = multer({
  storage,
  fileFilter: profileImageFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = {
  upload,
  profileImageUpload,
};
