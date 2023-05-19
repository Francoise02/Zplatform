import cloudinary from "../config/cloudinary.config.js";
import multer from "multer";
import AppError from "./AppError.js";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

export const uploads = multer({ storage, fileFilter });

export const fileUpload = async (req, next) => {
  if (!req.file) return;
  let imageUrl = "";
  await cloudinary.v2.uploader.upload(
    req.file.path,
    async function (err, image) {
      if (err) {
        return next(new AppError(err));
      }
      imageUrl = image.url;
    }
  );
  return imageUrl;
};
