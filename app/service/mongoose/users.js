const User = require("../../API/v1/users/model");
const { BadRequestError } = require("../../error");
const bcrypt = require("bcryptjs");
const { createJWT } = require("../../utils/jwt");
const { createTokenUser } = require("../../utils");
const {
  uploadToCloudinary,
  deleteFileFromCloudinary,
} = require("../../utils/cloudinary");

const register = async (req) => {
  const { username, password, password_confirm } = req.body;

  if (password != password_confirm)
    throw new BadRequestError("password dan password confirm tidak cocok");
  const result = await User.create({
    username,
    password: await bcrypt.hash(password, 12),
  });
  const token = createJWT(createTokenUser(result));

  return token;
};

const login = async (req) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) throw new BadRequestError("Invalid Credential");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new BadRequestError("Invalid Credential");

  const token = createJWT(createTokenUser(user));

  return token;
};

const getProfile = async (req) => {
  const result = await User.findOne({ _id: req.user.userid }).select(
    "username avatar createdAt updatedAt"
  );
  return result;
};

const updateProfile = async (req) => {
  const { username } = req.body;

  if (req.file) {
    const file = await uploadToCloudinary(req.file.buffer);
    const result = await User.findOneAndUpdate(
      { _id: req.user.userid },
      { username, avatar: { path: file.public_id, url: file.secure_url } }
    );
    if (result.avatar.path)
      await deleteFileFromCloudinary(result?.avatar?.path, "image");
    return result;
  }

  const result = await User.findOneAndUpdate(
    { _id: req.user.userid },
    { username }
  );
  return result;
};

module.exports = { register, login, getProfile, updateProfile };
