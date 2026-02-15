import cloudinary from "../config/cloudinary.config.js";
import CustomError from "../utils/customErrors.js";
import {
  findProfileBySlug,
  findProfileByUserId,
  updateProfile,
} from "../repository/profile.repository.js";

const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];

  // detect folder from url
  if (url.includes("/resumes/")) {
    return `gidy-profile/resumes/${publicId}`;
  }

  if (url.includes("/images/")) {
    return `gidy-profile/images/${publicId}`;
  }

  return publicId;
};
export const updateProfileService = async (
  userId,
  body,
  imageFile,
  resumeFile,
) => {
  const profile = await findProfileByUserId(userId);

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  let imageUrl = profile.profileImage;
  let resumeUrl = profile.resumeUrl;

  let newImageUpload = null;
  let newResumeUpload = null;

  try {
    // 🔹 Upload Profile Image
    if (imageFile) {
      newImageUpload = await cloudinary.uploader.upload(
        `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`,
        { folder: "gidy-profile/images" },
      );

      imageUrl = newImageUpload.secure_url;
    }

    // 🔹 Upload Resume (PDF)
    if (resumeFile) {
      newResumeUpload = await cloudinary.uploader.upload(
        `data:${resumeFile.mimetype};base64,${resumeFile.buffer.toString("base64")}`,
        {
          folder: "gidy-profile/resumes",
          resource_type: "raw",
        },
      );

      resumeUrl = newResumeUpload.secure_url;
    }

    const updatedProfile = await updateProfile(userId, {
      ...body,
      profileImage: imageUrl,
      resumeUrl: resumeUrl,
    });

    // 🔹 Delete old image if replaced
    if (imageFile && profile.profileImage) {
      const oldPublicId = extractPublicId(profile.profileImage);
      await cloudinary.uploader.destroy(oldPublicId);
    }

    return updatedProfile;
  } catch (error) {
    // Rollback uploaded files if DB fails
    if (newImageUpload?.public_id) {
      await cloudinary.uploader.destroy(newImageUpload.public_id);
    }

    if (newResumeUpload?.public_id) {
      await cloudinary.uploader.destroy(newResumeUpload.public_id, {
        resource_type: "raw",
      });
    }

    throw CustomError.internal("Profile update failed");
  }
};

export const getProfileService = async (userId) => {
  const profile = await findProfileByUserId(userId);

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  return profile;
};
export const getPublicProfileService = async (slug) => {
  const profile = await findProfileBySlug(slug);

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  return profile;
};
