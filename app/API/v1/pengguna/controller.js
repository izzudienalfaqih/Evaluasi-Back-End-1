const { StatusCodes } = require("http-status-codes");
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../../../service/mongoose/pengguna");

const signUp = async (req, res, next) => {
  try {
    const token = await register(req);
    res.status(StatusCodes.CREATED).json({ status: "success", token });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const token = await login(req);
    res.status(StatusCodes.OK).json({ status: "success", token });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const pengguna = await getProfile(req);
    res.status(StatusCodes.OK).json({ status: "success", pengguna });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    await updateProfile(req);
    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "update profile successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, profile, update };
