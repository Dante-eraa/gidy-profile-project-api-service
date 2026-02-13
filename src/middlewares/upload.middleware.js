import multer from "multer";
import CustomError from "../utils/customErrors.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(CustomError.badRequest("Only PNG and JPEG images are allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

export default upload;
