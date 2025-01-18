const jwt = require("jsonwebtoken");
const { jwtsecretkey } = require("../config");

const createJWT = (payload) => {
  const token = jwt.sign(payload, jwtsecretkey, {
    expiresIn: "7d",
  });

  return token;
};

const isValidToken = ({ token }) => {
  return jwt.verify(token, jwtsecretkey);
};

module.exports = { createJWT, isValidToken };
