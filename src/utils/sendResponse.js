const sendResponse = (res, statusCode, message, data)=>{
 res.status(statusCode).json({
  success: true,
  message,
  data
 });
};
export default sendResponse;