import cloudinary from "../config/cloudinary.config.js";
import CustomError from "../utils/customErrors.js";
import {
  findProfileByUserId,
  updateProfile,
} from "../repository/profile.repository.js";

const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  return `gidy-profile/${fileName.split(".")[0]}`;
};

export const updateProfileService = async (userId, body, file) => {
  const profile = await findProfileByUserId(userId);

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  let imageUrl = profile.profileImage;
  let newUpload = null;

  try {
    if (file) {
      newUpload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "gidy-profile" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        stream.end(file.buffer);
      });

      imageUrl = newUpload.secure_url;
    }

    const updatedProfile = await updateProfile(userId, {
      ...body,
      profileImage: imageUrl,
    });

    if (file && profile.profileImage) {
      const oldPublicId = extractPublicId(profile.profileImage);
      await cloudinary.uploader.destroy(oldPublicId);
    }

    return updatedProfile;
  } catch (error) {
    if (newUpload?.public_id) {
      await cloudinary.uploader.destroy(newUpload.public_id);
    }

    throw CustomError.internal("Profile update failed");
  }
};
