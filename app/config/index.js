const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urldb: process.env.URL_MONGODB,
  jwtsecretkey: process.env.JWT_SECRET_KEY,
  cdncloudname: process.env.CDN_CLOUD_NAME,
  cdnapikey: process.env.CDN_API_KEY,
  cdnsecretkey: process.env.CDN_SECRET_KEY,
};
