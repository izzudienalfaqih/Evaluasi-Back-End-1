const { StatusCodes } = require("http-status-codes");

const handlerErrorMiddleware = (err, req, res, next) => {
  console.log(err.message);
  console.log(err.statusCode);
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong please try again later",
  };

  if (err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = err.message;
  }

  if (err.name === "JsonWebTokenError") {
    customError.statusCode = StatusCodes.UNAUTHORIZED;
    customError.message = err.message;
  }

  return res
    .status(customError.statusCode)
    .json({ status: "error", message: customError.message });
};

module.exports = handlerErrorMiddleware;
