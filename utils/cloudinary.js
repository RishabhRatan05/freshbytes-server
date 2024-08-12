const cloudinary = require("cloudinary").v2
const fs = require("fs")
const path = require("path")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

const uploadImage = async (filePath) => {
  const imagePath = path.join(__dirname, "uploads", filePath)

  try {
    // Upload the image
    if (!imagePath) return null
    const result = await cloudinary.uploader.upload(imagePath)

    return result.url
  } catch (error) {
    fs.unlinkSync(imagePath)
    console.error(error)
    return null
  }
}
module.exports = { uploadImage }
