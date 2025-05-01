import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT;
export const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
export const nodeEnvironment = process.env.NODE_ENV;




