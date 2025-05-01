import ErrorTypes from "../constants/errorTypes.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next)=>{
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errorType = err.errorType || ErrorTypes.SERVER_ERROR;

  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  if(err.name === "PrismaClientKnownRequestError"){
    if(err.code === "P2002"){
      statusCode = 409;
      errorType = ErrorTypes.DUPLICATE;

      const duplicateField = err.meta?.target;
      switch (duplicateField) {
        case "Customer_email_key":
          message = "Email already registered";
          break;
        case "Customer_phone_key":
          message = "Phone number already used";
          break;
        default:
          message = "Duplicate value for a unique field."
          break;
      } 
    }
  }

  return res.status(statusCode).json({
    success: false,
    error:{
      message,
      errorType
    }
  });
}

export default errorHandler;