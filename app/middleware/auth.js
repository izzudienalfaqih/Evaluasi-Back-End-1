const Unauthenticated = require("../error/unauthenticated");
const { isValidToken } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    const payload = isValidToken({ token });
    if (!payload.userid)
      throw new Unauthenticated("unauthorized to access this route");

    req.user = {
      userid: payload.userid,
      username: payload.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authenticatePengguna = (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    const payload = isValidToken({ token });
    if (!payload.userid)
      throw new Unauthenticated("unauthorized to access this route");

    req.pengguna = {
      userid: payload.userid,
      username: payload.username,
      role: payload.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateUser, authenticatePengguna };
