const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Prevent duplicate responses
  if (res.headersSent) {
    return next(err);
  }

  switch (statusCode) {
    case constants.ALERADY_EXIST:
      res.json({
        title: "Already Exists",
        message: err.message,
        stackTrace: err.stack,
      });
      break; // ✅ break added

    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      res.status(500).json({
        title: "Unknown Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
