const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ message: "unsupported file format" }, false);
  }
};

const upload = multer({ storage, limits: { fileSize: 5000000 }, fileFilter });

module.exports = upload;
