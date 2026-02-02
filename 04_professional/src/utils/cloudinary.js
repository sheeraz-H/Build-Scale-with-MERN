import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.warn("No local file path provided for upload.");
      return null;
    }

    // Check if the file exists before attempting upload
    if (!fs.existsSync(localFilePath)) {
      console.error(`File does not exist at path: ${localFilePath}`);
      return null;
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Log success (optional, for debugging)
    console.log("File uploaded successfully to Cloudinary:", response.url);

    // Remove the local file after successful upload
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error("Failed to delete local file after upload:", unlinkError.message);
      // Don't throw here; the upload succeeded, so we can still return the response
    }

    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);

    // Attempt to remove the local file if upload failed
    if (localFilePath) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (unlinkError) {
        console.error("Failed to delete local file after failed upload:", unlinkError.message);
      }
    }

    return null;
  }
};

export { uploadOnCloudinary };