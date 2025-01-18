const Pengguna = require("../../API/v1/pengguna/model");
const bcrypt = require("bcryptjs");
const { BadRequestError } = require("../../error");
const { createJWT, createTokenUser } = require("../../utils");

const register = async (req) => {
  const { username, password, password_confirm, email, phone, role, gender } =
    req.body;
  if (password != password_confirm)
    throw new BadRequestError("password dan password confirm tidak cocok");
  const result = await Pengguna.create({
    username,
    password: await bcrypt.hash(password, 12),
    email,
    phone,
    role,
    gender,
  });
  const token = createJWT(createTokenUser(result));

  return token;
};

const login = async (req) => {
  const { username, password } = req.body;

  const pengguna = await Pengguna.findOne({ username });
  if (!pengguna) throw new BadRequestError("Invalid Credential.");

  const isPasswordCorrect = await bcrypt.compare(password, pengguna.password);
  if (!isPasswordCorrect) throw new BadRequestError("Invalid Credential");

  const token = createJWT(createTokenUser(pengguna));

  return token;
};

const getProfile = async (req) => {
  const result = await Pengguna.findOne({ _id: req.pengguna.userid }).select(
    "username email gender role phone avatar"
  );
  return result;
};

const updateProfile = async (req) => {
  const { username } = req.body;

  const result = await Pengguna.findOneAndUpdate(
    { _id: req.pengguna.userid },
    { username }
  );
  return result;
};

module.exports = { register, login, getProfile, updateProfile };
