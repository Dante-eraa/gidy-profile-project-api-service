import multer from "multer";
import CustomError from "../utils/customErrors.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Profile image validation
  if (file.fieldname === "profileImage") {
    const allowedImageTypes = ["image/png", "image/jpeg"];

    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(
        CustomError.badRequest("Profile image must be PNG or JPEG"),
        false,
      );
    }
  }

  // Resume validation
  if (file.fieldname === "resume") {
    if (file.mimetype !== "application/pdf") {
      return cb(CustomError.badRequest("Resume must be a PDF file"), false);
    }
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter,
});

export default upload;
