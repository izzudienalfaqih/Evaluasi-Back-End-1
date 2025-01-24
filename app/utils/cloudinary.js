const cloudinary = require("cloudinary").v2;
const { cdnapikey, cdncloudname, cdnsecretkey } = require("../config");

cloudinary.config({
  cloud_name: cdncloudname,
  api_key: cdnapikey,
  api_secret: cdnsecretkey,
});

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "todo/avatar", resource_type: "image" },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      )
      .end(fileBuffer);
  });
};

const deleteFileFromCloudinary = (path, resource_type) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(path, { resource_type }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = { uploadToCloudinary, deleteFileFromCloudinary };
